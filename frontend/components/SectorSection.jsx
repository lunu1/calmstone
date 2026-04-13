'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HoverPanel from './HoverPanel';

// ----- Fallback data (your current content) -----
const fallbackSections = [
  {
    title: 'Oilfield Surface Construction',
    body:
      'We deliver comprehensive oilfield surface construction services covering Civil & Structural Works, Mechanical & Piping Works, and Electrical & Instrumentation Works. Our expertise includes site clearing, excavation, concrete works, road construction, structural steel fabrication, piping fabrication and testing, installation of static and rotating equipment, and commissioning of instrumentation systems. We also specialize in HDPE internal lining and epoxy coating for carbon steel pipelines.',
    img: '/images/construction.jpg',
    href: '/construction',
    subpoints: [
      'Civil & Structural Works',
      'Mechanical & Piping Works',
      'Electrical & Instrumentation Works',
      'Electrical & Instrumentation Works',
      'High-Density Polyethylene (HDPE) Internal Lining for existing or new Carbon Steel Pipelines',
      'Fusion Bonded Epoxy (FBE) and Liquid Epoxy Internal Coating for new Carbon Steel Pipelines',
    ],
  },
  {
    title: 'Technical Consulting',
    body:
      'Our technical consulting services encompass Engineering & Design, HSE safety assessments, and engineering manpower support. We offer advanced solutions such as Digital Oilfield integration and provide site services for Integrated Control and Safety Systems (ICSS), Distributed Control Systems (DCS), Safety Instrumented Systems (SIS), and Fire & Gas detection systems, ensuring operational efficiency and safety compliance.',
    img: '/images/consultation.jpg',
    href: '/consultation',
    subpoints: [],
  },
  {
    title: 'Material and Equipment Supply',
    body:
      'We provide reliable supply of critical materials and equipment for industrial projects. Our offerings include control systems (ICSS, DCS, SIS, F&G detection systems), piping bulk material, and electrical & instrumentation bulk materials. With a focus on quality and timely delivery, we ensure your projects remain on schedule and meet all technical requirements.',
    img: '/images/marine_logistics.jpg',
    href: '/equipment',
    subpoints: [],
  },
];

// map a Section doc -> HoverPanel props
const mapDocToCard = (doc) => {
  const bullets = Array.isArray(doc.items)
    ? [...doc.items]
        .filter((i) => typeof i?.text === 'string' && i.text.trim())
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((i) => i.text.trim())
    : [];
  return {
    title: doc.title || '',
    body: doc.content || '',
    img: doc.image || '',
    // store route in subtitle (or item.link) from Admin, else '#'
    href: doc.subtitle || doc.items?.find((i) => i.link)?.link || '#',
    subpoints: bullets,
    order: doc.order ?? 0,
  };
};

export default function SectorsSection() {
  const [cards, setCards] = useState(fallbackSections);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // fetch sectors from API with fallback
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/sections?type=sectors&active=true`,
          { cache: 'no-store' }
        );
        if (!res.ok) throw new Error('Failed to load sectors');
        const data = await res.json();
        if (Array.isArray(data) && data.length) {
          const mapped = data.map(mapDocToCard).sort((a, b) => a.order - b.order);
          setCards(mapped);
        }
      } catch {
        // keep fallbackSections
      }
    })();
  }, []);

  // mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // Mobile Layout
  if (isMobile) {
    return (
      <section className="w-full">
        <div className="space-y-0">
          {cards.map((section, index) => (
            <div
              key={section.title + index}
              className="relative h-32 border-b border-gray-700 last:border-b-0 overflow-hidden"
              style={{
                height: expandedIndex === index ? 'auto' : '8rem',
                minHeight: '8rem',
              }}
            >
              <HoverPanel
                {...section}
                isExpanded={expandedIndex === index}
                onToggle={() => handleToggle(index)}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Desktop Layout
  return (
    <section className="group flex h-[80vh] overflow-hidden w-full">
      {cards.map((section, index) => {
        const total = cards.length || 1;
        const baseWidth = 100 / total; // default share
        const hoveredWidth = 50;
        const remainingWidth = (100 - hoveredWidth) / Math.max(1, total - 1);

        return (
          <motion.div
            key={section.title + index}
            className="panel h-full relative"
            animate={{
              width:
                hoveredIndex === index
                  ? `${hoveredWidth}%`
                  : hoveredIndex !== null
                  ? `${remainingWidth}%`
                  : `${baseWidth}%`,
            }}
            transition={{ type: 'spring', stiffness: 120, damping: 30 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <HoverPanel {...section} />
          </motion.div>
        );
      })}
    </section>
  );
}
