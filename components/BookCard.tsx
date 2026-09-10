"use client";

import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { Plus, Zap } from "lucide-react";
import { trackWhop } from "@/lib/whop";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: string;
  category: string;
  image: string;
  description?: string;
  whop_checkout_url?: string;
  whopCheckoutUrl?: string;
}

export default function BookCard({
  id,
  title,
  author,
  price,
  category,
  image,
  description,
  whop_checkout_url,
  whopCheckoutUrl,
}: BookCardProps) {
  const { addToCart } = useCart();
  const effectiveWhopUrl = whop_checkout_url || whopCheckoutUrl;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id, 1);
    const rawPrice = String(price || "0").replace(/[^0-9.]/g, "");
    const numericPrice = parseFloat(rawPrice) || undefined;
    trackWhop("add_to_cart", {
      content_id: id,
      content_name: title,
      content_category: category,
      value: numericPrice,
      currency: "USD",
    });
  };

  const handleDirectWhopBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!effectiveWhopUrl) return;
    const rawPrice = String(price || "0").replace(/[^0-9.]/g, "");
    const numericPrice = parseFloat(rawPrice) || undefined;
    trackWhop("add_to_cart", {
      content_id: id,
      content_name: title,
      content_category: category,
      value: numericPrice,
      currency: "USD",
    });
    window.location.href = effectiveWhopUrl;
  };

  const cleanDescription = (description || "").replace(/^(Introduction\s*)+/i, "").trim();

  return (
    <Link href={`/products/${id}`} className="group cursor-pointer block h-full">
      <div className="bg-white/80 backdrop-blur-sm border border-charcoal/10 rounded-2xl p-3 shadow-xs hover:shadow-md hover:border-coral/40 transition-all duration-300 flex flex-col h-full group-hover:-translate-y-1">
        
        {/* 9:16 Book Cover Container */}
        <div className="relative aspect-[9/16] mb-3 overflow-hidden bg-charcoal/5 rounded-xl border border-charcoal/5 flex-shrink-0">
          {image ? (
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-charcoal/10 text-charcoal/30 font-newsreader text-xs italic px-3 text-center">
              {title}
            </div>
          )}
          
          {/* Quick Action Overlay */}
          <div className="absolute inset-0 bg-charcoal/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2 gap-1.5">
            {effectiveWhopUrl && (
              <button
                onClick={handleDirectWhopBuy}
                className="bg-[#FF6243] text-white px-3 py-1.5 rounded-full font-manrope font-bold text-[9px] uppercase tracking-wider shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#ff4e2b] flex items-center gap-1 w-full justify-center"
              >
                <Zap className="w-3 h-3 fill-white" />
                Whop Buy
              </button>
            )}
            <button 
              onClick={handleQuickAdd}
              className="bg-paper-beige text-charcoal px-3 py-1.5 rounded-full font-manrope font-bold text-[9px] uppercase tracking-wider shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-coral hover:text-white flex items-center gap-1 w-full justify-center"
            >
              <Plus className="w-3 h-3" />
              Add Cart
            </button>
          </div>

          {category && (
            <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
              <span className="bg-paper-beige/90 backdrop-blur-sm text-charcoal px-2 py-0.5 text-[8px] font-manrope font-bold uppercase tracking-wider rounded-md shadow-xs">
                {category}
              </span>
              {effectiveWhopUrl && (
                <span className="bg-[#FF6243] text-white px-1.5 py-0.5 text-[7px] font-manrope font-bold uppercase tracking-widest rounded shadow-xs flex items-center gap-0.5">
                  <Zap className="w-2.5 h-2.5 fill-white" /> Whop
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* Content Container */}
        <div className="flex flex-col flex-grow justify-between">
          <div>
            {/* Title with fixed 2-line height */}
            <div className="min-h-[2.4rem] mb-1 flex items-start">
              <h3 className="font-newsreader text-xs md:text-sm font-bold text-charcoal leading-snug group-hover:text-coral transition-colors duration-300 line-clamp-2" title={title}>
                {title}
              </h3>
            </div>

            {/* 2-line Description snippet */}
            <p className="font-manrope text-[11px] text-charcoal/60 leading-tight line-clamp-2 mb-2 min-h-[2rem]">
              {cleanDescription || "An essential guide and literary collection volume."}
            </p>
          </div>

          {/* Author & Price pinned at bottom of card */}
          <div className="pt-2 border-t border-charcoal/10 flex justify-between items-center mt-1">
            <p className="font-manrope text-[10px] text-charcoal/50 font-medium truncate max-w-[60%]" title={author}>
              {author}
            </p>
            <p className="font-manrope text-xs font-bold text-coral whitespace-nowrap">
              {price.startsWith('$') ? price : `$${price}`}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
