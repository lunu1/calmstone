"use client";

import React from "react";
import { motion } from "framer-motion";
import { Building2, Target, Eye, Award, Users, Zap, Leaf, Clock, TrendingUp } from "lucide-react";
import Header from "../../../components/navbar";
// import { Target, Eye, , Clock, Users,  } from "lucide-react";


const accordionData = [
  {
    title: "Mission",
    content:
      "To redefine excellence in EPC by delivering smart, agile, and trusted solutions that drive progress in the evolving energy sector. We are powered by innovation, guided by precision, and driven by a commitment to speed, safety, and lasting value—for every client, every time.",
    icon: Target,
  },
  {
    title: "Vision",
    content:
      "To emerge as a new-generation EPC leader, building sustainable energy infrastructure that drives progress and inspires confidence worldwide.",
    icon: Eye,
  },
];

const features = [
  {
    icon: Building2,
    title: "Why We Are",
    content:
      "We blend the agility of a modern company with deep industry expertise. Our team works with speed, precision, and unwavering commitment to safety and quality. Through innovation, collaboration, and integrity, we ensure lasting value in every project.",
  },
  {
    icon: Award,
    title: "Quality and Commitment",
    content:
      "Quality is at the core of everything we do. With world-class engineering and timely execution, every project meets or exceeds global standards—backed by a multidisciplinary team and a customer-first mindset.",
  },
  {
    icon: Zap,
    title: "Legacy of Innovation and Excellence",
    content:
      "Calm Stone has built its reputation on results, trust, and innovation. We evolve with every challenge, shaping a future defined by quality, credibility, and solutions that stand the test of time.",
  },
];

const AboutPage = () => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="bg-white text-black min-h-screen overflow-hidden">
    
      {/* Hero Section */}
      <section className="relative py-20 px-6 lg:px-24">
        <div className="absolute inset-0 "></div>
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block mb-3"
            >
              <div className="relative inline-block text-center">
                <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 pb-5 uppercase">
                  About <span className="text-yellow-400">Us</span>  
                </h2>
                <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative overflow-hidden rounded-2xl  shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10"></div>
            <div className="absolute inset-0 border-2 border-[#facc15]/20 rounded-2xl z-20"></div>
            <img
              src="/images/about.jpg"
              alt="Calm Stone Industrial Operations"
              className="w-full h-96 lg:h-[600px] object-cover transition-transform duration-700"
            />
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="absolute bottom-8 left-8 z-30"
            >
              {/* <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 border border-[#facc15]/30">
                <p className="text-[#facc15] text-sm uppercase tracking-wide font-semibold">Established</p>
                <p className="text-2xl font-bold text-black">2022</p>
              </div> */}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
    <section className="py-20 px-6 lg:px-24 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center lg:text-left"
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-8">
          <span className="text-[#facc15]">Calm Stone</span> General Contracting
        </h2>

        <motion.p
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl leading-relaxed text-gray-700 mb-6"
        >
          Established in 2022, <span className="text-[#facc15] font-semibold">Calm Stone</span> delivers innovative engineering, procurement, and construction (EPC) services built on speed, precision, and trust. We bring a modern, agile approach to the oil and gas sector, combining deep industry expertise with a dynamic team of seasoned professionals.
        </motion.p>

        <motion.p
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-xl leading-relaxed text-gray-700 mb-6"
        >
          Our comprehensive EPC capabilities span earthworks, civil construction, mechanical and piping installation, as well as electrical and instrumentation works. With a strong commitment to innovation, quality, and safety, Calm Stone is dedicated to transforming the energy landscape through smart, reliable, and efficient project delivery.
        </motion.p>

        <motion.p
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-xl leading-relaxed text-gray-700"
        >
          Backed by advanced equipment, cutting-edge processes, and a skilled workforce, we redefine excellence in EPC to build a sustainable future.
        </motion.p>
      </motion.div>
    </section>

 <section className="py-20 px-6 lg:px-24 bg-gray-50">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="max-w-7xl mx-auto"
  >
    {/* Mission & Vision Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
      {[{
        icon: Target,
        title: "Mission Statement",
        desc: "At Calm Stone General Contracting, our mission is to redefine excellence in Engineering, Procurement, and Construction (EPC) by delivering innovative, agile, and dependable solutions that meet the demands of the rapidly evolving energy sector. We are committed to driving progress through precision, speed, and a culture of continuous improvement, while upholding the highest standards of safety, sustainability, and integrity. Through collaboration, cutting-edge technology, and a results-driven mindset, we empower our clients and partners to achieve long-term success in building a more resilient and energy-efficient future."
      }, {
        icon: Eye,
        title: "Vision Statement",
        desc: "At Calm Stone General Contracting, our vision is to emerge as a new-generation leader in Engineering, Procurement, and Construction (EPC)—one that pioneers the development of sustainable, resilient, and future-ready energy infrastructure. We aim to be a trusted partner that not only delivers excellence in every project but also inspires confidence, drives innovation, and contributes meaningfully to global energy transformation. By embracing technology, fostering talent, and upholding our core values, we aspire to shape a smarter, safer, and more sustainable world."
      }].map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ duration: 0.6, delay: idx * 0.2 }}
          viewport={{ once: true }}
          className="bg-white p-10 rounded-2xl border border-[#facc15]/20 hover:border-[#facc15]/40 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-[#facc15]/20 rounded-full flex items-center justify-center mb-6">
              <item.icon className="w-10 h-10 text-[#facc15]" />
            </div>
            <h3 className="text-3xl font-bold text-[#facc15] mb-4">
              {item.title}
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Our Culture & Commitments Section */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-white p-12 rounded-2xl border border-[#facc15]/20 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <h3 className="text-3xl font-bold text-[#facc15] mb-6">
Our Culture of Purpose and Responsibility
      </h3>
      <p className="text-gray-700 text-lg leading-relaxed">
At Calm Stone, our corporate culture is built on a foundation of integrity, respect, and excellence. We foster a workplace where collaboration, inclusivity, and innovation thrive—empowering our people to lead with purpose and deliver with pride.
Our core values—honesty, quality, safety, and sustainability—guide everything we do. They shape our decisions, drive our performance, and define the relationships we build with clients, partners, and communities.
      </p>
      <p>
        Health, Safety, and Environmental (HSE) stewardship is at the heart of our operations. We uphold the highest standards of safety across all sites and processes, ensuring the wellbeing of our workforce and minimizing our impact on the environment.
Beyond our projects, we believe in creating lasting value for society. Through community engagement and initiatives focused on education, environmental care, and social upliftment, we are committed to making a positive difference wherever we work.
This is the spirit that drives us—a culture rooted in responsibility and inspired by impact.
      </p>
    </motion.div>
  </motion.div>
</section>



      {/* Features Grid */}
    <section className="py-20 px-6 lg:px-24 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              WHY CHOOSE <span className="text-yellow-400">US</span>?
            </h2>
            <div className="w-36 h-1 mx-auto mb-6 rounded-full bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the reasons why we stand out from the rest.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {[{
              icon: Leaf,
              title: "WE DELIVER QUALITY",
              desc: "Our commitment to excellence ensures that we deliver nothing short of top-quality results."
            }, {
              icon: Clock,
              title: "ALWAYS ON TIME",
              desc: "We understand the value of your time and strive to meet deadlines consistently."
            }, {
              icon: Users,
              title: "WE ARE PASSIONATE",
              desc: "Our team's passion for what we do drives us to go above and beyond in every project."
            }, {
              icon: TrendingUp,
              title: "PROFESSIONAL SERVICES",
              desc: "With our expertise and professionalism, you can trust us to handle your needs with utmost care and precision."
            }].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#fefce8] rounded-full border-8 border-[#facc15]/30 py-8 px-4 flex flex-col items-center hover:shadow-xl transition duration-300"
              >
                <item.icon className="w-12 h-12 text-[#facc15] mb-6" />
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer CTA */}
      {/* <section className="py-20 px-6 lg:px-24 bg-gradient-to-r from-[#facc15]/10 to-transparent">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="bg-white p-12 rounded-2xl border border-[#facc15]/30 shadow-lg">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-black">Ready to</span> <span className="text-[#facc15]">Build Together?</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Experience the Calm Stone difference in your next project
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#facc15] text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#f59e0b] transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Get In Touch
            </motion.button>
          </div>
        </motion.div>
      </section> */}
    </main>
  );
};

export default AboutPage;
