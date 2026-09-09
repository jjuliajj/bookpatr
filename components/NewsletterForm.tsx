"use client";

import { useState } from "react";
import { trackWhop } from "@/lib/whop";
import { Check } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;

    trackWhop("identify", { email: cleanEmail });
    trackWhop("lead", { email: cleanEmail });
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-4 items-center">
      {subscribed ? (
        <div className="flex items-center gap-2 text-emerald-400 font-manrope text-sm py-2">
          <Check className="w-4 h-4" />
          <span>Subscribed to literary updates!</span>
        </div>
      ) : (
        <>
          <input 
            type="email"
            id="newsletter-email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => {
              const cleanEmail = email.trim();
              if (cleanEmail.includes("@") && cleanEmail.includes(".")) {
                trackWhop("identify", { email: cleanEmail });
              }
            }}
            placeholder="Your email address" 
            className="bg-paper-beige/10 border-b border-paper-beige/30 py-2 px-4 focus:outline-none focus:border-coral transition-colors flex-grow max-w-xs font-manrope text-sm text-paper-beige placeholder:text-paper-beige/40"
          />
          <button 
            type="submit"
            className="text-coral font-manrope font-bold text-sm uppercase tracking-widest hover:text-white transition-colors cursor-pointer"
          >
            Subscribe
          </button>
        </>
      )}
    </form>
  );
}
