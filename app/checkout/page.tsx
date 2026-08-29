"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { 
  ArrowLeft, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  Loader2, 
  BookOpen, 
  Sparkles,
  CheckCircle2,
  AlertCircle,
  X
} from "lucide-react";

export default function CheckoutPage() {
  const { cartItems, allBooks, cartCount, cartTotal, isMounted } = useCart();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');

  const [noticeModal, setNoticeModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type?: 'info' | 'warning' | 'error';
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  const fullCartItems = cartItems.map(item => {
    const book = allBooks.find(b => b.id === item.id);
    return { ...book, quantity: item.quantity, id: item.id };
  }).filter(item => item.title);

  if (!isMounted) return null;

  const handleCheckout = async () => {
    const itemsForPayment = cartItems.map(item => {
      const book = allBooks.find(b => b.id === item.id);
      return { ...book, quantity: item.quantity, id: item.id };
    }).filter(item => item.title);

    if (itemsForPayment.length === 0) {
      setNoticeModal({
        isOpen: true,
        title: "Your Cart is Empty",
        message: "Please add at least one book to your cart before proceeding to checkout.",
        type: "warning"
      });
      return;
    }

    setLoading(true);
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
        (process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : 'https://logbook-snowy-gamma.vercel.app/api');

      if (paymentMethod === 'paypal') {
        const response = await fetch(`${API_BASE_URL}/checkout/paypal/create-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            items: itemsForPayment, 
            site_id: 'bookpatr',
            customer_email: email.trim() || undefined
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.details || data.error || 'PayPal payment gateway initialization failed');
        }

        const redirectUrl = data.approvalUrl || data.url;
        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          throw new Error('No PayPal checkout URL returned from payment server');
        }
      } else {
        const response = await fetch(`${API_BASE_URL}/checkout/create-checkout-session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            items: itemsForPayment, 
            site_id: 'bookpatr',
            customer_email: email.trim() || undefined
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.details || data.error || 'Payment gateway initialization failed');
        }

        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error('No checkout URL returned from payment server');
        }
      }
    } catch (error: any) {
      // Log technical error purely in developer console - completely hidden from screen
      console.error(`[${paymentMethod.toUpperCase()} Gateway Technical Log]:`, error);

      // Display professional user-friendly popup banner
      setNoticeModal({
        isOpen: true,
        title: "Payment Service Notice",
        message: "We are currently initializing the secure checkout channel. Please wait a few seconds and try again, or feel free to reach out to our customer support.",
        type: "info"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-paper-beige">
      <Navbar />
      
      <section className="pt-24 sm:pt-28 pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl">
          {/* Back link */}
          <Link href="/cart" className="inline-flex items-center text-xs font-manrope font-bold text-charcoal/50 hover:text-coral transition-colors mb-6 sm:mb-8 uppercase tracking-widest gap-2 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Cart
          </Link>

          {/* Main Card Container */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-10 border border-charcoal/10 shadow-sm grid md:grid-cols-12 gap-6 md:gap-8 lg:gap-12 items-start overflow-hidden">
            
            {/* Left: Shipping & Payment Form */}
            <div className="md:col-span-7 space-y-6 sm:space-y-8 w-full min-w-0">
              <div>
                <h2 className="text-lg sm:text-xl font-newsreader font-bold text-charcoal mb-4 flex items-center gap-2 border-b border-charcoal/10 pb-3">
                  <span className="w-6 h-6 rounded-full bg-coral text-white text-xs font-bold font-manrope flex items-center justify-center flex-shrink-0">1</span>
                  Customer & Delivery Information
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-manrope font-bold text-charcoal/70 mb-1.5 uppercase tracking-wider">First Name</label>
                      <input 
                        type="text" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Jane"
                        className="w-full min-w-0 bg-white border border-charcoal/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-manrope text-charcoal focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-manrope font-bold text-charcoal/70 mb-1.5 uppercase tracking-wider">Last Name</label>
                      <input 
                        type="text" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Doe"
                        className="w-full min-w-0 bg-white border border-charcoal/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-manrope text-charcoal focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-manrope font-bold text-charcoal/70 mb-1.5 uppercase tracking-wider">
                      Email Address <span className="text-coral">*</span>
                      <span className="text-[10px] text-charcoal/40 font-normal ml-1 lowercase font-sans">(for digital book delivery)</span>
                    </label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane.doe@example.com"
                      className="w-full min-w-0 bg-white border border-charcoal/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-manrope text-charcoal focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all" 
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-newsreader font-bold text-charcoal mb-4 flex items-center gap-2 border-b border-charcoal/10 pb-3">
                  <span className="w-6 h-6 rounded-full bg-coral text-white text-xs font-bold font-manrope flex items-center justify-center flex-shrink-0">2</span>
                  Select Payment Gateway
                </h2>
                
                <div className="space-y-3">
                  {/* Stripe Option */}
                  <div 
                    onClick={() => setPaymentMethod('stripe')}
                    className={`p-3.5 sm:p-4 rounded-2xl flex items-center justify-between shadow-xs gap-3 cursor-pointer transition-all border-2 ${
                      paymentMethod === 'stripe' 
                        ? 'bg-white border-coral ring-2 ring-coral/10' 
                        : 'bg-white/80 border-charcoal/10 hover:border-charcoal/30'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        paymentMethod === 'stripe' ? 'bg-coral/10 text-coral' : 'bg-charcoal/5 text-charcoal/50'
                      }`}>
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-charcoal font-manrope flex items-center gap-2">
                          <span>Credit / Debit Card</span>
                          <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">Stripe</span>
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-charcoal/50 truncate">Visa, MasterCard, American Express, Apple Pay</div>
                      </div>
                    </div>
                    {paymentMethod === 'stripe' ? (
                      <CheckCircle2 className="w-5 h-5 text-coral flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-charcoal/20 flex-shrink-0" />
                    )}
                  </div>

                  {/* PayPal Option */}
                  <div 
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-3.5 sm:p-4 rounded-2xl flex items-center justify-between shadow-xs gap-3 cursor-pointer transition-all border-2 ${
                      paymentMethod === 'paypal' 
                        ? 'bg-white border-[#0079C1] ring-2 ring-blue-500/10' 
                        : 'bg-white/80 border-charcoal/10 hover:border-charcoal/30'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors font-extrabold text-sm ${
                        paymentMethod === 'paypal' ? 'bg-blue-50 text-[#0079C1]' : 'bg-charcoal/5 text-charcoal/50'
                      }`}>
                        P
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-charcoal font-manrope flex items-center gap-2">
                          <span>PayPal Express</span>
                          <span className="text-[10px] font-semibold bg-blue-50 text-[#0079C1] px-1.5 py-0.5 rounded border border-blue-200">PayPal</span>
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-charcoal/50 truncate">PayPal Balance, Linked Bank Accounts, Pay Later</div>
                      </div>
                    </div>
                    {paymentMethod === 'paypal' ? (
                      <CheckCircle2 className="w-5 h-5 text-[#0079C1] flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-charcoal/20 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Order Summary Dark Card */}
            <div className="md:col-span-5 w-full min-w-0">
              <div className="bg-gradient-to-br from-charcoal via-slate-900 to-indigo-950 text-paper-beige rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-charcoal/20 space-y-6">
                <div className="flex items-center justify-between border-b border-paper-beige/10 pb-4">
                  <h3 className="font-newsreader text-xl font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-coral" /> Order Overview
                  </h3>
                  <span className="text-xs font-manrope font-semibold text-paper-beige/40">
                    {cartCount} {cartCount === 1 ? 'Volume' : 'Volumes'}
                  </span>
                </div>

                {/* Items Thumbnails List */}
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {fullCartItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/5">
                      <div className="w-9 aspect-[9/16] bg-charcoal/20 rounded overflow-hidden flex-shrink-0 border border-white/10">
                        {item.cover_url ? (
                          <img src={item.cover_url} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-paper-beige/30">
                            <BookOpen className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <div className="flex-grow min-w-0 text-xs">
                        <div className="font-bold text-paper-beige truncate">{item.title}</div>
                        <div className="text-paper-beige/40 text-[10px] truncate">{item.author}</div>
                      </div>
                      <div className="text-xs font-bold text-coral whitespace-nowrap px-1">
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="pt-4 border-t border-paper-beige/10 space-y-2 font-manrope text-xs">
                  <div className="flex justify-between text-paper-beige/70">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-paper-beige/70">
                    <span>Digital Packaging</span>
                    <span className="text-emerald-400 font-bold">Complimentary</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-3 border-t border-paper-beige/10">
                    <span className="text-sm font-bold">Total Due</span>
                    <span className="text-3xl font-bold text-coral">${cartTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button 
                  onClick={handleCheckout}
                  disabled={loading || cartItems.length === 0}
                  className={`w-full text-white py-4 rounded-full font-manrope font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer ${
                    paymentMethod === 'paypal'
                      ? 'bg-[#0070BA] hover:bg-[#005ea6] shadow-blue-500/30'
                      : 'bg-coral hover:bg-coral/90 shadow-coral/30'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{paymentMethod === 'paypal' ? 'Redirecting to PayPal...' : 'Redirecting to Stripe...'}</span>
                    </>
                  ) : (
                    <>
                      {paymentMethod === 'paypal' ? (
                        <span className="font-extrabold text-sm mr-0.5">P</span>
                      ) : (
                        <Lock className="w-4 h-4" />
                      )}
                      <span>
                        {paymentMethod === 'paypal'
                          ? `Pay with PayPal ($${cartTotal.toFixed(2)})`
                          : `Complete Purchase ($${cartTotal.toFixed(2)})`}
                      </span>
                    </>
                  )}
                </button>

                <div className="pt-2 flex items-center justify-center gap-1.5 text-[10px] font-manrope text-paper-beige/40 uppercase tracking-widest text-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>256-Bit SSL Encrypted Checkout</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Professional Branded Modal Popup */}
      {noticeModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-charcoal/10 text-center relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setNoticeModal({ ...noticeModal, isOpen: false })}
              className="absolute top-5 right-5 text-charcoal/40 hover:text-charcoal transition-colors p-1 rounded-full hover:bg-charcoal/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-full bg-coral/10 text-coral flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7" />
            </div>

            <h3 className="font-newsreader text-2xl font-bold text-charcoal mb-2">
              {noticeModal.title}
            </h3>

            <p className="font-manrope text-xs sm:text-sm text-charcoal/70 leading-relaxed mb-6">
              {noticeModal.message}
            </p>

            <button
              onClick={() => setNoticeModal({ ...noticeModal, isOpen: false })}
              className="w-full bg-charcoal hover:bg-charcoal/90 text-white font-manrope font-bold text-xs uppercase tracking-wider py-3.5 rounded-full transition-all duration-200 shadow-md cursor-pointer"
            >
              Understand & Continue
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
