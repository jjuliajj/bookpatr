"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { getBooks, Book } from "@/lib/api";
import { Search, X, BookOpen, Loader2, Menu, ShoppingBag } from "lucide-react";
import { BuyWithKofiButton, SupportKofiButton } from "@/components/KofiButtons";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, isMounted } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  // Search states
  const [searchQuery, setSearchQuery] = useState("");
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoadingBooks, setIsLoadingBooks] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Fetch books for live search on first focus
  const handleSearchFocus = async () => {
    setIsSearchFocused(true);
    if (allBooks.length === 0 && !isLoadingBooks) {
      setIsLoadingBooks(true);
      try {
        const books = await getBooks();
        setAllBooks(books);
      } catch (err) {
        console.error("Failed to load search index:", err);
      } finally {
        setIsLoadingBooks(false);
      }
    }
  };

  // Filter books based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase().trim();
    const matches = allBooks.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        (b.category && b.category.toLowerCase().includes(query))
    ).slice(0, 6);
    setSearchResults(matches);
  }, [searchQuery, allBooks]);

  const navItems = ["Collections", "Genres", "Authors", "About"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 md:px-12 py-4 md:py-5 flex justify-between items-center ${
        isScrolled || isMobileMenuOpen ? "bg-paper-beige/95 backdrop-blur-md shadow-md border-b border-charcoal/5" : "bg-paper-beige/50 backdrop-blur-sm"
      }`}
    >
      {/* Brand Logo & Name */}
      <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300 border border-charcoal/10 bg-white p-0.5 flex-shrink-0">
          <img src="/logo.png" alt="eBookMarket Library Logo" className="w-full h-full object-cover rounded-lg" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg sm:text-xl md:text-2xl font-newsreader font-bold tracking-tight text-charcoal leading-none">
            eBookMarket <span className="text-coral italic font-normal">Library</span>
          </span>
          <span className="text-[8px] sm:text-[9px] font-manrope font-semibold tracking-widest text-charcoal/40 uppercase mt-0.5">Digital Archive</span>
        </div>
      </Link>

      {/* Header Search Bar (Desktop) */}
      <div className="relative hidden lg:block w-72 xl:w-96" ref={searchRef}>
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-charcoal/40" />
          <input
            type="text"
            placeholder="Search books, authors, categories..."
            value={searchQuery}
            onFocus={handleSearchFocus}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2 text-xs font-manrope bg-charcoal/5 hover:bg-charcoal/10 focus:bg-white rounded-full border border-charcoal/10 focus:border-coral focus:outline-none transition-all placeholder:text-charcoal/40 text-charcoal font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 p-1 text-charcoal/40 hover:text-charcoal transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Live Search Results Dropdown */}
        {isSearchFocused && (searchQuery.trim() !== "" || isLoadingBooks) && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-paper-beige border border-charcoal/10 rounded-2xl shadow-xl overflow-hidden z-50 p-2 animate-in fade-in zoom-in-95 duration-200">
            {isLoadingBooks ? (
              <div className="p-4 text-center text-xs text-charcoal/50 flex items-center justify-center gap-2 font-manrope">
                <Loader2 className="w-4 h-4 animate-spin text-coral" /> Loading library database...
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-1">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-coral">
                  Search Results ({searchResults.length})
                </div>
                {searchResults.map((book) => (
                  <Link
                    key={book.id}
                    href={`/products/${book.id}`}
                    onClick={() => {
                      setIsSearchFocused(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-charcoal/5 rounded-xl transition-colors group"
                  >
                    <div className="w-9 h-12 bg-charcoal/10 rounded overflow-hidden flex-shrink-0 shadow-sm border border-charcoal/5">
                      {book.cover_url ? (
                        <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-charcoal/30" />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="text-xs font-bold text-charcoal truncate group-hover:text-coral transition-colors">
                        {book.title}
                      </div>
                      <div className="text-[11px] text-charcoal/50 truncate font-manrope">
                        {book.author}
                      </div>
                    </div>
                    <div className="text-xs font-bold text-coral whitespace-nowrap px-2">
                      {book.price}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-xs text-charcoal/40 font-manrope">
                No books found matching &quot;{searchQuery}&quot;
              </div>
            )}
          </div>
        )}
      </div>

      {/* Desktop Navigation Links & Cart */}
      <div className="hidden md:flex space-x-7 items-center">
        {navItems.map((item) => {
          const href = `/${item.toLowerCase()}`;
          const isActive = pathname === href || (href === "/collections" && (pathname === "/" || pathname.startsWith("/products")));

          return (
            <Link
              key={item}
              href={href}
              className={`relative py-1 text-xs font-manrope uppercase tracking-widest transition-all duration-300 ${
                isActive
                  ? "text-coral font-bold"
                  : "text-charcoal/60 hover:text-charcoal font-semibold"
              }`}
            >
              {item}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-coral rounded-full" />
              )}
            </Link>
          );
        })}
        
        {/* Cart Icon (Desktop) */}
        <Link href="/cart" className="relative group py-1" title="View Cart">
          <ShoppingBag className={`w-5 h-5 transition-colors ${pathname === "/cart" ? "text-coral" : "text-charcoal group-hover:text-coral"}`} />
          {isMounted && cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-coral text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-xs">
              {cartCount}
            </span>
          )}
          {pathname === "/cart" && (
            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-coral rounded-full" />
          )}
        </Link>

        {/* Ko-fi Action Buttons (Desktop) */}
        <div className="flex items-center gap-2">
          <BuyWithKofiButton />
          <SupportKofiButton />
        </div>
      </div>

      {/* Mobile Controls Right Side (Cart Icon OUTSIDE + Hamburger Menu Toggle) */}
      <div className="flex md:hidden items-center gap-3">
        {/* Cart Icon (Mobile Exposed) */}
        <Link 
          href="/cart" 
          className="relative p-2 text-charcoal hover:text-coral transition-colors rounded-full bg-charcoal/5 border border-charcoal/10" 
          title="View Cart"
        >
          <ShoppingBag className={`w-5 h-5 ${pathname === "/cart" ? "text-coral" : "text-charcoal"}`} />
          {isMounted && cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-coral text-white text-[10px] font-bold w-4.5 h-4.5 min-w-[18px] px-1 flex items-center justify-center rounded-full shadow-sm">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Mobile Hamburger Menu Toggle Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-charcoal hover:text-coral transition-colors rounded-full bg-charcoal/5 border border-charcoal/10 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 text-coral" />
          ) : (
            <Menu className="w-5 h-5 text-charcoal" />
          )}
        </button>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-paper-beige/98 backdrop-blur-md border-b border-charcoal/10 shadow-xl md:hidden p-6 space-y-5 animate-in slide-in-from-top-2 duration-200 z-50">
          {/* Mobile Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
            <input
              type="text"
              placeholder="Search books, authors..."
              value={searchQuery}
              onFocus={handleSearchFocus}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 text-xs font-manrope bg-white rounded-xl border border-charcoal/15 focus:border-coral focus:outline-none text-charcoal"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-charcoal/40 hover:text-charcoal"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile Search Results */}
          {searchQuery.trim() !== "" && searchResults.length > 0 && (
            <div className="bg-white rounded-xl p-2 border border-charcoal/10 space-y-1 max-h-48 overflow-y-auto">
              {searchResults.map((book) => (
                <Link
                  key={book.id}
                  href={`/products/${book.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-2 hover:bg-charcoal/5 rounded-lg text-xs font-manrope"
                >
                  <div className="w-7 aspect-[9/16] bg-charcoal/10 rounded overflow-hidden flex-shrink-0">
                    {book.cover_url && <img src={book.cover_url} alt={book.title} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-grow min-w-0 truncate font-bold text-charcoal">{book.title}</div>
                  <div className="text-coral font-bold">{book.price}</div>
                </Link>
              ))}
            </div>
          )}

          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-3 pt-2">
            {navItems.map((item) => {
              const href = `/${item.toLowerCase()}`;
              const isActive = pathname === href || (href === "/collections" && (pathname === "/" || pathname.startsWith("/products")));

              return (
                <Link
                  key={item}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl font-manrope text-sm uppercase tracking-widest transition-all flex items-center justify-between ${
                    isActive
                      ? "bg-coral/10 text-coral font-bold"
                      : "text-charcoal/70 hover:bg-charcoal/5 font-semibold"
                  }`}
                >
                  <span>{item}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-coral" />}
                </Link>
              );
            })}
          </div>

          {/* Ko-fi Buttons (Mobile) */}
          <div className="pt-2 flex flex-col gap-2.5 items-stretch">
            <BuyWithKofiButton className="justify-center py-3 text-sm" />
            <SupportKofiButton className="justify-center py-3 text-sm" />
          </div>
        </div>
      )}
    </nav>
  );
}
