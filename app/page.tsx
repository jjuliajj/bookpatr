import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedBooks from "@/components/FeaturedBooks";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Quote, Sparkles, CheckCircle2, ArrowRight, BookOpen, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-paper-beige">
      <Navbar />
      <Hero />

      {/* Editorial Quote Section - Dark Glassmorphism Banner */}
      <section className="py-12 px-6 md:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-br from-charcoal via-slate-900 to-indigo-950 text-paper-beige rounded-3xl p-8 md:p-16 shadow-2xl relative overflow-hidden border border-white/10 text-center space-y-6">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-coral/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-12 h-12 rounded-2xl bg-coral/20 text-coral flex items-center justify-center border border-coral/30 mx-auto">
              <Quote className="w-6 h-6" />
            </div>

            <blockquote className="font-newsreader text-2xl md:text-4xl italic text-white leading-relaxed max-w-3xl mx-auto font-medium">
              "A room without books is like a body without a soul. We curate not just objects, but vessels of human experience and imagination."
            </blockquote>

            <div className="pt-2">
              <div className="w-12 h-0.5 bg-coral mx-auto mb-3" />
              <cite className="font-manrope font-bold text-xs uppercase tracking-[0.3em] text-paper-beige/60 not-italic">
                Cicero — Rediscovered
              </cite>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <FeaturedBooks />

      {/* Philosophy Section - Split Glassmorphism Feature */}
      <section className="py-16 px-6 md:px-12">
        <div className="container mx-auto max-w-7xl">
          <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-charcoal/10 p-8 md:p-14 shadow-xl grid md:grid-cols-2 gap-12 items-center">
            
            {/* Left Image Atelier Frame */}
            <div className="order-2 md:order-1">
              <div className="aspect-[4/3] bg-charcoal/10 rounded-3xl overflow-hidden shadow-lg border border-charcoal/10 relative group">
                <img 
                  src="/philosophy.jpg" 
                  alt="Our Atelier" 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-coral/10 text-coral flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-charcoal font-newsreader">Curated Library Atelier</div>
                    <div className="text-[10px] text-charcoal/60 font-manrope font-semibold">Hand-selected literature for global readers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Text Philosophy Content */}
            <div className="order-1 md:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-coral/10 text-coral text-xs font-bold rounded-full border border-coral/20 uppercase tracking-widest font-manrope">
                <Sparkles className="w-3.5 h-3.5" /> Our Philosophy
              </div>

              <h2 className="text-3xl md:text-5xl font-newsreader font-bold text-charcoal leading-tight">
                The Art of <br />
                <span className="text-coral italic font-normal">Curated Reading</span>
              </h2>

              <div className="space-y-4 text-xs md:text-sm font-manrope text-charcoal/70 leading-relaxed">
                <p>
                  In a digital age of abundance, we believe in the luxury of selection. Our librarians hand-pick every title based on literary merit, clarity of thought, and timeless relevance.
                </p>

                <div className="space-y-2.5 pt-2">
                  <div className="flex items-start gap-3 bg-paper-beige/60 p-3 rounded-2xl border border-charcoal/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-charcoal block text-xs">Hand-Curated Merit:</strong>
                      <span className="text-[11px] text-charcoal/60">Every volume is verified for quality formatting and content excellence.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-paper-beige/60 p-3 rounded-2xl border border-charcoal/10">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-charcoal block text-xs">Instant Digital Delivery:</strong>
                      <span className="text-[11px] text-charcoal/60">Immediate access to EPUB and PDF download links after secure checkout.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold font-manrope uppercase tracking-wider text-coral hover:text-charcoal transition-colors group"
                >
                  <span>Learn about our process</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
