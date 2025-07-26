'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Share_Tech_Mono } from 'next/font/google';

// Import Share Tech Mono font locally
const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const ScrollRevealText = ({ heading = '', text = '', mission = '', vision = '' }) => {
  const containerRef = useRef(null);
  const [revealedCount, setRevealedCount] = useState(0);
  const [inView, setInView] = useState(false);
  const words = text.split(' ');
  const totalLength = words.length;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => containerRef.current && observer.unobserve(containerRef.current);
  }, []);

  useEffect(() => {
    let interval;

    if (inView) {
      interval = setInterval(() => {
        setRevealedCount((prev) => (prev < totalLength ? prev + 1 : totalLength));
      }, 100); // speed of reveal
    } else {
      interval = setInterval(() => {
        setRevealedCount((prev) => (prev > 0 ? prev - 1 : 0));
      }, 40);
    }

    return () => clearInterval(interval);
  }, [inView, totalLength]);

  return (
    <section
      ref={containerRef}
      className="py-16 flex flex-col items-center justify-center px-6 bg-white"
    >
      <div className="text-center w-full max-w-4xl">
        {/* Heading */}
        <h2 className="text-[36px] md:text-[48px] font-bold text-black mb-6">
          {heading}
        </h2>

        {/* Top Yellow Line */}
        <div
          className={`relative h-[4px] w-[60%] mx-auto mb-8 transition-opacity duration-500 ${
            revealedCount > 0 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-yellow-400 rounded-full" />
          <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent" />
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent" />
        </div>

        {/* Animated Text */}
        <p className="text-[20px] md:text-[24px] font-medium text-gray-800 leading-relaxed transition-opacity duration-700 mb-12">
          {words.map((word, idx) => (
            <span
              key={idx}
              className={`inline-block transition-opacity duration-300 ${
                idx < revealedCount ? 'opacity-100' : 'opacity-10'
              }`}
            >
              {word}&nbsp;
            </span>
          ))}
        </p>

        {/* Mission & Vision */}
        <div className="text-left md:text-center space-y-8">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Mission</h3>
            <p className="text-lg text-gray-700">{mission}</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">Vision</h3>
            <p className="text-lg text-gray-700">{vision}</p>
          </div>
        </div>

        {/* Bottom Yellow Line */}
        <div
          className={`relative h-[4px] w-[60%] mx-auto mt-8 transition-opacity duration-500 ${
            revealedCount > 0 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-yellow-400 rounded-full" />
          <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent" />
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default ScrollRevealText;
