'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  return (
    <main className="bg-white text-black min-h-screen px-6 lg:px-24 py-20">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
          <div className="relative inline-block mb-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 pb-5">
         GET IN TOUCH WITH US
        </h2>
        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
      </div>
        
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
          We'd love to hear from you. Reach out for project inquiries, collaborations, or general questions.
        </p>
      </motion.div>

      {/* Contact Info + Form */}
      <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <div className="flex items-start space-x-4">
            <Mail className="w-6 h-6 text-[#facc15] mt-1" />
            <div>
              <h4 className="text-xl font-semibold">Email</h4>
              <p className="text-gray-600 text-lg">dcc@calmstonegc.com</p>
            </div>
          </div>
          {/* <div className="flex items-start space-x-4">
            <Phone className="w-6 h-6 text-[#facc15] mt-1" />
            <div>
              <h4 className="text-xl font-semibold">Phone</h4>
              <p className="text-gray-600 text-lg">xxxxxxxxx</p>
            </div>
          </div> */}
          <div className="flex items-start space-x-4">
            <MapPin className="w-6 h-6 text-[#facc15] mt-1" />
            <div>
              <h4 className="text-xl font-semibold">Address</h4>
              <p className="text-gray-600 text-lg">Office M2020 ,M2 Bin Arar Holdings Building AI Najda Street, Abu Dhabi</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <div>
            <label className="block text-md font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#facc15]"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-md font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#facc15]"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-md font-medium mb-1">Message</label>
            <textarea
              rows="5"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#facc15]"
              placeholder="How can we help you?"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-[#facc15] text-black font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </main>
  );
};

export default ContactPage;
