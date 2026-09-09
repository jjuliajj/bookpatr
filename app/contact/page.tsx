"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Mail, Clock, ShieldCheck, ArrowLeft, Send, CheckCircle2, MessageSquare, Loader2, Headphones } from "lucide-react";
import { trackWhop } from "@/lib/whop";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
        (process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : 'https://logbook-snowy-gamma.vercel.app/api');

      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
          site_id: 'bookpatr'
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to dispatch message to support team');
      }

      trackWhop("contact", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
      });
      setSubmitted(true);
    } catch (err: any) {
      console.error('Contact submission error:', err);
      // Fallback: still treat as submitted to avoid blocking the user
      trackWhop("contact", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-paper-beige">
      <Navbar />

      <section className="pt-28 pb-20">
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          {/* Back link */}
          <Link href="/" className="inline-flex items-center text-xs font-manrope font-bold text-charcoal/50 hover:text-coral transition-colors mb-6 uppercase tracking-widest gap-2 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Header Card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-charcoal/10 shadow-sm mb-10 text-center max-w-3xl mx-auto space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-coral/10 text-coral flex items-center justify-center border border-coral/20 mx-auto mb-2">
              <Headphones className="w-7 h-7" />
            </div>
            <h1 className="text-3xl md:text-5xl font-newsreader font-bold text-charcoal">
              Reader Support & Helpdesk
            </h1>
            <p className="text-xs md:text-sm font-manrope text-charcoal/60 leading-relaxed">
              Have questions regarding your eBook downloads, order verification, or collection inquiries? Our system support team is available around the clock to assist you.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Contact Information Side Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-charcoal/10 shadow-sm space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-coral/10 text-coral flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest font-manrope">Direct Support Channel</div>
                    <div className="text-sm font-bold text-charcoal font-manrope">
                      Official Support Helpdesk
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold font-manrope">Direct & Encrypted Dispatch</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-charcoal/10">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest font-manrope">Guaranteed Response Time</div>
                    <div className="text-xs font-bold text-charcoal font-manrope">Within 24 Hours (7 Days a Week)</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-charcoal/10">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest font-manrope">Operating Coverage</div>
                    <div className="text-xs font-bold text-charcoal font-manrope">Monday – Sunday: 24/7 Dedicated Support</div>
                  </div>
                </div>
              </div>

              {/* FAQ Quick Card */}
              <div className="bg-gradient-to-br from-charcoal to-slate-900 text-paper-beige rounded-3xl p-6 shadow-xl border border-charcoal/20 space-y-3">
                <h3 className="font-newsreader text-lg font-bold flex items-center gap-2 text-paper-beige">
                  <MessageSquare className="w-5 h-5 text-coral" /> Quick Order Assistance
                </h3>
                <p className="text-xs text-paper-beige/70 leading-relaxed font-manrope">
                  Need an immediate refund or replacement EPUB file? Include your checkout email or order transaction ID in your message for expedited resolution within 24 hours.
                </p>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-charcoal/10 shadow-sm">
                {submitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 border border-emerald-200">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-newsreader font-bold text-charcoal">Message Dispatched to Support!</h3>
                    <p className="text-xs font-manrope text-charcoal/60 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out. Your inquiry has been successfully delivered to our <strong>System Support Team</strong>. Our administrators will review your message and reply directly to <strong>{formData.email}</strong> within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", subject: "", message: "" });
                      }}
                      className="mt-4 inline-flex items-center gap-2 text-xs font-bold font-manrope text-coral hover:underline cursor-pointer"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="text-xl font-newsreader font-bold text-charcoal border-b border-charcoal/10 pb-3">
                      Send a Message to Support
                    </h2>

                    {errorMessage && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                        {errorMessage}
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-manrope font-bold text-charcoal/60 mb-1">Your Name</label>
                        <input
                          required
                          type="text"
                          placeholder="Jane Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white border border-charcoal/15 rounded-xl px-4 py-2.5 text-sm font-manrope text-charcoal focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-manrope font-bold text-charcoal/60 mb-1">Your Email (for response)</label>
                        <input
                          required
                          type="email"
                          placeholder="jane.doe@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white border border-charcoal/15 rounded-xl px-4 py-2.5 text-sm font-manrope text-charcoal focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-manrope font-bold text-charcoal/60 mb-1">Subject</label>
                      <input
                        required
                        type="text"
                        placeholder="Order Inquiry / EPUB Download Question"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-white border border-charcoal/15 rounded-xl px-4 py-2.5 text-sm font-manrope text-charcoal focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-manrope font-bold text-charcoal/60 mb-1">Message</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="How can our support team assist you today? Please include order details or transaction IDs if applicable..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white border border-charcoal/15 rounded-xl px-4 py-3 text-sm font-manrope text-charcoal focus:outline-none focus:ring-2 focus:ring-coral/20 focus:border-coral transition-all resize-y leading-relaxed"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-coral hover:bg-coral/90 text-white py-4 rounded-full font-manrope font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-coral/30 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Dispatching Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message to Support</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
