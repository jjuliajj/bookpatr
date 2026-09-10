import { getWhopProducts, findMatchingWhopProduct } from "@/lib/whop-api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === 'development' ? 'http://localhost:5000/api' : 'https://logbook-snowy-gamma.vercel.app/api');

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  price: string;
  details: {
    Publisher?: string;
    Pages?: string;
    Language?: string;
    Format?: string;
  };
  file_url: string;
  cover_url: string;
  created_at?: string;
  whop_checkout_url?: string;
  whop_plan_id?: string;
  is_whop_product?: boolean;
}

export async function getBooks(): Promise<Book[]> {
  try {
    const [booksRes, whopProducts] = await Promise.all([
      fetch(`${API_BASE_URL}/books?site=bookpatr`, { next: { revalidate: 60 } }),
      getWhopProducts(),
    ]);

    if (!booksRes.ok) throw new Error(`Failed to fetch books: ${booksRes.status}`);
    const contentType = booksRes.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("API response is not JSON:", contentType);
      return [];
    }
    const rawBooks: Book[] = await booksRes.json();

    const merged = rawBooks.map((b) => {
      const match = findMatchingWhopProduct(b.title, whopProducts);
      if (match) {
        return {
          ...b,
          price: match.formattedPrice,
          whop_checkout_url: match.checkout_url,
          whop_plan_id: match.plan_id,
          is_whop_product: true,
        };
      }
      return b;
    });

    // Bring Whop products to front of the collection
    const whopItems = merged.filter((b) => b.is_whop_product);
    const nonWhopItems = merged.filter((b) => !b.is_whop_product);
    return [...whopItems, ...nonWhopItems];
  } catch (error) {
    console.error("getBooks error:", error);
    return [];
  }
}

export async function getBook(id: string): Promise<Book | null> {
  try {
    const [bookRes, whopProducts] = await Promise.all([
      fetch(`${API_BASE_URL}/books/${id}`, { next: { revalidate: 60 } }),
      getWhopProducts(),
    ]);

    if (!bookRes.ok) return null;
    const contentType = bookRes.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("API response is not JSON:", contentType);
      return null;
    }
    const book: Book = await bookRes.json();

    const match = findMatchingWhopProduct(book.title, whopProducts);
    if (match) {
      return {
        ...book,
        price: match.formattedPrice,
        whop_checkout_url: match.checkout_url,
        whop_plan_id: match.plan_id,
        is_whop_product: true,
      };
    }
    return book;
  } catch (error) {
    console.error("getBook error:", error);
    return null;
  }
}
