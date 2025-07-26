'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

const MotionLink = motion(Link);

export default function HoverPanel({ title, body, img, href, isExpanded, onToggle }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile Version
  if (isMobile) {
    return (
      <div className="relative w-full h-full">
        <Image
          src={img}
          alt={title}
          fill
          className="w-full h-full object-cover "
        />
        {/* Yellow shade */}
       {/* <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/60 via-yellow-500/30 to-transparent" /> */}
       {/* Black shade */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />




        <div className="relative z-10 p-6">
          <button
            onClick={onToggle}
            className="flex items-center justify-between w-full text-left"
          >
            <h2 className="text-xl font-bold text-white">{title}</h2>
            <ChevronDown 
              className={`w-6 h-6 text-white transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          <motion.div
            initial={false}
            animate={{
              height: isExpanded ? 'auto' : 0,
              opacity: isExpanded ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4">
              <p className="text-white/90 leading-relaxed">{body}</p>
              <Link
                href={href}
                className="inline-block border border-white px-6 py-2 text-white hover:bg-white  transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Desktop Version 
  return (
    <MotionLink
      href={href}
      className="relative flex h-full w-full overflow-hidden group"
      whileHover="show"
      initial="hide"
    >
      <Image
        src={img}
        alt={title}
        fill
        className="object-cover transition-transform duration-900 group-hover:scale-110"
      />
      
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/40 to-transparent" /> */}

      <motion.div
        variants={{
          hide: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
        className="relative z-10 p-8 w-full h-full flex flex-col justify-start pointer-events-none mt-10"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{title}</h2>
        <p className="mt-6 max-w-sm leading-relaxed text-white">{body}</p>
        <span className="mt-6 inline-block w-fit border border-white px-4 py-2 text-white hover:bg-white hover:text-[#042783] transition-colors pointer-events-auto">
          Learn More
        </span>
      </motion.div>
    </MotionLink>
  );
}