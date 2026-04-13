'use client';
import React, { useEffect, useState } from 'react';

const fallback = [
  { alt: 'ISO 14001:2015', src: '/certifications/iso-14001.png' },
  { alt: 'ISO 45001',      src: '/certifications/iso-45001.png' },
  { alt: 'ISO 9001:2015',  src: '/certifications/iso-9001.png' },
  { alt: 'In - Country',   src: '/certifications/incountry.png' },
  { alt: 'Prequalified',   src: '/certifications/prequalified.jpg' },
];

export default function CertificationsSection() {
  const [items, setItems] = useState(fallback);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/certifications?active=true`, { cache: 'no-store' });
        if (!res.ok) throw new Error('load fail');
        const data = await res.json();
        if (Array.isArray(data) && data.length) {
          setItems(
            data.sort((a,b)=> (a.order ?? 0) - (b.order ?? 0))
                .map(c => ({ alt: c.title, src: c.image }))
          );
        }
      } catch { /* keep fallback */ }
    })();
  }, []);

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-6 text-center">
        <div className="relative inline-block mb-10">
          <h2 className="text-[36px] md:text-[48px] font-bold text-black pb-5">
            CERTIFICATES AND ACCREDITATIONS
          </h2>
          <span className="absolute left-0 right-0 -bottom-1 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
        </div>

        <div className="flex flex-wrap justify-center gap-8 mx-auto w-full">
          {items.map(({ src, alt }, i) => (
            <div key={i} className="basis-1/4 lg:basis-1/8 flex items-center justify-center">
              <div className="w-24 h-24 md:w-32 md:h-32">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-contain grayscale hover:grayscale-0 transition duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
