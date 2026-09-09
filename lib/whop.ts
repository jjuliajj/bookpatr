// Whop Pixel tracking helper for bookpatr
// Business ID: biz_gv0Hji5yYVQVHu

declare global {
  interface Window {
    whop?: {
      track: (event: string, properties?: Record<string, any>) => void;
      setScope: (...args: any[]) => void;
      scope: (...args: any[]) => { track: (...args: any[]) => void };
      q?: any[];
    };
  }
}

export function trackWhop(event: string, properties?: Record<string, any>) {
  if (typeof window === "undefined") return;

  try {
    if (window.whop && typeof window.whop.track === "function") {
      window.whop.track(event, properties);
      if (process.env.NODE_ENV !== "production") {
        console.log(`[Whop Pixel] Tracked event: ${event}`, properties);
      }
    } else {
      const w = window as any;
      if (!w.whop) {
        w.whop = { q: [] };
        w.whop.track = function () {
          w.whop.q = w.whop.q || [];
          w.whop.q.push([+new Date()].concat([].slice.call(arguments)));
        };
      }
      w.whop.track(event, properties);
      if (process.env.NODE_ENV !== "production") {
        console.log(`[Whop Pixel] Queued event: ${event}`, properties);
      }
    }
  } catch (err) {
    console.error("[Whop Pixel] Tracking error:", err);
  }
}
