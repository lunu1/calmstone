"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NewsPage() {
  const newsItems = [
    {
      title: "Oil Prices Drop Sharply as Global Demand Slows and Supply Rises",
      date: "30th June 2025",
      summary:
        "Global oil prices have entered a volatile phase, impacted by weakening demand and increasing supply...",
      slug: "oil-prices-drop",
      image: "/images/oil-drop.jpg",
    },
    {
      title:
        "India Launches Massive Offshore Energy Exploration Covering Over 2.5 Lakh km²",
      date: "09th July 2025",
      summary:
        "India has kicked off one of the world’s largest offshore oil and gas exploration efforts...",
      slug: "india-offshore-exploration",
      image: "/images/india-offshore.png",
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen py-8 px-4 sm:px-8 lg:px-16">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-[36px] md:text-[48px] font-bold text-gray-900 mb-2">
          News & Updates
        </h1>
        <p className="text-sm text-gray-600 max-w-xl mx-auto">
          Stay informed with the latest developments.
        </p>
      </header>

      {/* News Grid */}
      <section className="grid grid-cols-1 gap-4">
        {newsItems.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-3 flex flex-col md:flex-row gap-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Image */}
            <div className="">
              <img
                src={item.image}
                alt={item.title}
                className="w-28 h-28 md:h-24 object-cover rounded-md"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-between md:w-3/4">
              <div>
                <span className="text-xs text-gray-500">{item.date}</span>
                <h2 className="text-base font-semibold text-gray-800 mt-1 mb-2 line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {item.summary}
                </p>
              </div>
              <Link
                href={`/news/${item.slug}`}
                className="text-yellow-600 text-sm font-semibold hover:underline mt-2 self-start"
              >
                Read More →
              </Link>
            </div>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
