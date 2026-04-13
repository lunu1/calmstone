"use client";

import { useEffect, useRef, useState } from "react";
import NewsCard from "./NewsCard";

const fallbackItems = [
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
      "India has kicked off one of the world’s largest offshore oil and gas exploration efforts through OALP Round X...",
    slug: "india-offshore-exploration",
    image: "/images/india-offshore.png",
  },
];

export default function NewsCardSection() {
  const scrollRef = useRef(null);
  const [items, setItems] = useState(fallbackItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        // grab latest 10 active items
        const res = await fetch(`${base}/api/news?active=true&limit=10`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed");
        const data = await res.json();

        if (Array.isArray(data) && data.length) {
          const mapped = data.map((n) => ({
            slug: n.slug,
            title: n.title,
            image: n.image,
            summary: n.summary,
            date: new Date(n.publishedAt || n.createdAt).toLocaleDateString(),
          }));
          setItems(mapped);
        }
      } catch (_) {
        // keep fallbackItems
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 250;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-12 px-6 relative">
      {/* Heading */}
      <div className="flex justify-center mb-10 relative">
        <div className="text-center relative">
          <h2 className="text-[36px] md:text-[48px] font-bold text-black pb-5 uppercase">
            News & Update
          </h2>
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow z-10"
        aria-label="Scroll left"
      >
        ◀
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow z-10"
        aria-label="Scroll right"
      >
        ▶
      </button>

      {/* Strip */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-10 snap-x"
      >
        {loading ? (
          // simple skeletons
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[320px] h-[112px] rounded-lg bg-gray-200 animate-pulse"
            />
          ))
        ) : (
          items.map((item) => (
            <div key={item.slug} className="flex-shrink-0 snap-start">
              <NewsCard item={item} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}
