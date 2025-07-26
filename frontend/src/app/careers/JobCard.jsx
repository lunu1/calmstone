// src/app/careers/JobCard.jsx — Client Component
"use client";

import { useState } from "react";
import Link from "next/link";

export default function JobCard({ job }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);
  const closeDetail = () => setIsDetailOpen(false);
  const openDetail = () => setIsDetailOpen(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to your apply‑API or webhook
    alert("Application submitted!");
    close();
  };

  return (
    <>
      {/* ───────────────────────── Card ───────────────────────── */}
      <li className="list-none group border-2 border-amber-200/60 rounded-2xl p-6 hover:shadow-2xl hover:border-amber-300/80 transition-all duration-500 bg-gradient-to-br from-amber-50/90 via-yellow-50/70 to-orange-50/60 hover:from-amber-100/90 hover:via-yellow-100/80 hover:to-orange-100/70 backdrop-blur-sm hover:scale-[1.02] transform">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex-1 space-y-4">
            {/* title */}
            <div>
              <h2 className="text-2xl font-bold text-black group-hover:text-gray-800 transition-colors duration-300 tracking-tight">
                {job.title}
              </h2>

              {/* locations and type - two lines */}
              <div className="flex flex-col gap-2 mt-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-amber-200 to-yellow-200 text-black shadow-sm">
                    📍 {job.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-orange-200 to-amber-200 text-black shadow-sm">
                    💼 {job.type}
                  </span>
                  {job.remote && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-green-200 to-emerald-200 text-black shadow-sm">
                      🌍 Remote
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* salary range */}
            {job.salary && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-black">
                  💰 {job.salary}
                </span>
              </div>
            )}

            {/* description */}
            {job.description && (
              <p className="text-base text-black line-clamp-2 leading-relaxed font-medium">
                {job.description}
              </p>
            )}

            <div className="flex flex-col sm:items-start gap-3">
              {/* optional link to detail page */}
              <button
                onClick={openDetail}
                className="text-base text-black underline-offset-2 hover:underline font-semibold hover:text-gray-800 transition-colors duration-300 bg-gradient-to-r from-amber-100/50 to-yellow-100/50 px-4 py-2 rounded-lg hover:from-amber-200/60 hover:to-yellow-200/60 border border-amber-200/50"
              >
                View details ✨
              </button>
            </div>

            {/* requirements preview */}
            {/* {job.requirements && job.requirements.length > 0 && (
  <div className="mt-2 text-sm text-black font-medium leading-relaxed space-y-1">
    {job.requirements.slice(0, 3).map((req, index) => (
      <p key={index}>• {req}</p>
    ))}
    {job.requirements.length > 3 && (
      <p>• +{job.requirements.length - 3} more…</p>
    )}
  </div>
)} */}
          </div>

          {/* actions */}
        </div>

        {/* Posted date - bottom right */}
        {job.postedDate && (
          <div className="flex justify-end mt-4 pt-3 border-t border-amber-200/60">
            <span className="text-sm text-black font-medium">
              📅 Posted {job.postedDate}
            </span>
          </div>
        )}
      </li>

      {/* ───────────────────────── Detail Modal ───────────────────────── */}
      {isDetailOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 shadow-2xl animate-fadeIn border-2 border-amber-200/80">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-3xl font-bold text-black tracking-tight">
                {job.title}
              </h3>
              <button
                onClick={closeDetail}
                className="text-black hover:text-gray-700 text-3xl font-bold transition-colors duration-300 hover:scale-110 transform"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Location and Type */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-base font-bold bg-gradient-to-r from-green-200 to-emerald-200 text-black shadow-md">
                    📍 {job.location}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-base font-bold bg-gradient-to-r from-purple-200 to-pink-200 text-black shadow-md">
                    💼 {job.type}
                  </span>
                  {job.remote && (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-base font-bold bg-gradient-to-r from-orange-200 to-red-200 text-black shadow-md">
                      🌍 Remote
                    </span>
                  )}
                </div>
              </div>

              {/* Salary */}
              {job.salary && (
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-black mb-2">
                    💰 Salary Range
                  </h4>
                  <p className="text-lg text-black font-bold">{job.salary}</p>
                </div>
              )}

   {job.preference && (
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-black mb-2">
                    Preference :
                  </h4>
                  <p className="text-lg text-black ">{job.preference}</p>
                </div>
              )}



              {/* Description */}
              {job.description && (
                <div className="bg-gradient-to-r from-amber-50/80 to-yellow-50/80 rounded-xl p-4 border border-amber-200/60">
                  <h4 className="text-xl font-bold text-black mb-3">
                    📝 Job Summary 
                  </h4>
                  <p className="text-base text-black leading-relaxed font-medium">
                    {job.description}
                  </p>
                </div>
              )}

              {/* Key Responsibilities */}
              <div className="mb-6">
                <h4 className="text-xl font-bold text-black mb-3">
                  🎯 Key Responsibilities
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-black font-medium">
                  {job.responsibilities.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ol>
              </div>

              {/* Required Skills & Qualifications */}
              <div className="bg-gradient-to-r from-yellow-50/80 to-orange-50/80 rounded-xl p-4 border border-amber-200/60">
                <h4 className="text-xl font-bold text-black mb-3">
                  🔧 Qualifications and Skills
                </h4>
                {job.requirements && job.requirements.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, index) => (
                      <span
                        key={index}
                        className="inline-block text-sm px-3 py-2 bg-gradient-to-r from-amber-100 to-yellow-100 text-black rounded-full font-semibold shadow-sm border border-amber-200/50"
                      >
                        {req}
                      </span>
                    ))}
                  </div>
                ) : (
                  <ul className="list-disc list-inside space-y-2 text-black font-medium">
                    <li>
                      Bachelor's degree in Construction Management or related
                      field
                    </li>
                    <li>5+ years of construction management experience</li>
                    <li>Strong project management and leadership skills</li>
                    <li>Knowledge of building codes and safety regulations</li>
                    <li>
                      Excellent communication and problem-solving abilities
                    </li>
                  </ul>
                )}
              </div>

              {/* Application Section */}
              <div className="border-t-2 border-amber-200/60 pt-6 bg-gradient-to-r from-amber-50/80 to-yellow-50/80 rounded-xl p-4">
                <h4 className="text-xl font-bold text-black mb-4">
                  📋 Apply Now
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Name:
                    </label>
                    <input
                      type="text"
                      className="w-full border-2 border-amber-200/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-white/90 text-black font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Email:
                    </label>
                    <input
                      type="email"
                      className="w-full border-2 border-amber-200/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-white/90 text-black font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Phone:
                    </label>
                    <input
                      type="tel"
                      className="w-full border-2 border-amber-200/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-white/90 text-black font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Cover Letter:
                    </label>
                    <textarea
                      rows={4}
                      className="w-full border-2 border-amber-200/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-white/90 text-black font-medium"
                      placeholder="Tell us why you're interested in this position..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">
                      Resume/CV:
                    </label>
                    <input
                      type="file"
                      className="w-full border-2 border-amber-200/60 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 bg-white/90 text-black font-medium"
                      accept=".pdf,.doc,.docx"
                    />
                  </div>
                  <button
                    onClick={() => {
                      alert("Application submitted!");
                      closeDetail();
                    }}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-lg font-bold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  >
                    🚀 Submit Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────── Apply Modal ───────────────────────── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
          <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 w-full max-w-md rounded-2xl p-8 shadow-2xl animate-fadeIn border-2 border-amber-200/80">
            <h3 className="text-2xl font-bold mb-6 text-black">
              Apply for {job.title}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="w-full rounded-lg border-2 border-amber-200/60 px-4 py-3 focus:border-amber-400 focus:ring-amber-400 bg-white/90 text-black font-medium"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="w-full rounded-lg border-2 border-amber-200/60 px-4 py-3 focus:border-amber-400 focus:ring-amber-400 bg-white/90 text-black font-medium"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone (optional)"
                className="w-full rounded-lg border-2 border-amber-200/60 px-4 py-3 focus:border-amber-400 focus:ring-amber-400 bg-white/90 text-black font-medium"
              />
              <textarea
                name="message"
                rows={4}
                placeholder="Cover letter / message"
                className="w-full rounded-lg border-2 border-amber-200/60 px-4 py-3 focus:border-amber-400 focus:ring-amber-400 bg-white/90 text-black font-medium"
              />
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={close}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-gray-200 to-amber-100 text-black hover:from-gray-300 hover:to-amber-200 font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
