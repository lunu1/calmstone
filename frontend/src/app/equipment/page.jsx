"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Logo from "../../../components/Logo";

export default function OilfieldSurfaceConstruction() {
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

const sections = [
  {
    id: "control-system-supply",
    title: "Control System Supply (ICSS, DCS, SIS, F&G)",
    image: "/images/control-supply.jpg",
    intro:
      "Integrated Control & Safety System (ICSS) is a unified automation platform that brings together Distributed Control Systems (DCS) for continuous process control, Safety Instrumented Systems (SIS) for automated protection against hazardous events, and Fire & Gas (F&G) Detection Systems for identifying fire, smoke, or gas leaks. Together, these systems enable centralized monitoring, control, and safety management, ensuring efficient and secure operations across complex oil and gas facilities.",
    scope: [
      "Design and engineering of ICSS architecture and system integration",
      "Development and configuration of DCS, SIS, and F&G logic and HMI interfaces",
      "Preparation of control narratives, cause & effect diagrams, and I/O lists",
      "Control panel fabrication, wiring, and Factory Acceptance Testing (FAT)",
      "Installation, loop checking, and commissioning of all control systems",
      "Emergency shutdown (ESD) and F&G system testing and validation",
      "System integration with third-party packages and remote interfaces",
      "Training, documentation, and handover support for end users",
    ],
    conclusion:
      "Our control system supply services provide end-to-end solutions for automation and safety systems in industrial and oil & gas environments.",
  },
  {
    id: "piping-bulk-material",
    title: "Piping Bulk Material",
    image: "/images/piping-material.jpg",
    intro:
      "This scope covers the end-to-end supply of piping bulk materials required for oil & gas construction projects. It includes material take-off (MTO) preparation, procurement of pipes, fittings, flanges, gaskets, and fasteners, along with vendor management, quality inspection, and logistics. All materials are supplied in compliance with international standards and project specifications, ensuring proper traceability, timely delivery, and support for construction execution.",
    scope: [
      "Procurement of piping materials (pipes, fittings, flanges, gaskets, bolts, etc.) as per project specifications",
      "Material take-off (MTO) preparation from isometric and layout drawings",
      "Vendor selection, technical evaluation, and purchase order management",
      "Quality assurance and inspection (mill test certificates, third-party inspections, dimensional checks)",
      "Logistics and delivery coordination to project site or storage yard",
      "Material traceability and tagging as per project and client requirements",
      "Inventory control and material reconciliation during project execution",
      "Compliance with international standards (ASME, ASTM, API) and client specifications",
    ],
    conclusion:
      "We ensure reliable sourcing and delivery of piping materials to meet your project timeline, budget, and technical standards.",
  },
  {
    id: "ei-bulk-material",
    title: "Electrical & Instrumentation (E&I) Bulk Material",
    image: "/images/ei-material.jpg",
    intro:
      "This scope involves the supply of Electrical and Instrumentation bulk materials required for industrial and oil & gas projects. It includes preparation of material take-offs (MTOs), procurement of cables, cable trays, junction boxes, lighting, earthing materials, instruments, fittings, and accessories. The service ensures vendor coordination, quality inspection, compliance with international standards, and timely delivery to site with full material traceability and documentation support.",
    scope: [
      "Preparation of Material Take-Offs (MTOs) from E&I drawings and specifications",
      "Procurement of electrical materials such as power/control cables, cable trays, glands, lighting, junction boxes, and earthing components",
      "Procurement of instrumentation materials including transmitters, tubing, fittings, and field instruments",
      "Vendor evaluation, selection, and purchase order management",
      "Quality assurance and inspection (as per project standards and certifications)",
      "Material identification, tagging, and traceability",
      "Logistics, packaging, and site delivery coordination",
      "Compliance with IEC, NEC, ATEX, and relevant international standards",
      "Support for material documentation and project handover",
    ],
    conclusion:
      "Our E&I material supply services offer high-quality components, precise documentation, and streamlined delivery to support your engineering and installation requirements.",
  },
];




  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      sections.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.getBoundingClientRect().top;
          if (top <= 150) current = section.id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <motion.main
      className="flex bg-gray-100 scroll-smooth"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* ✅ Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white shadow-md z-50 flex justify-between items-center px-4 py-3">
        <Image
          src="/logo.png"
          alt="Company Logo"
          width={110}
          height={40}
          className="object-contain"
        />
        <button
          className="p-2 bg-yellow-400 rounded-md text-black font-bold text-lg"
          onClick={() => setIsMenuOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* ✅ Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 sticky top-0 h-screen bg-white shadow-xl z-30">
        {/* <div className="p-6 flex justify-center">
          <Logo />
        </div> */}
        <nav className="flex-1 overflow-y-auto p-6 space-y-3 mt-28">
          <h3 className="text-xl font-semibold mb-4">Material and equipment Supply</h3>
          {sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                activeSection === sec.id
                  ? "bg-yellow-400 text-black font-bold shadow-md"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {sec.title}
            </a>
          ))}
        </nav>
      </aside>

      {/* ✅ Mobile Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
            className="w-72 bg-white h-full shadow-xl p-6 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                className="text-black text-xl"
                onClick={() => setIsMenuOpen(false)}
              >
                ✕
              </button>
            </div>
            <nav className="space-y-3">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                    activeSection === sec.id
                      ? "bg-yellow-400 text-black font-bold shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {sec.title}
                </a>
              ))}
            </nav>
          </motion.div>
        </div>
      )}

      {/* ✅ Main Content */}
      <section className="flex-1 pb-20 pt-16 lg:pt-10">
        {sections.map((sec, index) => (
          <motion.div
            key={sec.id}
            id={sec.id}
            className="relative md:h-screen flex flex-col md:items-center md:justify-center text-white scroll-mt-24 px-4 py-6 md:py-0"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* ✅ Mobile Image Above Card */}
            <div className="md:hidden w-full h-56 mb-4 rounded-lg overflow-hidden">
              <Image
                src={sec.image}
                alt={sec.title}
                width={800}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>

            {/* ✅ Desktop Background Image */}
            <div className="hidden md:block absolute inset-0 z-0">
              <Image src={sec.image} alt={sec.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* ✅ Content */}
            <div className="relative z-10 max-w-5xl w-full bg-black/80 md:bg-black/70 rounded-lg backdrop-blur-md shadow-xl p-5 sm:p-8">
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-3">
                {sec.title}
              </h2>
              <p className="mb-4 text-sm sm:text-base leading-relaxed">{sec.intro}</p>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                Our scope of services includes:
              </h3>
              <ul className="list-disc list-inside space-y-1 mb-4 text-gray-200 text-sm sm:text-base">
                {sec.scope.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <p className="text-sm sm:text-base leading-relaxed">{sec.conclusion}</p>
            </div>
          </motion.div>
        ))}
      </section>
    </motion.main>
  );
}
