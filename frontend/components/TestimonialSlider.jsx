"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "../src/lib/testimonials";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

export default function TestimonialSlider() {
  return (
    <section className="relative bg-white py-24 px-4 overflow-hidden">
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
             <div className="relative inline-block mb-10 text-center">
        <h2 className="text-[36px] md:text-[48px] font-bold text-gray-900 pb-5">
          OUR PROJECTS 
        </h2>
        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
      </div>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover our most innovative and impactful projects that shape the future
          </p>
        </div>

        {/* Slider */}
        <div className="relative max-w-7xl mx-auto">
          <Swiper
            modules={[Navigation, EffectCoverflow, Autoplay]}
            navigation={{ nextEl: ".swiper-button-next-custom", prevEl: ".swiper-button-prev-custom" }}
            effect="coverflow"
            grabCursor
            centeredSlides
            slidesPerView={1.1}
            spaceBetween={30}
            loop
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            coverflowEffect={{ rotate: 15, stretch: 0, depth: 200, modifier: 2, slideShadows: true }}
            breakpoints={{
              640: { slidesPerView: 1.3, spaceBetween: 40 },
              768: { slidesPerView: 1.8, spaceBetween: 50 },
              1024: { slidesPerView: 2.2, spaceBetween: 60 },
              1280: { slidesPerView: 2.5, spaceBetween: 70 },
            }}
            className="swiper-project pb-12"
          >
            {testimonials.map((project, idx) => (
              <SwiperSlide key={idx} className="group">
                <Link href={project.link || "#"} className="block group">
                  <div className="relative bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl 
                                  border border-yellow-200/50 hover:border-amber-300/70
                                  transition-all duration-500 hover:shadow-amber-200/40 hover:-translate-y-2">

                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent 
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {project.category && (
                        <div className="absolute top-4 left-4 bg-amber-400/90 backdrop-blur-sm text-white px-3 py-1 
                                        rounded-full text-sm font-medium shadow-lg">
                          {project.category}
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center 
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {project.description && (
                          <div className="text-center text-white px-4">
                            <p className="text-lg font-medium mb-2">{project.description}</p>
                            <div className="w-12 h-0.5 bg-yellow-300 mx-auto rounded-full" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-6 bg-gradient-to-br from-slate-700/95 to-black backdrop-blur-sm">
                      {project.title &&(<h3 className="font-bold text-xl mb-2 text-white group-hover:text-yellow-300 transition-colors duration-300">
                        {project.title}
                      </h3>)}

                      {project.year &&( <div className="flex items-center gap-2 text-yellow-200/80">
                        <span className="text-sm">Year: {project.year}</span>
                      </div>)}

                           {project.location &&( <div className="flex items-center gap-2 text-yellow-200/80 mb-4">
                        <span className="text-sm">Location: {project.location}</span>
                      </div>)}
                      
                      <div className="relative h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full 
                                        transform -translate-x-full group-hover:translate-x-0 transition-transform
                                        duration-1000 ease-out" />
                      </div>
                    </div>

                    {/* Glow on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-300/15 to-amber-400/15 blur-xl" />
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute top-1/2 -left-4 md:-left-12 -translate-y-1/2 z-20
                             group bg-white/80 backdrop-blur-sm hover:bg-amber-400/90 text-slate-700 hover:text-white
                             p-3 rounded-full border border-yellow-200/60 hover:border-amber-400/80 transition-all duration-300 
                             hover:shadow-xl hover:shadow-amber-300/25">
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          </button>
          <button className="swiper-button-next-custom absolute top-1/2 -right-4 md:-right-12 -translate-y-1/2 z-20
                             group bg-white/80 backdrop-blur-sm hover:bg-amber-400/90 text-slate-700 hover:text-white
                             p-3 rounded-full border border-yellow-200/60 hover:border-amber-400/80 transition-all duration-300 
                             hover:shadow-xl hover:shadow-amber-300/25">
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
