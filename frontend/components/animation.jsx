/* components/HeroScrollSlider.jsx – deck follows scroll continuously */
'use client';
import { useEffect, useRef, useState } from 'react';

/* 1.  slide data */
const slides = [
  { img: '/one.jpg', stat: '30,000+',  label: 'Bright Minds'   },
  { img: '/two.jpg',       stat: '90+',     label: 'Nationalities' },
  { img: '/three.jpg', stat: '100%',    label: 'Committed'      },
  { img: '/four.jpg',       stat: '100 yrs', label: 'Heritage'       },
  { img: '/five.jpg', stat: '1 Team',  label: 'One Vision'     }
];

/* 2.  gap size (% of card height) */
const CARD_GAP = 60;          // keep it roomy

export default function HeroScrollSlider() {
  const wrapperRef = useRef(null);

  /* progress = 0 … (slides.length-1) as float */
  const [progress, setProgress] = useState(0);

  /* ---- scroll listener -------------------------------------------------- */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    /* rAF throttling so we don't set state on every raw scroll event */
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const { top, height } = wrapper.getBoundingClientRect();
        const winH   = window.innerHeight;
        const clampedY = Math.min(Math.max(-top, 0), height - winH);   // 0 → wrapperScrollRange
        setProgress(clampedY / winH);                                  // float
        ticking = false;
      });
    };

    onScroll();                            // initialise
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* derived integer for dot highlighting */
  const activeIndex = Math.round(progress);

  /* ---- helpers ---------------------------------------------------------- */
  const scrollToSlide = (i) => {
    const wrapTop = wrapperRef.current?.offsetTop ?? 0;
    window.scrollTo({ top: wrapTop + i * window.innerHeight, behavior: 'smooth' });
  };

  /* ---- render ----------------------------------------------------------- */
  return (
    <section ref={wrapperRef} style={{ height: `${slides.length * 100}vh` }}>
      <div className="relative sticky top-0 h-screen bg-white text-neutral-900">
        
        {/* Mobile Layout */}
        <div className="md:hidden h-full flex flex-col">
          {/* headline - top section */}
          <div className={`flex-1 flex items-center justify-center px-4 sm:px-8 pt-8 transition-opacity duration-500 ${
            activeIndex === 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <div className="max-w-xl text-center">
              <h1 className="text-[2rem] sm:text-[2.8rem] font-bold leading-tight">
             Engineering energy for today<br /> and the future  
              </h1>
              <button className="mt-6 px-4 sm:px-6 py-2 sm:py-3 border-2 border-neutral-900 font-medium tracking-wide hover:bg-neutral-900 hover:text-white transition text-sm sm:text-base">
                Discover the Calm Stone Approach
              </button>
            </div>
          </div>
          
          {/* slider deck - bottom section */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-8 pb-16">
            <div className="relative w-64 h-80 sm:w-80 sm:h-96 shrink-0 overflow-visible pointer-events-none">
              {slides.map(({ img, stat, label }, i) => {
                const offset = (i - progress) * (100 + CARD_GAP);
                return (
                  <div
                    key={stat}
                    className="absolute inset-0 rounded-md shadow-2xl transition-transform duration-0 will-change-transform"
                    style={{ transform: `translateY(${offset}%)` }}
                  >
                    <img src={img} alt={label} className="h-full w-full object-cover rounded-md" />
                    <div className="absolute bottom-0 inset-x-0 py-3 sm:py-4 px-3 sm:px-4 bg-neutral-900/70 backdrop-blur-sm rounded-b-md">
                      <p className="text-white text-2xl sm:text-3xl font-extrabold mb-1">{stat}</p>
                      <p className="text-white/90 tracking-wide text-sm sm:text-base">{label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex h-full items-center justify-between px-8 md:px-20">
          {/* headline */}
          <div className="max-w-xl">
            <h1 className="text-[2.8rem] md:text-[4.5rem] font-bold leading-tight">
              Engineering energy for today <span className='text-yellow-400'></span> and the future  
            </h1>
            <button className="mt-8 px-6 py-3 border-2 border-neutral-900 font-medium tracking-wide hover:bg-neutral-900 hover:text-white transition">
             Discover the Calm Stone Approach
            </button>
          </div>

          {/* slider deck */}
          <div className="relative w-96 h-[28rem] shrink-0 overflow-visible pointer-events-none">
            {slides.map(({ img, stat, label }, i) => {
              const offset = (i - progress) * (100 + CARD_GAP);
              return (
                <div
                  key={stat}
                  className="absolute inset-0 rounded-md shadow-2xl transition-transform duration-0 will-change-transform"
                  style={{ transform: `translateY(${offset}%)` }}
                >
                  <img src={img} alt={label} className="h-full w-full object-cover rounded-md" />
                  <div className="absolute bottom-0 inset-x-0 py-6 px-6 bg-neutral-900/70 backdrop-blur-sm rounded-b-md">
                    <p className="text-white text-4xl font-extrabold mb-1">{stat}</p>
                    <p className="text-white/90 tracking-wide">{label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Dots */}
        {/* Mobile: Bottom center */}
        <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-row gap-2 pointer-events-auto">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full border transition
                          ${i === activeIndex
                            ? 'bg-neutral-900 border-neutral-900 scale-110'
                            : 'bg-transparent border-neutral-400'}`}
            />
          ))}
        </div>
        
        {/* Desktop: Right side */}
        <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-3 pointer-events-auto">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-3 w-3 rounded-full border transition
                          ${i === activeIndex
                            ? 'bg-neutral-900 border-neutral-900 scale-110'
                            : 'bg-transparent border-neutral-400'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}  