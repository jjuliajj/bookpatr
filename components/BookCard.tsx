"use client";

import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { Plus } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  price: string;
  category: string;
  image: string;
  description?: string;
}

export default function BookCard({ id, title, author, price, category, image, description }: BookCardProps) {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(id, 1);
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
          
          {/* Quick Add Overlay */}
          <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
            <button 
              onClick={handleQuickAdd}
              className="bg-paper-beige text-charcoal px-3.5 py-1.5 rounded-full font-manrope font-bold text-[9px] uppercase tracking-widest shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-coral hover:text-white flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              Add Cart
            </button>
          </div>

          {category && (
            <div className="absolute top-2 left-2">
              <span className="bg-paper-beige/90 backdrop-blur-sm text-charcoal px-2 py-0.5 text-[8px] font-manrope font-bold uppercase tracking-wider rounded-md shadow-xs">
                {category}
              </span>
            </div>
          )}
        </div>
        
        {/* Content Container with flex-col h-full & fixed title height for equal alignment */}
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
