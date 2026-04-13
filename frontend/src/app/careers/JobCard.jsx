"use client";

import { useState } from "react";

export default function JobCard({ job }) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return setResume(null);
    const ok = /pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document/.test(
      file.type
    );
    if (!ok) {
      alert("Please upload a PDF, DOC, or DOCX file.");
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Max file size is 5MB.");
      e.target.value = "";
      return;
    }
    setResume(file);
  };

  async function submitApplication(e) {
    e.preventDefault();
    if (!name || !email) {
      alert("Name and Email are required");
      return;
    }
    try {
      setSubmitting(true);
      const fd = new FormData();
      fd.append("name", name);
      fd.append("email", email);
      if (phone) fd.append("phone", phone);
      if (message) fd.append("message", message);
      fd.append("jobTitle", job?.title || "Unknown Role");
      if (job?._id) fd.append("jobId", job._id);
      if (resume) fd.append("resume", resume);

      const res = await fetch(`${API}/api/jobs/apply`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Failed to submit application");
      }

      // reset & close
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setResume(null);
      setIsDetailOpen(false);
      alert("Application submitted successfully!");
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Card */}
      <li className="list-none group border-2 border-amber-200/60 rounded-2xl p-6 hover:shadow-2xl hover:border-amber-300/80 transition-all duration-500 bg-gradient-to-br from-amber-50/90 via-yellow-50/70 to-orange-50/60 hover:from-amber-100/90 hover:via-yellow-100/80 hover:to-orange-100/70 backdrop-blur-sm hover:scale-[1.02] transform">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-bold text-black tracking-tight">
              {job.title}
            </h2>
            <div className="flex flex-col gap-2 mt-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-amber-200 to-yellow-200 text-black shadow-sm">
                📍 {job.location}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-orange-200 to-amber-200 text-black shadow-sm">
                💼 {job.type} {job.remote ? "• Remote" : ""}
              </span>
            </div>
          </div>

          {job.salary && (
            <div className="text-sm font-bold text-black">💰 {job.salary}</div>
          )}

          {job.description && (
            <p className="text-base text-black line-clamp-2 leading-relaxed font-medium">
              {job.description}
            </p>
          )}

          <div>
            <button
              onClick={() => setIsDetailOpen(true)}
              className="text-base text-black underline-offset-2 hover:underline font-semibold bg-gradient-to-r from-amber-100/50 to-yellow-100/50 px-4 py-2 rounded-lg border border-amber-200/50"
            >
              View details ✨
            </button>
          </div>

          {job.postedDate && (
            <div className="flex justify-end mt-4 pt-3 border-t border-amber-200/60">
              <span className="text-sm text-black font-medium">
                📅 Posted {job.postedDate}
              </span>
            </div>
          )}
        </div>
      </li>

      {/* Detail / Apply modal */}
      {isDetailOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 shadow-2xl border-2 border-amber-200/80">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-3xl font-bold text-black">{job.title}</h3>
              <button
                onClick={() => setIsDetailOpen(false)}
                className="text-black text-3xl font-bold"
              >
                ×
              </button>
            </div>

            {/* … your description / responsibilities / requirements blocks … */}

            <div className="border-t-2 border-amber-200/60 pt-6 mt-6">
              <h4 className="text-xl font-bold text-black mb-4">📋 Apply Now</h4>
              <form onSubmit={submitApplication} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border-2 border-amber-200/60 rounded-lg px-4 py-3 bg-white/90 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border-2 border-amber-200/60 rounded-lg px-4 py-3 bg-white/90 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Phone</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border-2 border-amber-200/60 rounded-lg px-4 py-3 bg-white/90 text-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Cover Letter</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border-2 border-amber-200/60 rounded-lg px-4 py-3 bg-white/90 text-black"
                    placeholder="Tell us why you're interested in this position..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Resume (PDF/DOC/DOCX, max 5MB)</label>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={onFileChange} />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-lg font-bold hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg disabled:opacity-70"
                >
                  {submitting ? "Sending…" : "🚀 Submit Application"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
