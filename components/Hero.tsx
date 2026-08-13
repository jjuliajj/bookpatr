import Link from "next/link";
import { ArrowRight, Compass, Sparkles, BookOpen, ShieldCheck, Zap, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-16 overflow-hidden bg-paper-beige">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-coral/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        {/* Main Hero Glass Card */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl border border-charcoal/10 p-8 md:p-14 shadow-xl grid lg:grid-cols-12 gap-12 items-center relative overflow-hidden">
          
          {/* Subtle Background Accent Lines */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-coral/5 rounded-full blur-2xl pointer-events-none" />

          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-coral/10 text-coral text-xs font-bold rounded-full border border-coral/20 uppercase tracking-widest font-manrope">
              <Sparkles className="w-3.5 h-3.5" /> Established 2026 • Digital Archival Library
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-newsreader font-bold text-charcoal leading-[1.12]">
              Literature as an <br />
              <span className="text-coral italic font-normal">Artisanal Experience</span>
            </h1>

            <p className="text-sm md:text-base font-manrope text-charcoal/70 leading-relaxed max-w-xl">
              A curated selection of the world's most profound literature, bound in digital excellence and presented for the discerning reader.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link 
                href="/collections" 
                className="bg-coral hover:bg-coral/90 text-white rounded-full px-8 py-4 font-manrope font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-coral/30 flex items-center justify-center gap-2.5 hover:scale-105"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link 
                href="/about" 
                className="bg-charcoal/5 hover:bg-charcoal text-charcoal hover:text-paper-beige rounded-full px-8 py-4 border border-charcoal/10 font-manrope font-bold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Our Philosophy</span>
              </Link>
            </div>

            {/* Trust Micro Badges */}
            <div className="pt-6 border-t border-charcoal/10 flex flex-wrap gap-6 text-xs font-manrope font-bold text-charcoal/60">
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
            <div className="relative aspect-[3/4] sm:aspect-[4/3] lg:aspect-[4/5] min-h-[380px] sm:min-h-[420px] lg:min-h-0 rounded-3xl overflow-hidden shadow-2xl border border-charcoal/10 group">
              <img 
                src="/hero-book.jpg" 
                alt="Curated Books" 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent" />

              {/* Floating Rating Badge */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-md px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/40 shadow-md flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-charcoal font-manrope z-10">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>4.9 / 5.0 Rating</span>
              </div>

              {/* Bottom Card Title Overlay */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-paper-beige space-y-1 z-10">
                <div className="text-[10px] font-manrope font-bold uppercase tracking-widest text-coral">
                  Featured Masterpiece
                </div>
                <div className="text-base sm:text-lg md:text-xl font-newsreader font-bold text-white flex items-center gap-2 leading-snug">
                  <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-coral flex-shrink-0" />
                  <span className="line-clamp-2">The Essential Confidence Handbook</span>
                </div>
                <p className="text-[11px] sm:text-xs font-manrope text-paper-beige/70 line-clamp-1">
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
