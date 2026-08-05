"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  BookOpen
} from "lucide-react";

export default function CartPage() {
  const { cartItems, allBooks, updateQuantity, removeFromCart, cartTotal, isMounted } = useCart();

  const fullCartItems = cartItems.map(item => {
    const book = allBooks.find(b => b.id === item.id);
    return { ...book, quantity: item.quantity, id: item.id };
  }).filter(item => item.title);

  if (!isMounted) return null;

  return (
    <main className="flex min-h-screen flex-col bg-paper-beige">
      <Navbar />
      
      <section className="pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          {/* Header & Back link */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <Link href="/collections" className="inline-flex items-center text-xs font-manrope font-bold text-charcoal/50 hover:text-coral transition-colors mb-2 uppercase tracking-widest gap-2 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Collection
              </Link>
              <h1 className="text-3xl md:text-4xl font-newsreader font-bold text-charcoal flex items-center gap-3">
                <ShoppingBag className="w-8 h-8 text-coral" />
                Your Shopping Cart
              </h1>
            </div>
            <span className="text-xs font-manrope font-semibold text-charcoal/50 bg-charcoal/5 px-4 py-2 rounded-full border border-charcoal/5 w-fit">
              {fullCartItems.length} {fullCartItems.length === 1 ? 'Volume' : 'Volumes'} Selected
            </span>
          </div>

          {fullCartItems.length === 0 ? (
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 text-center border border-charcoal/10 shadow-sm max-w-lg mx-auto my-8">
              <div className="w-16 h-16 bg-coral/10 text-coral rounded-2xl flex items-center justify-center mx-auto mb-4 border border-coral/20">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-newsreader font-bold text-charcoal mb-2">Your Cart is Empty</h3>
              <p className="text-xs font-manrope text-charcoal/60 mb-6">Explore our curated library and discover your next great read.</p>
              <Link 
                href="/collections" 
                className="inline-flex items-center gap-2 bg-charcoal hover:bg-coral text-paper-beige px-8 py-3.5 rounded-full font-manrope font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              {/* Cart Item List Container */}
              <div className="lg:col-span-7 space-y-4">
                {fullCartItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-charcoal/10 shadow-xs hover:border-coral/30 transition-all flex gap-4 items-center group"
                  >
                    {/* 9:16 Book Cover */}
                    <Link href={`/products/${item.id}`} className="w-16 md:w-20 aspect-[9/16] bg-charcoal/5 rounded-xl overflow-hidden flex-shrink-0 shadow-md border border-charcoal/10 block group-hover:scale-105 transition-transform duration-300">
                      {item.cover_url ? (
                        <img src={item.cover_url} alt={item.title} className="object-cover w-full h-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-charcoal/10 text-charcoal/30 text-[9px] font-newsreader italic text-center p-1">
                          {item.title}
                        </div>
                      )}
                    </Link>

                    {/* Book Info */}
                    <div className="flex-grow min-w-0 space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <Link href={`/products/${item.id}`} className="font-newsreader text-base md:text-lg font-bold text-charcoal hover:text-coral transition-colors line-clamp-1">
                          {item.title}
                        </Link>
                        <span className="font-manrope font-bold text-coral text-sm whitespace-nowrap">
                          {item.price && item.price.startsWith('$') ? item.price : `$${item.price || '0.00'}`}
                        </span>
                      </div>

                      <p className="font-manrope text-xs text-charcoal/50 font-medium truncate">
                        by {item.author}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Pill */}
                        <div className="flex items-center space-x-3 bg-charcoal/5 border border-charcoal/10 rounded-full px-3 py-1">
                          <button 
                            className="text-charcoal/40 hover:text-coral transition-colors p-0.5"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            title="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-manrope font-bold text-charcoal w-4 text-center">{item.quantity}</span>
                          <button 
                            className="text-charcoal/40 hover:text-coral transition-colors p-0.5"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            title="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button 
                          className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-2 rounded-lg transition-all"
                          onClick={() => removeFromCart(item.id)}
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary Box */}
              <div className="lg:col-span-5">
                <div className="bg-gradient-to-br from-charcoal via-slate-900 to-indigo-950 text-paper-beige rounded-3xl p-6 md:p-8 shadow-xl border border-charcoal/20 space-y-6 sticky top-28">
                  <div className="flex items-center justify-between border-b border-paper-beige/10 pb-4">
                    <h2 className="font-newsreader text-xl font-bold flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-coral" /> Order Summary
                    </h2>
                    <span className="text-xs font-manrope font-semibold text-paper-beige/40">EPUB Instant</span>
                  </div>

                  <div className="space-y-3 font-manrope text-xs">
                    <div className="flex justify-between text-paper-beige/70">
                      <span>Subtotal ({fullCartItems.length} items)</span>
                      <span className="font-bold text-paper-beige">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-paper-beige/70">
                      <span>Digital Delivery</span>
                      <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px]">Free Instant Download</span>
                    </div>
                    <div className="flex justify-between text-paper-beige/70">
                      <span>Estimated Tax</span>
                      <span className="font-bold text-paper-beige">$0.00</span>
                    </div>

                    <div className="flex justify-between items-baseline pt-4 border-t border-paper-beige/10">
                      <span className="text-sm font-bold">Total Due</span>
                      <span className="text-3xl font-bold text-coral">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <Link 
                    href="/checkout" 
                    className="w-full bg-coral hover:bg-coral/90 text-white py-4 rounded-full font-manrope font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-coral/30 flex items-center justify-center gap-2 group"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="pt-2 border-t border-paper-beige/10 flex items-center justify-center gap-2 text-[10px] font-manrope text-paper-beige/40 uppercase tracking-widest text-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Instant Access to EPUB & Book Files</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
