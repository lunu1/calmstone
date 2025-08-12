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
    id: "engineering-design",
    title: "Engineering & Design",
    image: "/images/engineering.jpg",
    intro:
      "The scope of technical consulting in engineering and designing involves providing expert guidance, technical expertise, and comprehensive solutions throughout the lifecycle of a project. This includes the conceptual, basic, and detailed engineering stages.",
    scope: [
      "Conduct feasibility studies, technical evaluations, and site assessments",
      "Develop conceptual, FEED, and detailed engineering designs",
      "Prepare design basis, project specifications, and engineering deliverables",
      "Create PFDs, P&IDs, GA drawings, and 3D modeling",
      "Ensure compliance with industry standards and client requirements",
      "Provide technical support during procurement and vendor evaluations",
      "Review and validate subcontractor designs and resolve technical queries",
      "Support construction, commissioning, and preparation of as-built documentation",
    ],
    conclusion:
      "Our engineering and design consulting ensures precision, innovation, and alignment with client expectations at every project stage.",
  },
  {
    id: "safety-assessments",
    title: "Safety Assessments (HSE Services)",
    image: "/images/hse.jpg",
    intro:
      "HSE (Health, Safety & Environment) services focus on identifying, evaluating, and mitigating risks to ensure a safe and compliant work environment throughout the project lifecycle. These services are essential to protect people, assets, and the environment.",
    scope: [
      "Hazard Identification & Risk Assessment (HIRA)",
      "HSE Compliance Audits & Gap Analysis",
      "Development of HSE Plans & Procedures",
      "Safety in Design Reviews",
      "Construction Safety Supervision & Monitoring",
      "Incident Investigation & Reporting",
    ],
    conclusion:
      "Our comprehensive HSE services foster a culture of safety and ensure adherence to international safety standards across all operations.",
  },
  {
    id: "engineering-manpower",
    title: "Engineering Manpower Services",
    image: "/images/manpower.jpg",
    intro:
      "Engineering manpower services involve the deployment of qualified technical professionals to support clients across various project phases—from design and planning to execution and commissioning. These services ensure flexibility, expertise, and efficiency in managing engineering workloads.",
    scope: [
      "Provision of Qualified Engineers & Technical Staff",
      "Support Across Project Phases",
      "On-site and Off-site Resource Deployment",
      "Multi-discipline Engineering Expertise",
      "Short-term & Long-term Staffing Solutions",
      "Compliance with Project and HSE Requirements",
    ],
    conclusion:
      "We empower your projects with top-tier engineering talent tailored to meet evolving technical and operational demands.",
  },
  {
    id: "digital-oilfield",
    title: "Digital Oilfield",
    image: "/images/digital-oilfield.jpg",
    intro:
      "A Digital Oilfield integrates advanced digital technologies into oil and gas operations to enhance efficiency, safety, and decision-making. For a construction-focused company, digital oilfield solutions support real-time data management, remote monitoring, smart construction, and better project control across upstream and midstream infrastructure development.",
    scope: [
      "Real-Time Data Acquisition & Monitoring",
      "Digital Twin for Facilities & Construction",
      "Remote Site Monitoring & Control",
      "Integrated Project Management Dashboards",
      "Predictive Maintenance & Asset Integrity Management",
      "HSE Digitization & Compliance Tracking",
    ],
    conclusion:
      "Our digital oilfield solutions modernize operations, improve safety, and provide data-driven insights for superior project delivery.",
  },
  {
    id: "control-system-services",
    title: "Control System Services",
    image: "/images/control-systems.jpg",
    intro:
      "Control System Services involve the design, integration, commissioning, and maintenance of automated systems that monitor and control industrial processes. These services ensure safe, efficient, and reliable plant operations by utilizing advanced instrumentation, PLCs, SCADA, and DCS technologies.",
    scope: [
      "Design & Engineering of Control Systems",
      "PLC/DCS Programming & Configuration",
      "Instrumentation Integration & Loop Checking",
      "Control Panel Design, Assembly & Testing",
      "Installation, Commissioning & Start-Up Support",
      "System Upgrades, Troubleshooting & Maintenance",
    ],
    conclusion:
      "We deliver tailored control system solutions to enhance automation, optimize performance, and ensure system reliability.",
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
          <h3 className="text-xl font-semibold mb-4">Technical Consulting</h3>
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
      <section className="flex-1 pb-20 pt-16 lg:pt-0">
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
