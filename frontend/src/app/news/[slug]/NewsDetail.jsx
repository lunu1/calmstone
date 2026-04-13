"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NewsDetail({ newsItem, otherNews = [], prev, next }) {
  return (
    <main className="bg-white min-h-screen my-4">
      {/* <section className="relative h-[50vh] w-full">
        <img src={newsItem.image} alt={newsItem.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center max-w-3xl px-4">
            {newsItem.title}
          </h1>
        </div>
      </section> */}

      <section className="max-w-6xl mx-auto px-6  relative z-10 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <motion.article
            className="lg:col-span-2 bg-white rounded-lg shadow-md p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
                              <img src={newsItem.image} alt={newsItem.title} className="w-full h-96 object-contain" />

            <p className="text-sm text-black my-4" suppressHydrationWarning>
              {newsItem.dateFormatted}
            </p>
             <h1 className="text-4xl md:text-3xl font-bold max-w-3xl my-4">
            {newsItem.title}
          </h1>

            <div className="prose prose-lg text-black leading-relaxed whitespace-pre-line">
              {newsItem.content}
            </div>

            {(prev || next) && (
              <div className="mt-10 flex items-center justify-between border-top pt-6">
                {prev ? (
                  <Link href={`/news/${prev.slug}`} className="inline-flex items-start max-w-[48%] gap-3 group">
                    <div className="text-2xl leading-none">←</div>
                    <div>
                      <div className="text-xs text-zinc-500" suppressHydrationWarning>
                        {prev.dateFormatted}
                      </div>
                      <div className="font-semibold text-black group-hover:underline line-clamp-2">
                        {prev.title}
                      </div>
                    </div>
                  </Link>
                ) : <span />}

                {next ? (
                  <Link href={`/news/${next.slug}`} className="inline-flex items-start max-w-[48%] gap-3 group text-right ml-auto">
                    <div>
                      <div className="text-xs text-zinc-500" suppressHydrationWarning>
                        {next.dateFormatted}
                      </div>
                      <div className="font-semibold text-black group-hover:underline line-clamp-2">
                        {next.title}
                      </div>
                    </div>
                    <div className="text-2xl leading-none">→</div>
                  </Link>
                ) : <span />}
              </div>
            )}

            <div className="mt-8">
              <Link href="/news" className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-500 transition">
                ← Back to News
              </Link>
            </div>
          </motion.article>

          <aside className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold mb-4">Other News</h3>
            <ul className="space-y-4">
              {otherNews.map((n) => (
                <li key={n.slug}>
                  <Link href={`/news/${n.slug}`} className="flex gap-3 group">
                    {n.image && <img src={n.image} alt={n.title} className="w-20 h-20 object-cover rounded" />}
                    <div>
                      <p className="text-xs text-zinc-500" suppressHydrationWarning>
                        {n.dateFormatted}
                      </p>
                      <p className="text-sm font-semibold text-black group-hover:underline line-clamp-2">
                        {n.title}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
              {otherNews.length === 0 && <p className="text-sm text-zinc-500">No more articles.</p>}
            </ul>
          </aside>
        </div>
      </section>
    </main>
  );
}
