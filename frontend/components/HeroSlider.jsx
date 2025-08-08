'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
  {
    image: '/hero1.jpg',
    heading: 'Empowering Global Energy',
    subheading: 'Leading upstream innovation with a commitment to excellence and sustainability.',
  },
  {
    image: '/hero2.jpg',
    heading: 'Engineering the Future',
    subheading: 'Advanced infrastructure and logistics fueling energy transitions worldwide.',
  },
  {
    image: '/hero4.jpg',
    heading: 'Resilient in Harsh Environments',
    subheading: 'Delivering reliable offshore and desert energy solutions across continents.',
  },
  {
    image: '/hero3.jpg',
    heading: 'From Exploration to Delivery',
    subheading: 'Calmstone ensures seamless energy production, refinement, and distribution.',
  },
];


export default function HeroSlider() {
  return (
    <section className="relative h-screen w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000 }}
        loop
        pagination={{ clickable: true }}
        navigation
        className="h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="h-screen w-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/40 z-10" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-20 px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                  {slide.heading}
                </h1>
                <p className="text-lg md:text-2xl drop-shadow-md max-w-2xl">
                  {slide.subheading}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
