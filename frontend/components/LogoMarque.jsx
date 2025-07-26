"use client";

import React from "react";

const logos = [
  "/logos/logo1.png",
  "/logos/logo2.png",
  "/logos/logo3.jpg",
  "/logos/logo4.png",
  // "/logos/logo5.png",
  
];

const LogoMarquee = () => {
  return (
    <div className="bg-white py-8 sm:py-12 flex flex-col items-center justify-center px-4 sm:px-6">
      
      {/* Heading */}
      <div className="relative inline-block mb-10 text-center">
        <h2 className="text-[36px] md:text-[48px] font-bold text-gray-900 pb-5">
          OUR CLIENTS 
        </h2>
        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
      </div>

      {/* Marquee Container */}
      <div className="relative w-full max-w-6xl rounded-xl border border-gray-200 shadow-md overflow-hidden bg-white">
        {/* Gradient Fades */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-r from-white via-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 sm:w-24 bg-gradient-to-l from-white via-white to-transparent z-10" />

        {/* Marquee */}
        <div className="h-24 sm:h-32 overflow-hidden relative">
          <div className="absolute top-0 left-0 flex items-center h-full w-[200%] animate-marquee gap-8 sm:gap-16 px-6 sm:px-10">
            {[...logos, ...logos, ...logos].map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Logo ${index}`}
                className="h-12 sm:h-20 w-auto opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-105"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoMarquee;
