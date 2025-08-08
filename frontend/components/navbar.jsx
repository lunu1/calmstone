"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import useScrollDirection from "../hooks/useScrollDirection";

const megaMenus = {
  Services: {
    columns: {
      Services: [
        {
          label: "Oilfield Surface Construction",
          href: "/construction",
          subpoints: [
            "Civil & Structural",
            "Mechanical & Piping",
            "Electrical & Instrumentation",
            "Equipment Installation",
            "High-Density Polyethylene (HDPE)",
            "Fusion Bonded Epoxy (FBE)",
          ],
        },
        { label: "Technical Consulting",
          href: "/consultation", 
          subpoints: [
            "Enginneering & Design",
            "HSE Safety Assessments",
            "Engineering Manpower Support",
            "Digital Oilfield",
            "Control system services",
          ] 
        },
        { label: "Material and Equipment Supply", 
          href: "/equipment", 
          subpoints: [
            "Control systems Supply",
            "Piping Bulk Material",
            "Electrical & Instrumentation Bulk Material", 
          ] },
      ],
    },
  },

  // Projects: {
  //   columns: {
  //     Projects: [
  //       { label: "Qusahwira production Facilities Upgrade", href: "/quswahira-upgrade" },
  //       { label: "Engineering Services", href: "/engineering-service" },
  //       { label: "Services for SPEL Job", href: "/spel" },
  //       { label: "Documents for MTO and BOQ for LZ LTDP 1", href: "/mto" },
  //       { label: "HDPE Internal Lining Service", href: "/hdpe" },
  //       { label: "Desa Linated Water Impulsion System Bypass", href: "/desa" },
  //     ],
  //   },
  // },
};

const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // For desktop dropdown
  const [openSubMenu, setOpenSubMenu] = useState(null); // For subpoints
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState(null);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);

  const scrollDir = useScrollDirection();
  const links = Object.keys(megaMenus);

  const isWhiteHeader =  openMenu || isMobileOpen || isPastHero;
  const showNav = scrollDir === "up" || openMenu || isMobileOpen;

  const headerClasses = [
    "fixed inset-x-0 top-0 z-50 transition-transform duration-300 ",//hover:bg-white/95
    !showNav && "-translate-y-full",
    (isPastHero || openMenu || isMobileOpen) && "backdrop-blur-md border-b border-gray-200 shadow-sm",
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    const onScroll = () => setIsPastHero(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleDropdown = (menu) => setOpenMenu(openMenu === menu ? null : menu);
  const toggleSubDropdown = (label) => setOpenSubMenu(openSubMenu === label ? null : label);
  const toggleMobileSubmenu = (menu) => setMobileExpandedMenu(mobileExpandedMenu === menu ? null : menu);

  return (
    <header
      className={headerClasses}
      onMouseEnter={() => setIsHeaderHovered(true)}
      onMouseLeave={() => setIsHeaderHovered(false)}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src={isWhiteHeader ? "/logo.png" : "/logow.png"}
            alt="calm stone"
            width={250}
            height={250}
            className="object-contain transition duration-300"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          <Link
            href="/aboutus"
            className={`font-medium transition-colors duration-200 py-2 text-lg tracking-wide uppercase hover:text-yellow-400  ${
              isWhiteHeader ? "text-black hover:text-black" : "text-white hover:text-white"
            }`}
          >
            About Us
          </Link>

          {links.map((menu) => (
            <div key={menu} className="relative">
              <button
                onClick={() => toggleDropdown(menu)}
                className={`flex items-center gap-1 font-medium transition-colors duration-200 py-2 text-lg tracking-wide hover:text-yellow-400 uppercase ${
                  isWhiteHeader ? "text-black hover:text-black" : "text-white hover:text-white"
                }`}
              >
                {menu}
                <ChevronDown size={18} className={`transition-transform ${openMenu === menu ? "rotate-180" : ""}`} />
              </button>

              {openMenu === menu && (
                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 border-t-4 border-t-amber-400 p-4 z-50 w-96 ">
                  <ul className="space-y-4">
                    {Object.entries(megaMenus[menu].columns).map(([cat, items]) =>
                      items.map(({ label, href, subpoints }) => (
                        <li key={label}>
                          <div className="flex justify-between items-center">
                            <Link
                              href={href}
                              className="hover:text-yellow-400 transition-colors duration-200 font-medium text-lg"
                            >
                              {label}
                            </Link>
                            {subpoints?.length > 0 && (
                              <ChevronDown
                                size={25}
                                className={`cursor-pointer transition-transform ${
                                  openSubMenu === label ? "rotate-180" : ""
                                }`}
                                onClick={() => toggleSubDropdown(label)}
                              />
                            )}
                          </div>
                          {openSubMenu === label && subpoints.length > 0 && (
                            <ul className="mt-2 ml-4 space-y-2 text-lg text-black">
                              {subpoints?.map((sp, idx) => (
                                <li key={idx}>
                                  <Link
                                    href={`${href}?subpoint=${encodeURIComponent(sp)}`}
                                    className="hover:text-yellow-400"
                                  >
                                    • {sp}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))}

          <Link
            href="/projects"
            className={`font-medium transition-colors duration-200 py-2 text-lg tracking-wide uppercase hover:text-yellow-400  ${
              isWhiteHeader ? "text-black hover:text-black" : "text-white hover:text-white"
            }`}
          >
            Projects
          </Link>
          <Link
            href="/careers"
            className={`font-medium transition-colors duration-200 py-2 text-lg tracking-wide uppercase hover:text-yellow-400  ${
              isWhiteHeader ? "text-black hover:text-black" : "text-white hover:text-white"
            }`}
          >
            Careers
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="text-black bg-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/90 hover:text-yellow-400 transition-all duration-200 hover:shadow-lg hover:shadow-white/20"
          >
            Let's connect <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="lg:hidden text-white hover:text-yellow-400">
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-6 py-6">
            {links.map((menu) => (
              <div key={menu} className="mb-4">
                <button
                  onClick={() => toggleMobileSubmenu(menu)}
                  className="w-full flex items-center justify-between text-black font-medium "
                >
                  {menu}
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform ${mobileExpandedMenu === menu ? "rotate-180" : ""}`}
                  />
                </button>
                {mobileExpandedMenu === menu && (
                  <div className="ml-4 mt-2 border-l border-gray-300 pl-4">
                    {Object.entries(megaMenus[menu].columns).map(([cat, items]) =>
                      items.map(({ label, href, subpoints }) => (
                        <div key={label} className="mb-2">
                          <Link href={href} className="block font-semibold">
                            {label}
                          </Link>
                          {subpoints.length > 0 && (
                            <ul className="ml-3 mt-1 text-lg space-y-1">
                              {subpoints.map((sp, idx) => (
                                <li key={idx}>
                                  <Link
                                    href={`${href}?subpoint=${encodeURIComponent(sp)}`}
                                    className="hover:text-yellow-400"
                                  >
                                    - {sp}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}

            <Link href="/careers" className="block text-black font-medium py-3">
              Careers
            </Link>
            <Link href="/aboutus" className="block text-black font-medium py-3">
              About us
            </Link>
            <Link
              href="/contact"
              className="block bg-yellow-400 text-black text-center py-2 rounded-lg font-semibold hover:bg-yellow-500 mt-6"
            >
              Let's Connect
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
