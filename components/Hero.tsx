import Link from "next/link";
import { ArrowRight, Compass, Sparkles, BookOpen, ShieldCheck, Zap, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16 overflow-hidden bg-paper-beige">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-coral/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl relative z-10">
        
        {/* Main Hero Glass Card */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-charcoal/10 p-5 sm:p-8 md:p-14 shadow-xl grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative overflow-hidden">
          
          {/* Subtle Background Accent Lines */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-coral/5 rounded-full blur-2xl pointer-events-none" />

          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-coral/10 text-coral text-[11px] sm:text-xs font-bold rounded-full border border-coral/20 uppercase tracking-widest font-manrope mx-auto sm:mx-0">
              <Sparkles className="w-3.5 h-3.5" /> Established 2026 • Digital Archival Library
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-newsreader font-bold text-charcoal leading-[1.15]">
              Literature as an{" "}
              <span className="text-coral italic font-normal block sm:inline">Artisanal Experience</span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base font-manrope text-charcoal/70 leading-relaxed max-w-xl mx-auto sm:mx-0">
              A curated selection of the world's most profound literature, bound in digital excellence and presented for the discerning reader.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 justify-center sm:justify-start">
              <Link 
                href="/collections" 
                className="bg-coral hover:bg-coral/90 text-white rounded-full px-8 py-3.5 sm:py-4 font-manrope font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-coral/30 flex items-center justify-center gap-2.5 hover:scale-105"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link 
                href="/about" 
                className="bg-charcoal/5 hover:bg-charcoal text-charcoal hover:text-paper-beige rounded-full px-8 py-3.5 sm:py-4 border border-charcoal/10 font-manrope font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Our Philosophy</span>
              </Link>
            </div>

            {/* Trust Micro Badges */}
            <div className="pt-5 sm:pt-6 border-t border-charcoal/10 flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 text-xs font-manrope font-bold text-charcoal/60">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-coral" />
                <span>Instant EPUB Download</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>256-Bit SSL Encrypted</span>
              </div>
            </div>
          </div>

          {/* Right Visual Card Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] sm:aspect-[4/3] lg:aspect-[4/5] min-h-[360px] sm:min-h-[420px] lg:min-h-0 rounded-3xl overflow-hidden shadow-2xl border border-charcoal/10 group">
              <img 
                src="/hero-book.jpg" 
                alt="Curated Books" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-charcoal/20" />

              {/* Top Header Bar inside Card: Side-by-side Badges */}
              <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between gap-2 z-10">
                <span className="px-2.5 sm:px-3 py-1 bg-coral/90 backdrop-blur-md text-white text-[9px] sm:text-[10px] font-manrope font-bold uppercase tracking-widest rounded-full shadow-md">
                  Featured Masterpiece
                </span>

                <div className="bg-white/90 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full border border-white/40 shadow-md flex items-center gap-1 text-[10px] sm:text-xs font-bold text-charcoal font-manrope">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500 fill-amber-500" />
                  <span>4.9 / 5.0</span>
                </div>
              </div>

              {/* Bottom Card Title Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-paper-beige space-y-1.5 z-10">
                <div className="text-base sm:text-lg md:text-xl font-newsreader font-bold text-white flex items-center gap-2 leading-snug">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-coral flex-shrink-0" />
                  <span className="line-clamp-2">The Essential Confidence Handbook</span>
                </div>
                <p className="text-[10px] sm:text-xs font-manrope text-paper-beige/70 line-clamp-1">
                  Martin Chavez • Archival Edition 2026
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
