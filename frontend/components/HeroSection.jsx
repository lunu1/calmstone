"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const HeroSection = ({ withOffset = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSecondText, setShowSecondText] = useState(false);
  const videoRef = useRef(null);

  // ───── Scroll-based expansion (optional) ─────
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      if (y > 100 && y < window.innerHeight * 0.7 && !isExpanded) {
        setIsExpanded(true);
        setTimeout(() => setShowSecondText(true), 400);
      } else if (y <= 100 && isExpanded) {
        setIsExpanded(false);
        setShowSecondText(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isExpanded]);

  // ───── Classes ─────
  const offsetClass = !isExpanded && withOffset ? "translate-y-15" : "";
  const videoClasses = `relative overflow-hidden transition-all duration-700 ease-out
    ${
      isExpanded
        ? "w-full h-full rounded-none"
        : "w-[94%] h-[80vh] rounded-2xl shadow-2xl"
    }`;

  return (
    <section className="relative isolate min-h-[180vh]">

      {/* ✅ Blurred Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.png" // ⬅️ Replace with your image path
          alt="Background"
          fill
          priority
          className="object-cover w-full h-full blur-sm brightness-[0.7]"
        />
      </div>

      {/* Main Content Block */}
      <div
        className={`relative z-10 sticky top-0 h-screen flex items-center justify-center ${offsetClass}`}
      >
        <div className={videoClasses}>
          {/* 🔄 Foreground Video Overlay */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>

          {/* 🔳 Gradient Layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-black/40" />

          {/* 📢 Hero Text Layer */}
          <div className="relative z-20 h-full flex flex-col items-center justify-center text-white px-8">

            {/* ✨ Collapsed (initial) Text */}
            <div
              className={`
                text-center transition-all duration-500
                ${isExpanded ? "w-full h-full" : "w-[94%] h-[80vh]"}
                mx-auto px-4 sm:px-8 md:px-16 py-14 lg:py-20
                ${
                  showSecondText
                    ? "opacity-0 -translate-y-20"
                    : "opacity-100 translate-y-0"
                }
              `}
            >
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                A New Era in Energy{" "}
                Infrastructure
              </h1>
              <h2 className="text-xl md:text-3xl font-semibold mb-6">
                Smart, agile, and future-ready EPC solutions
              </h2>
            </div>

            {/* 🔄 Expanded Text on Scroll */}
            <div
              className={`
                absolute inset-0 flex justify-center mt-20
                transition-all duration-700
                ${
                  showSecondText
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                }
              `}
            >
              <div className="text-center w-full max-w-4xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Powering the Future of{" "}
                  Energy Infrastructure
                </h2>
                <p className="text-xl md:text-2xl opacity-90 mb-12">
                  Smart EPC solutions, global expertise, and real-world execution — built for tomorrow.
                </p>
                {/* <button
                  type="button"
                  className="bg-[#FFB22C] text-black px-10 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Discover Our Capabilities
                </button> */}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
