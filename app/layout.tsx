import type { Metadata } from "next";
import { Newsreader, Manrope } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import ScrollToTop from "@/components/ScrollToTop";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.logicnode.ink";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "eBookMarket Library | Premium Digital Bookstore & Archival E-Books",
    template: "%s | eBookMarket Library",
  },
  description: "A premium online bookstore and digital library for literature, philosophy, non-fiction, and artisanal EPUB e-books.",
  keywords: ["eBookMarket", "Digital Library", "EPUB Books", "eBooks Store", "Literature", "Artisanal Books", "Digital Reading"],
  alternates: {
    canonical: siteUrl,
  },
  authors: [{ name: "eBookMarket Library Team" }],
  creator: "eBookMarket Library",
  publisher: "eBookMarket Library",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "eBookMarket Library | Premium Digital Bookstore & Archival E-Books",
    description: "Discover curated literature, philosophy, and artisanal digital EPUB books with instant delivery.",
    url: siteUrl,
    siteName: "eBookMarket Library",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "eBookMarket Library",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "eBookMarket Library | Premium Digital Bookstore & Archival E-Books",
    description: "Discover curated literature, philosophy, and artisanal digital EPUB books with instant delivery.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
  verification: {
    google: "3JFpYTJYyekSzxi08IGfboOvGItI6WtJcXnpSMZpcFU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "eBookMarket Library",
    "alternateName": ["eBookMarket", "LogicNode eBookMarket"],
    "url": siteUrl,
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "eBookMarket Library",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "email": "support@ebookmarket.com",
    "description": "Premium online bookstore and digital library for literature and EPUB eBooks.",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "support@ebookmarket.com",
      "contactType": "customer support"
    }
  };

  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <meta name="google-site-verification" content="3JFpYTJYyekSzxi08IGfboOvGItI6WtJcXnpSMZpcFU" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body 
        className="min-h-full flex flex-col font-manrope bg-paper-beige text-charcoal"
        suppressHydrationWarning
      >
        <CartProvider>
          <ScrollToTop />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
