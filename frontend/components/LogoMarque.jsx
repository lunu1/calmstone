'use client';
import React, { useEffect, useState } from 'react';

const fallback = [
  "/logos/logo1.png",
  "/logos/logo2.png",
  "/logos/logo3.jpg",
  "/logos/logo4.png",
];

const LogoMarquee = () => {
  const [logos, setLogos] = useState(fallback);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logos?active=true`, { cache: 'no-store' });
        if (!res.ok) throw new Error('load fail');
        const data = await res.json();
        if (Array.isArray(data) && data.length) {
          setLogos(data.sort((a,b)=> (a.order ?? 0) - (b.order ?? 0)).map(l => l.image));
        }
      } catch { /* keep fallback */ }
    })();
  }, []);

  return (
    <div className="bg-white py-8 sm:py-12 flex flex-col items-center justify-center px-4 sm:px-6">
      <div className="relative inline-block mb-10 text-center">
        <h2 className="text-[36px] md:text-[48px] font-bold text-black pb-5">CLIENTS & END CLIENTS</h2>
        <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
      </div>

      <div className="relative w-full max-w-6xl rounded-xl border border-gray-200 shadow-md overflow-hidden bg-white">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-r from-white via-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-l from-white via-white to-transparent z-10" />
        <div className="h-24 sm:h-32 overflow-hidden relative">
          <div className="absolute top-0 left-0 flex items-center h-full w-[200%] animate-marquee gap-8 sm:gap-16 px-6 sm:px-10">
            {[...logos, ...logos, ...logos].map((src, i) => (
              <img key={i} src={src} alt={`Logo ${i}`} className="h-12 sm:h-20 w-auto opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105 object-contain" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoMarquee;
