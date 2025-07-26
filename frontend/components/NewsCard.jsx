"use client";

import Link from "next/link";

export default function NewsCard({ item }) {
  return (
    <Link
      href={`/news/${item.slug}`}
      className="flex items-start bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden w-full max-w-sm p-3 gap-3"
    >
      {/* Image on Left */}
      <div className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="w-20 h-20 object-cover rounded-md"
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col justify-between">
        <p className="text-xs text-black">{item.date}</p>
        <h3 className="text-sm font-bold text-black mt-1 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-xs text-black mt-1 line-clamp-2">
          {item.summary}
        </p>
      </div>
    </Link>
  );
}
