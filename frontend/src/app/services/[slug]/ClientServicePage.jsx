'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

export default function ClientServicePage({ slug }) {
  const searchParams = useSearchParams();

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Load page data
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        setErr('');
        setLoading(true);
        const base = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${base}/api/service-pages/slug/${slug}`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load service page');
        const data = await res.json();
        if (!ignore) setPage(data);
      } catch (e) {
        if (!ignore) setErr(e.message || 'Failed to load');
      } finally {
        if (!ignore) setLoading(false);
      }
    })();
    return () => { ignore = true; };
  }, [slug]);

  // Deep link to a subpoint (by section title) when provided
  useEffect(() => {
    if (!page) return;
    const subpoint = searchParams.get('subpoint'); // section title
    if (!subpoint) return;

    const m = page.sections?.find(
      (s) => (s.title || '').trim() === decodeURIComponent(subpoint).trim()
    );
    if (m?.key) {
      setActiveSection(m.key);
      // let layout render before scrolling
      setTimeout(() => {
        const el = document.getElementById(m.key);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }
  }, [page, searchParams]);

  // Scroll spy for left nav / mobile drawer
  useEffect(() => {
    if (!page?.sections?.length) return;
    const handler = () => {
      let current = '';
      for (const sec of page.sections) {
        const el = document.getElementById(sec.key);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= 150) current = sec.key;
      }
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler(); // initialize
    return () => window.removeEventListener('scroll', handler);
  }, [page?.sections]);

  if (loading) {
    return <div className="mx-auto max-w-5xl px-6 py-16">Loading…</div>;
  }
  if (err || !page) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-lg border bg-white p-6 shadow">
          <div className="text-lg font-semibold">Service not available</div>
          <div className="mt-2 text-sm text-zinc-600">{err || 'Please try again later.'}</div>
        </div>
      </div>
    );
  }

  return (
    <motion.main
      className="flex bg-gray-100 scroll-smooth"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white shadow-md z-50 flex justify-between items-center px-4 py-3">
        <Image
          src="/logo.png"
          alt="Company Logo"
          width={110}
          height={40}
          className="object-contain"
          priority
        />
        <button
          className="p-2 bg-yellow-400 rounded-md text-black font-bold text-lg"
          onClick={() => setIsMenuOpen(true)}
        >
          ☰
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 sticky top-0 h-screen bg-white shadow-xl z-30">
        <nav className="flex-1 overflow-y-auto p-6 space-y-3">
          <h3 className="text-xl font-semibold mb-4 mt-28">{page.title}</h3>
          {page.sections?.map((sec) => (
            <a
              key={sec._id || sec.key}
              href={`#${sec.key}`}
              className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                activeSection === sec.key
                  ? 'bg-yellow-400 text-black font-bold shadow-md'
                  : 'text-black hover:bg-gray-100'
              }`}
            >
              {sec.title}
            </a>
          ))}
        </nav>
      </aside>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3 }}
            className="w-72 bg-white h-full shadow-xl p-6 space-y-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Menu</h2>
              <button className="text-black text-xl" onClick={() => setIsMenuOpen(false)}>
                ✕
              </button>
            </div>
            <nav className="space-y-3">
              {page.sections?.map((sec) => (
                <a
                  key={sec._id || sec.key}
                  href={`#${sec.key}`}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all ${
                    activeSection === sec.key
                      ? 'bg-yellow-400 text-black font-bold shadow-md'
                      : 'text-black hover:bg-gray-100'
                  }`}
                >
                  {sec.title}
                </a>
              ))}
            </nav>
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <section className="flex-1 pb-20 pt-16 lg:pt-0">
        {page.sections?.map((sec, index) => (
          <motion.div
            key={sec._id || sec.key}
            id={sec.key}
            className="relative md:h-screen flex flex-col md:items-center md:justify-center text-white scroll-mt-24 px-4 py-6 md:py-0"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Mobile Image */}
            <div className="md:hidden w-full h-56 mb-4 rounded-lg overflow-hidden">
              <Image
                src={sec.image || '/placeholder.jpg'}
                alt={sec.title}
                width={800}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Desktop Background Image */}
            <div className="hidden md:block absolute inset-0 z-0">
              <Image
                src={sec.image || '/placeholder.jpg'}
                alt={sec.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content Card */}
            <div className="relative z-10 max-w-5xl w-full bg-black/80 md:bg-black/70 rounded-lg backdrop-blur-md shadow-xl p-5 sm:p-8">
              <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-3">{sec.title}</h2>

              {sec.intro && (
                <p className="mb-4 text-sm sm:text-base leading-relaxed">{sec.intro}</p>
              )}

              {!!sec.scope?.length && (
                <>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3">
                    Our scope of services includes:
                  </h3>
                  <ul className="list-disc list-inside space-y-1 mb-4 text-gray-200 text-sm sm:text-base">
                    {sec.scope.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {sec.conclusion && (
                <p className="text-sm sm:text-base leading-relaxed">{sec.conclusion}</p>
              )}
            </div>
          </motion.div>
        ))}
      </section>
    </motion.main>
  );
}
