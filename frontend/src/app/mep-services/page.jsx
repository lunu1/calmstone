"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Recycle,
  Droplets,
  ChevronRight,
  Wrench,
} from "lucide-react";

export default function PlantRevampPage() {
  /* Animation helpers */
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };
  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.2 } },
  };

  /* Highlights */
  const stats = [
    { icon: Recycle, number: "150+", label: "Brownfield Projects" },
    { icon: Zap, number: "60%", label: "Avg. Efficiency Gain" },
    { icon: Droplets, number: "2 Weeks", label: "Typical Downtime" },
  ];

  /* What we do */
  const capabilities = [
    {
      title: "Brownfield Engineering",
      body: "Comprehensive revamp strategies that integrate seamlessly with existing assets, ensuring safety and compliance.",
      image: "/images/testimonial1.jpg",
      icon: Wrench,
    },
    {
      title: "Turnaround Management",
      body: "End-to-end planning and execution of scheduled shutdowns to minimize disruption and hit restart targets.",
      image: "/images/ship_energy.jpg",
      icon: Zap,
    },
    {
      title: "Debottleneck Studies",
      body: "Data-driven analysis to uncover capacity constraints and unlock hidden production potential.",
      image: "/images/testimonial4.jpg",
      icon: Recycle,
    },
  ];

  return (
    <main className="bg-white text-black overflow-hidden">
      {/* =========================================================
         HERO -------------------------------------------------- */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {/* background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/mep.jpg"
            alt="Plant Revamp"
            fill
            priority
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* copy */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-center items-start px-6 sm:px-10 lg:px-20 text-white"
          initial="initial"
          animate="animate"
          variants={staggerChildren}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            variants={fadeInUp}
          >
            MEP Services 
            <br />
            <span className="text-yellow-400"> (Mechanical, Electrical & Plumbing)</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl max-w-2xl mb-8 leading-relaxed"
            variants={fadeInUp}
          >
            We deliver end-to-end MEP solutions that are critical to the functionality and performance of any built environment. From system design to installation and testing, we ensure efficient, reliable, and compliant services tailored to project needs.	
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={fadeInUp}
          >
            <Link
              href="/contact"
              className="group bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition-all"
            >
              <span className="flex items-center gap-2">
                Start Your Revamp
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          
          </motion.div>
        </motion.div>
      </section>

  

      {/* =========================================================
         CTA ---------------------------------------------------- */}
      <motion.section
        className="relative bg-black py-24 px-6 sm:px-10 lg:px-20 text-center overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* subtle pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        </div>

        {/* content */}
        <motion.div
          className="relative z-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to <span >Upgrade</span> Your
            Plant?
          </h2>
          <p className="text-xl mb-12 text-gray-300 leading-relaxed">
            Partner with us to unlock additional capacity and efficiency without
            a greenfield footprint.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group bg-yellow-400 text-black px-10 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-500 transition-all hover:shadow-lg hover:-translate-y-2"
            >
              <span className="flex items-center gap-2">
                Contact Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
         
          </div>
        </motion.div>
      </motion.section>
    </main>
  );
}
