// src/app/news/page.jsx — SERVER component (no "use client")
import Link from 'next/link';

const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function getNews() {
  try {
    const res = await fetch(`${BASE}/api/news?active=true&limit=100`, {
      cache: 'no-store', // always fresh in dev; for prod you can use revalidate
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export const metadata = { title: 'News & Updates' };

export default async function NewsPage() {
  const items = await getNews();

  return (
    <main className="bg-gray-50 min-h-screen py-8 px-4 sm:px-8 lg:px-16 mt-20">
      <header className="text-center mb-8">
      <div className="flex justify-center mb-4 relative">
        <div className="text-center relative">
          <h2 className="text-[36px] md:text-[48px] font-bold text-black pb-5 uppercase">
           News and Insights
          </h2>
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
        </div>
      </div>

        <p className="text-sm text-black max-w-xl mx-auto">Stay informed with the latest developments.</p>
      </header>

      <section className="grid grid-cols-1 gap-4">
        {items.length === 0 && (
          <div className="text-center text-black">No news yet.</div>
        )}
        {items.map((item) => {
          const date = new Date(item.publishedAt || item.createdAt).toLocaleDateString();
          return (
            <div
              key={item.slug}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-3 flex flex-col md:flex-row gap-3"
            >
              <div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-28 md:h-24 object-cover rounded-md"
                />
              </div>

              <div className="flex flex-col justify-between md:w-3/4">
                <div>
                  <span className="text-xs text-black">{date}</span>
                  <h2 className="text-base font-semibold text-black mt-1 mb-2 line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-black text-sm line-clamp-2">{item.summary}</p>
                </div>
                <Link
                  href={`/news/${item.slug}`}
                  className="text-yellow-600 text-sm font-semibold hover:underline mt-2 self-start"
                >
                  Read More →
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
