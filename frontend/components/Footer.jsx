'use client';

import React from "react";
import Link from "next/link";
import { Linkedin, Phone, MapPin, Mail } from "lucide-react";

const SmallFooter = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white font-bold py-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Left: Branding */}
          <div>
            <h3 className="text-3xl font-bold mb-4 text-yellow-400">Calm Stone</h3>
            <p className="text-white text-base leading-relaxed">
              Building tomorrow's solutions with today's innovation. From engineering excellence to reliable partnerships — Calm Stone leads the future.
            </p>
          </div>

          {/* Center: Quick Links */}
          <div className="md:flex md:flex-col md:items-center">
            <h4 className="text-base font-semibold text-yellow-400 mb-6 uppercase tracking-wider border-b border-gray-700 pb-2">
              Quick Links
            </h4>
            <nav className="grid gap-3 text-sm">
              <Link href="/aboutus" className="text-white hover:text-yellow-400 transition">
                About Us
              </Link>
              <Link href="/careers" className="text-white hover:text-yellow-400 transition">
                Careers
              </Link>
              <Link href="/contact" className="text-white hover:text-yellow-400 transition">
                Contact
              </Link>
              <Link href="/news" className="text-white hover:text-yellow-400 transition">
                Updates
              </Link>
            </nav>
          </div>

          {/* Right: Connect */}
          <div className="md:flex md:flex-col md:items-end space-y-6">
            <div>
              <h4 className="text-base font-semibold text-yellow-400 mb-6 uppercase tracking-wider border-b border-gray-700 pb-2">
                Connect
              </h4>

              <a
                href="https://www.linkedin.com/company/107668067/admin/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-yellow-400 hover:text-white transition text-sm mb-4"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
                <span className="text-white">LinkedIn</span>
              </a>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-[#facc15] mt-1" />
                <div>
                  <h4 className="text-base font-semibold">Email</h4>
                  <p className="text-gray-400 text-sm">dcc@calmstonegc.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 mt-4">
                <Phone className="w-4 h-4 text-[#facc15] mt-1" />
                <div>
                  <h4 className="text-base font-semibold">Phone</h4>
                  <p className="text-gray-400 text-sm">+971 44 561872</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 mt-4">
                <MapPin className="w-4 h-4 text-[#facc15] mt-1" />
                <div>
                  <h4 className="text-base font-semibold">Address</h4>
                  <p className="text-gray-400 text-sm">
                    Office M2020, M2 Bin Arar Holdings Building<br />
                    Al Najda Street, Abu Dhabi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white text-sm">
            © {new Date().getFullYear()} Calm Stone. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link href="/privacypolicy" className="text-white hover:text-yellow-400 transition">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SmallFooter;
