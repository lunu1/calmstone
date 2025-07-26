"use client";
import React, { useRef } from "react";
import Image from "next/image";

const Testimonials = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-black py-20 relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="relative inline-block text-center">
            <h2 className="text-3xl sm:text-5xl font-bold text-white pb-5">
              What Our <span className="text-yellow-400">Team</span> Says
            </h2>
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
          </div>
        </header>

        {/* Wrapper for Buttons + Scroll */}
        <div className="flex items-center gap-6">
          {/* Left Button */}
          <button
            onClick={scrollLeft}
            className="bg-yellow-400 text-black p-3 rounded-full hover:bg-yellow-500 transition"
          >
            &#8592;
          </button>

          {/* Scrollable Testimonials */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto hide-scrollbar scroll-smooth flex-1"
          >
            <div className="flex gap-10">
              {/* Testimonial 1 */}
              <div className="border-2 border-amber-200/60 rounded-2xl p-6 hover:shadow-2xl hover:border-amber-300/80 transition-all duration-500 bg-gradient-to-br from-amber-50/90 via-yellow-50/70 to-orange-50/60 hover:from-amber-100/90 hover:via-yellow-100/80 hover:to-orange-100/70 backdrop-blur-sm shadow-xl flex flex-col justify-between min-w-[350px] sm:min-w-[500px]">
                <p className="text-xl text-black italic mb-4 font-bold">
                  "I joined Calm Stone as a site supervisor, and from day one, I
                  was trusted with real responsibility..."
                </p>
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700">
                    <Image src="/man.png" alt="Danish Ali" width={64} height={64} className="object-cover" />
                  </div>
                  <div>
                    <p className="text-yellow-400 font-bold text-3xl">Danish Ali</p>
                    <p className="text-xl font-bold text-black">Site Supervisor</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="border-2 border-amber-200/60 rounded-2xl p-6 hover:shadow-2xl hover:border-amber-300/80 transition-all duration-500 bg-gradient-to-br from-amber-50/90 via-yellow-50/70 to-orange-50/60 hover:from-amber-100/90 hover:via-yellow-100/80 hover:to-orange-100/70 backdrop-blur-sm shadow-xl flex flex-col justify-between min-w-[350px] sm:min-w-[500px]">
                <p className="text-xl text-black italic mb-4 font-bold">
                  "As an administrator at Calm Stone, I appreciate how structured
                  and streamlined our internal processes are..."
                </p>
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700">
                    <Image src="/girl.png" alt="Nouhaila Arrad" width={64} height={64} className="object-cover" />
                  </div>
                  <div>
                    <p className="text-yellow-400 font-bold text-3xl">Nouhaila Arrad</p>
                    <p className="text-xl font-bold text-black">Administrator</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="border-2 border-amber-200/60 rounded-2xl p-6 hover:shadow-2xl hover:border-amber-300/80 transition-all duration-500 bg-gradient-to-br from-amber-50/90 via-yellow-50/70 to-orange-50/60 hover:from-amber-100/90 hover:via-yellow-100/80 hover:to-orange-100/70 backdrop-blur-sm shadow-xl flex flex-col justify-between min-w-[350px] sm:min-w-[500px]">
                <p className="text-xl text-black italic mb-4 font-bold">
                  "Calm Stone gives you the opportunity to lead complex projects
                  with full ownership..."
                </p>
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700">
                    <Image src="/man.png" alt="Zeeshan Azeem" width={64} height={64} className="object-cover" />
                  </div>
                  <div>
                    <p className="text-yellow-400 font-bold text-3xl">Zeeshan Azeem</p>
                    <p className="text-xl font-bold text-black">Project Manager</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 4 */}
              <div className="border-2 border-amber-200/60 rounded-2xl p-6 hover:shadow-2xl hover:border-amber-300/80 transition-all duration-500 bg-gradient-to-br from-amber-50/90 via-yellow-50/70 to-orange-50/60 hover:from-amber-100/90 hover:via-yellow-100/80 hover:to-orange-100/70 backdrop-blur-sm shadow-xl flex flex-col justify-between min-w-[350px] sm:min-w-[500px]">
                <p className="text-xl text-black italic mb-4 font-bold">
                  "What sets Calmstone apart is its genuine commitment to health
                  and safety..."
                </p>
                <div className="flex items-center space-x-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700">
                    <Image src="/man.png" alt="Maqbool Ahmed" width={64} height={64} className="object-cover" />
                  </div>
                  <div>
                    <p className="text-yellow-400 font-bold text-3xl">Maqbool Ahmed</p>
                    <p className="text-xl font-bold text-black">HSE Officer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Button */}
          <button
            onClick={scrollRight}
            className="bg-yellow-400 text-black p-3 rounded-full hover:bg-yellow-500 transition"
          >
            &#8594;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
