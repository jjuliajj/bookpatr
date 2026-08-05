import BookCard from "./BookCard";
import { getBooks } from "@/lib/api";

export default async function FeaturedBooks() {
  const books = await getBooks();

  return (
    <section className="py-24 bg-paper-beige">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-coral font-manrope font-bold text-xs uppercase tracking-[0.2em] mb-4 inline-block">
              Curated Selection
            </span>
            <h2 className="text-4xl md:text-5xl font-newsreader font-semibold text-charcoal">
              Editor's Choice
            </h2>
          </div>
          <button className="hidden md:block text-sm font-manrope font-bold text-charcoal border-b-2 border-charcoal/20 pb-1 hover:border-coral transition-colors">
            View All Collections
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-8">
          {books.map((book) => (
            <BookCard key={book.id} {...book} image={book.cover_url} description={book.description} />
          ))}
        </div>
      </div>
    </section>
  );
}
