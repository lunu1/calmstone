'use client';

import React from "react";
import { motion } from "framer-motion";

// Animation variants for text elements
const containerVariants = {
  hidden: { opacity: 1 }, // Box stays visible
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Delay for each child
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Overview = () => {
  return (
    <section className="py-20 px-6 lg:px-24 bg-gray-50">
      {/* Static Box */}
      <div className="bg-white p-12 rounded-2xl border border-[#facc15]/20 shadow-lg hover:shadow-xl transition-all duration-300">
   {/* company overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Heading */}
          <motion.h3
            variants={textVariants}
            className="text-[36px] md:text-[48px] font-bold text-black my-3 text-center uppercase"
          >
            Company Overview
          </motion.h3>

          {/* Yellow Underline with Fade */}
          <motion.div variants={textVariants} className="w-32 h-1 mx-auto mb-8 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"></motion.div>

          {/* Paragraphs */}
          <motion.p
            variants={textVariants}
            className=" leading-relaxed text-black mb-6 text-justify text-[26px] "
          >
          Calm Stone is a comprehensive construction company offering integrated solutions across civil, structural, process piping, electrical and instrumentation, and industrial coating works. We are committed to delivering high-quality, safe, and innovative services that meet the evolving needs of our clients across both greenfield and brownfield projects.


          </motion.p>

          <motion.p
            variants={textVariants}
            className=" leading-relaxed text-black mb-6 text-justify text-[26px] "
          >
            Our experience spans a wide range of industries, and our capabilities include advanced materials and technologies such as HDPE (High-Density Polyethylene) systems and FBE (Fusion Bonded Epoxy) coatings. With a highly skilled and dedicated workforce, we handle every stage of the project lifecycle — from design and planning to execution and delivery — ensuring timely and cost-effective results.

          </motion.p>

          <motion.p
            variants={textVariants}
            className=" leading-relaxed text-black mb-6 text-justify text-[26px] "
          >
           At Calm Stone, we take pride in our ability to consistently exceed expectations, building lasting partnerships through trust, performance, and excellence.
          </motion.p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Heading */}
          <motion.h3
            variants={textVariants}
            className="text-[36px] md:text-[48px] font-bold text-black my-3 text-center uppercase"
          >
           Mission 
          </motion.h3>

          {/* Yellow Underline with Fade */}
          <motion.div variants={textVariants} className="w-32 h-1 mx-auto mb-8 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"></motion.div>

          {/* Paragraphs */}
          <motion.p
            variants={textVariants}
            className=" leading-relaxed text-black mb-6 text-center text-[26px] "
          >
            To redefine excellence in EPC by delivering smart, agile, and trusted solutions that drive progress in the evolving energy sector.
          </motion.p>



    
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Heading */}
          <motion.h3
            variants={textVariants}
            className="text-[36px] md:text-[48px] font-bold text-black my-3 text-center uppercase"
          >
           vision 
          </motion.h3>

          {/* Yellow Underline with Fade */}
          <motion.div variants={textVariants} className="w-32 h-1 mx-auto mb-8 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full"></motion.div>

          {/* Paragraphs */}
          <motion.p
            variants={textVariants}
            className=" leading-relaxed text-black mb-6 text-center text-[26px] "
          >
To emerge as a new-generation EPC leader, building sustainable energy infrastructure that drives progress and inspires confidence worldwide.          </motion.p>



    
        </motion.div>
      </div>
    </section>
  );
};

export default Overview;
