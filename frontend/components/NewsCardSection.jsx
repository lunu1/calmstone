"use client";

import { useRef } from "react";
import NewsCard from "./NewsCard";

export default function NewsCardSection() {
  const scrollRef = useRef(null);

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
        "India has kicked off one of the world’s largest offshore oil and gas exploration efforts through OALP Round X...",
      slug: "india-offshore-exploration",
      image: "/images/india-offshore.png",
    },
  ];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 250;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 px-6 relative">
      {/* Centered Heading */}
      <div className="flex justify-center mb-10 relative">
        <div className="text-center relative">
          <h2 className="text-[36px] md:text-[48px] font-bold text-gray-900 pb-5 uppercase">
        News & update
          </h2>
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
        </div>
      </div>

      {/* Scroll Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow z-10"
      >
        ◀
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 p-3 rounded-full shadow z-10"
      >
        ▶
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-10"
      >
        {newsItems.map((item) => (
          <div key={item.slug} className="flex-shrink-0">
            <NewsCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
