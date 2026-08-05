import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-paper-beige py-24 px-6 md:px-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="flex items-center gap-3 mb-8">
            <img src="/logo.png" alt="eBookMarket Logo" className="w-10 h-10 rounded-xl object-cover" />
            <span className="text-3xl font-newsreader font-semibold tracking-tight">
              eBookMarket <span className="text-coral italic font-normal">Library</span>
            </span>
          </Link>
          <p className="font-manrope text-paper-beige/60 max-w-md leading-relaxed mb-8">
            Your premium digital library and bookstore for curated literature and artisanal eBooks.
          </p>
          <div className="flex space-x-4">
             <input 
               type="email" 
               placeholder="Your email address" 
               className="bg-paper-beige/10 border-b border-paper-beige/30 py-2 px-4 focus:outline-none focus:border-coral transition-colors flex-grow max-w-xs font-manrope text-sm"
             />
             <button className="text-coral font-manrope font-bold text-sm uppercase tracking-widest hover:text-white transition-colors">
               Subscribe
             </button>
          </div>
        </div>

        <div>
          <h4 className="font-newsreader text-xl mb-6">Explore</h4>
          <ul className="space-y-4 text-paper-beige/60 font-manrope text-sm">
            <li><Link href="/collections" className="hover:text-coral transition-colors">Special Editions</Link></li>
            <li><Link href="/genres" className="hover:text-coral transition-colors">Browse Genres</Link></li>
            <li><Link href="/authors" className="hover:text-coral transition-colors">Our Authors</Link></li>
            <li><Link href="/journals" className="hover:text-coral transition-colors">Literary Journal</Link></li>
            <li><Link href="/about" className="hover:text-coral transition-colors">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-newsreader text-xl mb-6">Support & Policy</h4>
          <ul className="space-y-4 text-paper-beige/60 font-manrope text-sm">
            <li><Link href="/contact" className="hover:text-coral transition-colors">Contact & Support</Link></li>
            <li><Link href="/terms" className="hover:text-coral transition-colors">Terms of Service</Link></li>
            <li><Link href="/refund" className="hover:text-coral transition-colors">Refund & Cancellation</Link></li>
            <li><Link href="/privacy" className="hover:text-coral transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mt-24 pt-8 border-t border-paper-beige/10 flex flex-col md:flex-row justify-between items-center text-xs font-manrope text-paper-beige/30 uppercase tracking-[0.2em]">
        <p>© 2026 eBookMarket Library. All Rights Reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/terms" className="hover:text-paper-beige transition-colors">Terms</Link>
          <Link href="/privacy" className="hover:text-paper-beige transition-colors">Privacy</Link>
          <Link href="/refund" className="hover:text-paper-beige transition-colors">Refunds</Link>
          <Link href="/contact" className="hover:text-paper-beige transition-colors">Support</Link>
        </div>
      </div>
    </footer>
  );
}
