// Whop API integration module for bookpatr
// Fetches dynamic product listings and direct checkout links from Whop API

export interface WhopProduct {
  id: string;
  title: string;
  price: number;
  formattedPrice: string;
  plan_id: string;
  checkout_url: string;
}

const DEFAULT_COMPANY_ID = "biz_gv0Hji5yYVQVHu";
const DEFAULT_API_KEY = "apik_5LrsymEoIx1XO_C6415809_C_d8d3f28bea73e2d87dbe2cda1b7a67466bd955574b65da85b752dbcc70102d";

// Known fallback catalogue to ensure 100% uptime even if Whop API experiences network hiccups
const FALLBACK_WHOP_PRODUCTS: WhopProduct[] = [
  {
    id: "prod_Se2gi9bZ1suAA",
    title: "The Clear Path of Resilience",
    price: 9.99,
    formattedPrice: "$9.99",
    plan_id: "plan_vR8hPXcZ4Fndm",
    checkout_url: "https://whop.com/checkout/plan_vR8hPXcZ4Fndm",
  },
  {
    id: "prod_Mf7FAt9xgmf7l",
    title: "The Clear Lessons of Home Organization",
    price: 5.0,
    formattedPrice: "$5.00",
    plan_id: "plan_LxPMR4PxeJSI5",
    checkout_url: "https://whop.com/checkout/plan_LxPMR4PxeJSI5",
  },
  {
    id: "prod_K5ccV1NgWU3Eu",
    title: "The Clear Season of Fresh Starts",
    price: 12.99,
    formattedPrice: "$12.99",
    plan_id: "plan_WXU8Rm9uUDyFO",
    checkout_url: "https://whop.com/checkout/plan_WXU8Rm9uUDyFO",
  },
  {
    id: "prod_bSZCt8rmrU8tV",
    title: "The Clear Way of Confidence",
    price: 8.99,
    formattedPrice: "$8.99",
    plan_id: "plan_Yyi40V91ncEUt",
    checkout_url: "https://whop.com/checkout/plan_Yyi40V91ncEUt",
  },
  {
    id: "prod_0QYgpXD9rf5Vh",
    title: "The Kind Book of Time Management",
    price: 12.0,
    formattedPrice: "$12.00",
    plan_id: "plan_CW51jJGWsxyw7",
    checkout_url: "https://whop.com/checkout/plan_CW51jJGWsxyw7",
  },
  {
    id: "prod_JCiQgKr8oCHkq",
    title: "The Kind Companion of Home Organization",
    price: 20.0,
    formattedPrice: "$20.00",
    plan_id: "plan_aMKCD6iJf21vm",
    checkout_url: "https://whop.com/checkout/plan_aMKCD6iJf21vm",
  },
  {
    id: "prod_yxmjHPqmVMsaX",
    title: "The Kind Handbook of Personal Growth",
    price: 29.99,
    formattedPrice: "$29.99",
    plan_id: "plan_HbDOW38vnML9e",
    checkout_url: "https://whop.com/checkout/plan_HbDOW38vnML9e",
  },
];

export async function getWhopProducts(): Promise<WhopProduct[]> {
  const apiKey = process.env.WHOP_API_KEY || DEFAULT_API_KEY;
  const companyId = process.env.WHOP_COMPANY_ID || DEFAULT_COMPANY_ID;

  try {
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    // Parallel fetch products and plans from Whop API with 1-minute caching
    const [productsRes, plansRes] = await Promise.all([
      fetch("https://api.whop.com/api/v5/company/products", {
        headers,
        next: { revalidate: 60 },
      }),
      fetch(`https://api.whop.com/api/v2/plans?company_id=${companyId}`, {
        headers,
        next: { revalidate: 60 },
      }),
    ]);

    if (!productsRes.ok || !plansRes.ok) {
      console.warn("[Whop API] Failed to fetch live products/plans, using fallback catalog.");
      return FALLBACK_WHOP_PRODUCTS;
    }

    const productsData = await productsRes.json();
    const plansData = await plansRes.json();

    const products: any[] = productsData.data || [];
    const plans: any[] = plansData.data || [];

    const mapped: WhopProduct[] = products.map((p) => {
      // Clean title without (Ebook) suffix for matching
      const cleanTitle = p.title.replace(/\s*\((?:Ebook|eBook|Digital)\)\s*$/i, "").trim();
      const plan = plans.find((pl) => pl.product === p.id);
      const rawPrice = plan ? parseFloat(plan.initial_price) : 0;
      const checkoutUrl = plan?.direct_link || (plan?.id ? `https://whop.com/checkout/${plan.id}` : "");

      return {
        id: p.id,
        title: cleanTitle,
        price: rawPrice,
        formattedPrice: `$${rawPrice.toFixed(2)}`,
        plan_id: plan?.id || "",
        checkout_url: checkoutUrl,
      };
    });

    return mapped.length > 0 ? mapped : FALLBACK_WHOP_PRODUCTS;
  } catch (err) {
    console.error("[Whop API Error]:", err);
    return FALLBACK_WHOP_PRODUCTS;
  }
}

/**
 * Find matching Whop product for a given book title
 */
export function findMatchingWhopProduct(
  bookTitle: string,
  whopProducts: WhopProduct[]
): WhopProduct | undefined {
  const norm = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "")
      .replace(/ebook/g, "");

  const target = norm(bookTitle);
  return whopProducts.find((p) => {
    const pNorm = norm(p.title);
    return pNorm === target || target.includes(pNorm) || pNorm.includes(target);
  });
}
