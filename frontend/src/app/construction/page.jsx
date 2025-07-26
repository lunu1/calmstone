
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; 
import Logo from "../../../components/Logo";

export default function OilfieldSurfaceConstruction() {
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false); 
  const router = useRouter();

const sections = [
   {
     id: "civil-structural",
     title: "Civil & Structural Works",
     image: "/images/civil.jpg",
     intro:
       "At Calm Stone, we specialize in delivering end-to-end civil and structural solutions that ensure strength, stability, and longevity for every project.",
     scope: [
       "Site Clearing, Grubbing and Levelling",
       "Excavation",
       "General Fill or Structural Fill including Compaction and Compaction Testing",
       "Concrete Works (Cast-in-Situ and Precast)",
       "Ground Stabilization",
       "Road Construction",
       "Topographic Survey, Underground Survey and Geotechnical Investigation",
       "Structural Steel Fabrication and Installation",
       "Piling",
     ],
     conclusion:
       "Whether it’s industrial, commercial, or infrastructure projects, Calm Stone delivers reliable, cost-effective civil and structural works that stand the test of time.",
   },
   {
     id: "mechanical-piping",
     title: "Mechanical & Piping Works",
     image: "/images/mechanical.jpg",
     intro:
       "Calm Stone provides comprehensive mechanical and piping services to meet the needs of industrial, infrastructure, and oil & gas projects.",
     scope: [
       "Piping Fabrication, Erection, Testing and Cleaning",
       "Non-destructive Testing (RT, UT, MT, PT etc.)",
       "Installation and commissioning of Static, Rotating Equipment & Major Packages",
       "Painting and Insulation",
       "Demolition",
     ],
     conclusion:
       "With a focus on quality and precision, Calm Stone ensures seamless mechanical and piping execution for projects of any scale.",
   },
   {
     id: "electrical-instrumentation",
     title: "Electrical & Instrumentation Works",
     image: "/images/electrical.jpg",
     intro:
       "Our Electrical & Instrumentation team provides integrated solutions for industrial facilities, ensuring safe and efficient electrical systems combined with advanced instrumentation controls.",
     scope: [
       "Cable Pulling",
       "Installation of Cable Tray, Cable Ladder or Cable Channel",
       "Glanding, Termination and Splice of Cables",
       "Installation and commissioning of Instrumentation packages",
       "Instrument Tubing Works",
     ],
     conclusion:
       "We deliver precise and reliable electrical and instrumentation services to meet the most demanding project requirements with adherence to international safety standards.",
   },
   {
     id: "equipment-installation",
     title: "Equipment Installation",
     image: "/images/equipment.jpg",
     intro:
       "Calm Stone specializes in the installation of industrial equipment and packages, ensuring accurate positioning, alignment, and commissioning for optimal performance.",
     scope: [
       "Installation of heavy machinery and industrial packages",
       "Alignment, calibration, and operational testing",
       "Integration with existing systems",
     ],
     conclusion:
       "Our skilled team ensures seamless installation of equipment, reducing downtime and maximizing efficiency for your operations.",
   },
   {
     id: "hdpe-lining",
     title:
       "High-Density Polyethylene (HDPE) Internal Lining for Carbon Steel Pipelines",
     image: "/images/hdpe.jpg",
     intro:
       "We provide specialized HDPE internal lining solutions for new and existing carbon steel pipelines, ensuring corrosion protection and extended pipeline life.",
     scope: [
       "HDPE lining installation for pipelines",
       "Pre-installation inspection and preparation",
       "Testing and quality assurance",
     ],
     conclusion:
       "Our HDPE lining services deliver cost-effective protection and reliability for critical pipeline infrastructure.",
   },
   {
     id: "fusion-bonded-epoxy",
     title: "Fusion Bonded Epoxy (FBE) and Liquid Epoxy Internal Coating",
     image: "/images/fbe.jpg",
     intro:
       "Calm Stone offers advanced internal coating solutions using Fusion Bonded Epoxy (FBE) and Liquid Epoxy for carbon steel pipelines, improving corrosion resistance and durability.",
     scope: [
       "Application of FBE coatings for new pipelines",
       "Liquid epoxy internal coating for complex geometries",
       "Inspection and coating integrity testing",
     ],
     conclusion:
       "Our epoxy coating solutions enhance the performance and lifespan of pipelines while ensuring compliance with international standards.",
   },
   {
     id: "specialized-works",
     title: "Specialized Works",
     image: "/images/special.jpg",
     intro:
       "In addition to our core offerings, we provide specialized works tailored to the unique needs of oilfield and industrial projects.",
     scope: [
       "Custom fabrication solutions",
       "Decommissioning and dismantling services",
       "Project-specific engineered solutions",
     ],
     conclusion:
       "Calm Stone delivers specialized services with precision, innovation, and safety as our top priorities.",
   },
 ];

  // Ensure the component is only running client-side
  useEffect(() => {
    setMounted(true); // Mark that the component has mounted
  }, []);

  useEffect(() => {
    if (mounted && router.isReady) {
      const { subpoint } = router.query; // Get the query parameter
      if (subpoint) {
        const matchingSection = sections.find(
          (section) => section.title === decodeURIComponent(subpoint)
        );
        if (matchingSection) {
          setActiveSection(matchingSection.id);
        }
      }
    }
  }, [mounted, router.query]);

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

  if (!mounted) return null; // Prevent SSR error

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
      <aside className="hidden lg:flex flex-col w-72 sticky top-0 h-screen bg-white shadow-xl z-50">
        <div className="p-6 flex justify-center">
          <Logo />
        </div>
        <nav className="flex-1 overflow-y-auto p-6 space-y-3">
          <h3 className="text-xl font-semibold mb-4">Oilfield surface construction</h3>
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
