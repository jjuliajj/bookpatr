"use client";

import { useCart } from "@/lib/CartContext";
import { useState } from "react";
import { ShoppingBag, Heart, Check, Zap, ExternalLink } from "lucide-react";
import { trackWhop } from "@/lib/whop";

interface AddToCartActionsProps {
  bookId: string;
  bookTitle?: string;
  bookPrice?: number;
  bookCategory?: string;
  whopCheckoutUrl?: string;
}

export default function AddToCartActions({
  bookId,
  bookTitle,
  bookPrice,
  bookCategory,
  whopCheckoutUrl,
}: AddToCartActionsProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(bookId);
    setAdded(true);
    trackWhop("add_to_cart", {
      content_id: bookId,
      content_name: bookTitle,
      content_category: bookCategory,
      value: bookPrice,
      currency: "USD",
    });
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhopBuy = () => {
    if (!whopCheckoutUrl) return;
    trackWhop("add_to_cart", {
      content_id: bookId,
      content_name: bookTitle,
      content_category: bookCategory,
      value: bookPrice,
      currency: "USD",
    });
    window.location.href = whopCheckoutUrl;
  };

  return (
    <div className="space-y-3 pt-2">
      {/* Primary Direct Whop Checkout Button if available */}
      {whopCheckoutUrl && (
        <button
          onClick={handleWhopBuy}
          className="w-full bg-[#FF6243] hover:bg-[#ff4e2b] text-white py-3.5 px-6 rounded-full font-manrope font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-[#FF6243]/25 flex items-center justify-center gap-2 group cursor-pointer"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Buy with Whop — Instant Delivery (${bookPrice?.toFixed(2) || "9.99"})</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}

      {/* Secondary: Add to Cart & Wishlist */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button 
          onClick={handleAdd}
          className="bg-charcoal hover:bg-coral text-paper-beige px-6 py-3 rounded-full font-manrope font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md flex items-center justify-center space-x-2.5 flex-1 cursor-pointer"
        >
          {added ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
        
        <button className="border border-charcoal/15 px-6 py-3 rounded-full font-manrope font-bold text-charcoal hover:bg-charcoal/5 transition-all text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer">
          <Heart className="w-4 h-4 text-coral" />
          <span>Wishlist</span>
        </button>
      </div>
    </div>
  );
}
