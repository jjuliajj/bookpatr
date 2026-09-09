"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { useSearchParams } from "next/navigation";
import { trackWhop } from "@/lib/whop";

function SuccessContent() {
  const { cartItems, removeFromCart } = useCart();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const paypalOrderId = searchParams.get("paypal_order_id") || searchParams.get("order_id") || searchParams.get("token");
  const provider = searchParams.get("provider") || (paypalOrderId ? "paypal" : "stripe");
  const [purchasedBooks, setPurchasedBooks] = useState<any[]>([]);
  const [orderCode, setOrderCode] = useState<string | null>(searchParams.get("order_code"));
  const [loading, setLoading] = useState(true);
  const trackedRef = useRef(false);

  useEffect(() => {
    // Clear the cart after successful purchase
    if (cartItems.length > 0) {
      cartItems.forEach(item => removeFromCart(item.id));
    }

    const firePurchaseTrack = (code: string | null, books: any[] = [], orderInfo?: any) => {
      if (trackedRef.current) return;
      trackedRef.current = true;
      const totalAmount = books.reduce((sum, b) => {
        const p = parseFloat(String(b.price || '0').replace(/[^0-9.]/g, '')) || 0;
        return sum + p;
      }, 0) || (orderInfo?.amount_total ? orderInfo.amount_total / 100 : 0.50);

      trackWhop("purchase", {
        event_id: code || sessionId || paypalOrderId || `ord_${Date.now()}`,
        value: totalAmount > 0 ? totalAmount : 0.50,
        currency: "USD",
        email: orderInfo?.customer_email || orderInfo?.payer?.email_address,
      });
    };

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://logbook-snowy-gamma.vercel.app/api';

    if (paypalOrderId) {
      // Capture and retrieve PayPal order
      fetch(`${API_BASE_URL}/checkout/paypal/capture-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          orderId: paypalOrderId,
          token: paypalOrderId,
          site_id: 'bookpatr'
        })
      })
        .then(res => res.json())
        .then(data => {
          if (data.orderCode) setOrderCode(data.orderCode);
          if (data.books && data.books.length > 0) {
            setPurchasedBooks(data.books);
            firePurchaseTrack(data.orderCode, data.books, data.order || data.payer);
          } else {
            // Fallback to session retrieval
            return fetch(`${API_BASE_URL}/checkout/session/${paypalOrderId}?provider=paypal&site_id=bookpatr`)
              .then(res => res.json())
              .then(fallbackData => {
                if (fallbackData.orderCode) setOrderCode(fallbackData.orderCode);
                if (fallbackData.books) {
                  setPurchasedBooks(fallbackData.books);
                  firePurchaseTrack(fallbackData.orderCode, fallbackData.books, fallbackData.order);
                }
              });
          }
        })
        .catch(err => {
          console.error("Error capturing/fetching PayPal order:", err);
          firePurchaseTrack(orderCode, []);
        })
        .finally(() => setLoading(false));
    } else if (sessionId) {
      // Stripe checkout session
      fetch(`${API_BASE_URL}/checkout/session/${sessionId}?site_id=bookpatr`)
        .then(res => res.json())
        .then(data => {
          if (data.orderCode) setOrderCode(data.orderCode);
          if (data.books) {
            setPurchasedBooks(data.books);
            firePurchaseTrack(data.orderCode, data.books, data.session || data.order);
          }
        })
        .catch(err => {
          console.error("Error fetching Stripe session:", err);
          firePurchaseTrack(orderCode, []);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      firePurchaseTrack(orderCode, []);
    }
  }, [sessionId, paypalOrderId]);

  return (
    <section className="pt-48 pb-24 flex-grow flex items-center justify-center">
      <div className="text-center max-w-2xl px-6 w-full">
        <div className="w-24 h-24 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-4xl sm:text-5xl font-newsreader font-semibold text-charcoal mb-3">
          Order Confirmed
        </h1>
        {orderCode && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-charcoal/5 border border-charcoal/10 font-mono text-xs font-bold text-charcoal mb-6">
            <span>Order Code:</span>
            <span className="text-coral">#{orderCode}</span>
          </div>
        )}
        <p className="text-sm sm:text-base font-manrope text-charcoal/60 leading-relaxed mb-10 italic">
          Thank you for your purchase. Your digital literary treasures are ready for download.
        </p>

        {loading ? (
          <div className="mb-12">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-4 bg-charcoal/10 w-48 mb-4 rounded"></div>
              <div className="h-4 bg-charcoal/10 w-32 rounded"></div>
            </div>
          </div>
        ) : purchasedBooks.length > 0 ? (
          <div className="mb-16 space-y-6">
            <h2 className="font-newsreader text-2xl text-charcoal mb-6 border-b border-charcoal/10 pb-4">Your Digital Library</h2>
            {purchasedBooks.map(book => (
              <div key={book.id} className="flex items-center justify-between bg-white p-6 rounded-lg shadow-ambient border border-charcoal/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-16 bg-charcoal/5 rounded overflow-hidden">
                    {book.cover_url && <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />}
                  </div>
                  <div className="text-left">
                    <h3 className="font-newsreader text-lg text-charcoal font-bold">{book.title}</h3>
                    <p className="text-xs font-manrope text-charcoal/40 uppercase tracking-widest">Digital Edition</p>
                  </div>
                </div>
                <a 
                  href={book.file_url} 
                  download 
                  target="_blank"
                  className="bg-coral text-white px-6 py-3 rounded-full font-manrope font-bold text-xs uppercase tracking-widest hover:bg-coral/80 transition-all"
                >
                  Download File
                </a>
              </div>
            ))}
          </div>
        ) : null}

        <Link href="/" className="inline-block bg-charcoal text-paper-beige px-12 py-5 rounded-sm font-manrope font-bold hover:bg-charcoal/90 transition-all shadow-ambient uppercase tracking-widest text-sm">
          Return to Collection
        </Link>
      </div>
    </section>
  );
}

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen flex-col bg-paper-beige">
      <Navbar />
      <Suspense fallback={<div className="pt-48 text-center font-manrope">Loading receipt...</div>}>
        <SuccessContent />
      </Suspense>
      <Footer />
    </main>
  );
}
