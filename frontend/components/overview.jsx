'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
};

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

// Fallback if API has nothing yet
const fallback = [
  {
    key: 'overview',
    title: 'Company Overview',
    content:
      'Calm Stone is a comprehensive construction company offering integrated solutions across civil, structural, process piping, electrical and instrumentation, and industrial coating works.\n\nOur experience spans a wide range of industries, and our capabilities include advanced materials and technologies such as HDPE (High-Density Polyethylene) systems and FBE (Fusion Bonded Epoxy) coatings. With a highly skilled and dedicated workforce, we handle every stage of the project lifecycle—from design and planning to execution and delivery—ensuring timely and cost-effective results.\n\nAt Calm Stone, we take pride in our ability to consistently exceed expectations, building lasting partnerships through trust, performance, and excellence.',
    order: 1,
  },
  {
    key: 'mission',
    title: 'Mission',
    content:
      'To redefine excellence in EPC by delivering smart, agile, and trusted solutions that drive progress in the evolving energy sector.',
    order: 2,
  },
  {
    key: 'vision',
    title: 'Vision',
    content:
      'To emerge as a new-generation EPC leader, building sustainable energy infrastructure that drives progress and inspires confidence worldwide.',
    order: 3,
  },
];

const splitParas = (text) =>
  (text || '')
    .split(/\n{2,}/) // blank line separates paragraphs
    .map((t) => t.trim())
    .filter(Boolean);

export default function Overview() {
  const [blocks, setBlocks] = useState(fallback);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/sections?type=overview&active=true`,
          { cache: 'no-store' }
        );
        if (!res.ok) throw new Error('Failed to load overview');
        const data = await res.json();
        if (Array.isArray(data) && data.length) {
          // Map incoming docs to keys by title and sort by order
          const mapped = data
            .map((s) => {
              const title = (s.title || '').toLowerCase();
              const key =
                title.includes('mission')
                  ? 'mission'
                  : title.includes('vision')
                  ? 'vision'
                  : 'overview';
              return { key, title: s.title, content: s.content || '', order: s.order ?? 0 };
            })
            .sort((a, b) => a.order - b.order);
          setBlocks(mapped);
        }
      } catch {
        // keep fallback
      }
    })();
  }, []);

  const company = blocks.find((b) => b.key === 'overview');
  const mission = blocks.find((b) => b.key === 'mission');
  const vision = blocks.find((b) => b.key === 'vision');

  return (
    <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-24 bg-gray-50">
      <div className="bg-white p-6 sm:p-10 md:p-12 rounded-2xl border border-yellow-300/20 shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Company Overview */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h3 variants={textVariants} className="text-3xl sm:text-4xl md:text-5xl font-bold text-black my-3 text-center uppercase">
            {company?.title || 'Company Overview'}
          </motion.h3>

          <motion.div
            variants={textVariants}
            className="w-24 sm:w-32 h-1 mx-auto mb-8 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"
          />

          {splitParas(company?.content).map((p, i) => (
            <motion.p
              key={i}
              variants={textVariants}
              className="text-base sm:text-lg md:text-xl leading-relaxed text-black mb-6 text-justify"
            >
              {p}
            </motion.p>
          ))}
        </motion.div>

        {/* Mission */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h3 variants={textVariants} className="text-3xl sm:text-4xl md:text-5xl font-bold text-black my-3 text-center uppercase">
            {mission?.title || 'Mission'}
          </motion.h3>
          <motion.div
            variants={textVariants}
            className="w-24 sm:w-32 h-1 mx-auto mb-8 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"
          />
          <motion.p variants={textVariants} className="text-base sm:text-lg md:text-xl leading-relaxed text-black mb-6 text-center">
            {mission?.content}
          </motion.p>
        </motion.div>

        {/* Vision */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h3 variants={textVariants} className="text-3xl sm:text-4xl md:text-5xl font-bold text-black my-3 text-center uppercase">
            {vision?.title || 'Vision'}
          </motion.h3>
          <motion.div
            variants={textVariants}
            className="w-24 sm:w-32 h-1 mx-auto mb-8 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"
          />
          <motion.p variants={textVariants} className="text-base sm:text-lg md:text-xl leading-relaxed text-black mb-6 text-center">
            {vision?.content}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
