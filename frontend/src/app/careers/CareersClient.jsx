'use client';

import { useEffect, useState } from 'react';
import JobCard from './JobCard';

export default function CareersClient() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setErr('');
        const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await fetch(`${base}/api/jobs`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load jobs');
        const data = await res.json();

        // normalize/format for the card
        const normalized = (Array.isArray(data) ? data : []).map((j) => ({
          ...j,
          postedDate: j.postedDate || j.postedAt || null, // JobCard expects postedDate
        }));
        setJobs(normalized);
      } catch (e) {
        setErr(e.message || 'Failed to load jobs');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="text-center text-white py-10">Loading jobs…</div>;
  if (err) return <div className="mx-auto max-w-md rounded-lg bg-red-50 p-4 text-red-700">Error: {err}</div>;

  return (
    <div className="mt-10">
      {jobs.length ? (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </ul>
      ) : (
        <div className="mx-auto max-w-md rounded-lg bg-gray-800 p-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-700 shadow-inner">
            <svg className="h-8 w-8 text-black" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold">No roles available</h3>
          <p className="mb-6 text-black">We’re growing fast — check back soon or reach out!</p>
          <a href="/contact" className="inline-block rounded-lg bg-yellow-600 px-6 py-2 font-semibold text-white hover:bg-yellow-700 transition">
            Submit Résumé
          </a>
        </div>
      )}
    </div>
  );
}
