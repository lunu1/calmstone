"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";

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
        {
          label: "Technical Consulting",
          href: "/consultation",
          subpoints: [
            "Enginneering & Design",
            "HSE Safety Assessments",
            "Engineering Manpower Support",
            "Digital Oilfield",
            "Control system services",
          ],
        },
        {
          label: "Material and Equipment Supply",
          href: "/equipment",
          subpoints: [
            "Control systems Supply",
            "Piping Bulk Material",
            "Electrical & Instrumentation Bulk Material",
          ],
        },
      ],
    },
  },
};

const Header = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // desktop dropdown
  const [openSubMenu, setOpenSubMenu] = useState(null); // desktop subpoints
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState(null); // mobile Services expand
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(72); // fallback default

  const links = Object.keys(megaMenus);

  // Measure header height so the mobile drawer can sit exactly below it
  useEffect(() => {
    const measure = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const toggleDropdown = (menu) =>
    setOpenMenu(openMenu === menu ? null : menu);

  const toggleSubDropdown = (label) =>
    setOpenSubMenu(openSubMenu === label ? null : label);

  const toggleMobileSubmenu = (menu) =>
    setMobileExpandedMenu(mobileExpandedMenu === menu ? null : menu);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 bg-white border-b border-gray-200 shadow-sm"
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo.png"
            alt="calm stone"
            width={250}
            height={250}
            className="object-contain transition duration-300"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-10">
          <Link
            href="/"
            className="font-medium transition-colors duration-200 py-2 text-lg tracking-wide uppercase text-black hover:text-yellow-400"
          >
            Home
          </Link>
          <Link
            href="/aboutus"
            className="font-medium transition-colors duration-200 py-2 text-lg tracking-wide uppercase text-black hover:text-yellow-400"
          >
            About Us
          </Link>

          {links.map((menu) => (
            <div key={menu} className="relative">
              <button
                onClick={() => toggleDropdown(menu)}
                className="flex items-center gap-1 font-medium transition-colors duration-200 py-2 text-lg tracking-wide uppercase text-black hover:text-yellow-400"
              >
                {menu}
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    openMenu === menu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openMenu === menu && (
                <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-lg border border-gray-200 border-t-4 border-t-amber-400 p-4 z-50 w-96">
                  <ul className="space-y-4">
                    {Object.entries(megaMenus[menu].columns).map(
                      ([cat, items]) =>
                        items.map(({ label, href, subpoints }) => (
                          <li key={label}>
                            <div className="flex justify-between items-center">
                              <Link
                                href={href}
                                className="hover:text-yellow-400 transition-colors duration-200 font-medium text-lg"
                              >
                                {label}
                              </Link>
                              {!!subpoints?.length && (
                                <ChevronDown
                                  size={25}
                                  className={`cursor-pointer transition-transform ${
                                    openSubMenu === label ? "rotate-180" : ""
                                  }`}
                                  onClick={() => toggleSubDropdown(label)}
                                />
                              )}
                            </div>
                            {openSubMenu === label && !!subpoints?.length && (
                              <ul className="mt-2 ml-4 space-y-2 text-lg text-black">
                                {subpoints.map((sp, idx) => (
                                  <li key={idx}>
                                    <Link
                                      href={`${href}?subpoint=${encodeURIComponent(
                                        sp
                                      )}`}
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
            href="/careers"
            className="font-medium transition-colors duration-200 py-2 text-lg tracking-wide uppercase text-black hover:text-yellow-400"
          >
            Careers
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="text-black bg-yellow-400 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-yellow-500 transition-all duration-200 hover:shadow-lg hover:shadow-yellow-500/20"
          >
            Let's connect <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden text-black hover:text-yellow-400"
          aria-expanded={isMobileOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu (fixed drawer under header, scrollable) */}
      {isMobileOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-x-0 bottom-0 bg-white border-t"
          style={{
            top: headerHeight, // sits right below the measured header
            WebkitOverflowScrolling: "touch",
            overflowY: "auto",
          }}
        >
          <div className="px-6 py-6 space-y-4">
            {/* Home */}
            <Link
              href="/"
              className="block text-black font-medium py-3 border-b border-gray-200"
              onClick={() => setIsMobileOpen(false)}
            >
              Home
            </Link>

            {/* About Us */}
            <Link
              href="/aboutus"
              className="block text-black font-medium py-3 border-b border-gray-200"
              onClick={() => setIsMobileOpen(false)}
            >
              About Us
            </Link>

            {/* Services */}
            <div>
              <button
                onClick={() => toggleMobileSubmenu("Services")}
                className="w-full flex items-center justify-between text-black font-medium py-3 border-b border-gray-200"
                aria-expanded={mobileExpandedMenu === "Services"}
              >
                Services
                <ChevronDown
                  size={16}
                  className={`transform transition-transform ${
                    mobileExpandedMenu === "Services" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileExpandedMenu === "Services" && (
                <div className="ml-4 mt-2 border-l border-gray-300 pl-4">
                  {Object.entries(megaMenus["Services"].columns).map(
                    ([cat, items]) =>
                      items.map(({ label, href, subpoints }) => (
                        <div key={label} className="mb-2">
                          <Link
                            href={href}
                            className="block font-semibold py-2"
                            onClick={() => setIsMobileOpen(false)}
                          >
                            {label}
                          </Link>
                          {!!subpoints?.length && (
                            <ul className="ml-3 mt-1 text-lg">
                              {subpoints.map((sp, idx) => (
                                <li key={idx} className="py-2">
                                  <Link
                                    href={`${href}?subpoint=${encodeURIComponent(
                                      sp
                                    )}`}
                                    className="hover:text-yellow-400"
                                    onClick={() => setIsMobileOpen(false)}
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

            {/* Careers */}
            <Link
              href="/careers"
              className="block text-black font-medium py-3 border-b border-gray-200"
              onClick={() => setIsMobileOpen(false)}
            >
              Careers
            </Link>

            {/* Let's Connect */}
            <Link
              href="/contact"
              className="block bg-yellow-400 text-black text-center py-3 rounded-lg font-semibold hover:bg-yellow-500"
              onClick={() => setIsMobileOpen(false)}
            >
              Let's Connect
            </Link>

            {/* Bottom spacer so last button isn't flush with device bottom bar */}
            <div className="h-4" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
