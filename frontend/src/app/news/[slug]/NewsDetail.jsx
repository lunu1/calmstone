"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NewsDetail({ newsItem }) {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Image */}
      <section className="relative h-96 w-full">
        <img
          src={newsItem.image}
          alt={newsItem.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold text-center max-w-3xl px-4">
            {newsItem.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <motion.section
        className="max-w-4xl mx-auto px-6 py-12 bg-white rounded-lg shadow-md -mt-16 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-sm text-black mb-4">{newsItem.date}</p>
        <div className="prose prose-lg text-black leading-relaxed whitespace-pre-line">
          {newsItem.content}
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Link
            href="/news"
            className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-500 transition"
          >
            ← Back to News
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
