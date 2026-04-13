'use client';
import { useEffect, useState } from 'react';
import NewsCard from '../../../components/NewsCard';

export default function NewsListClient() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const res = await fetch(`${base}/api/news?active=true&limit=100`, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to load news');
        const data = await res.json();
        const mapped = (Array.isArray(data) ? data : []).map(n => ({
          ...n,
          date: new Date(n.publishedAt || n.createdAt).toLocaleDateString(),
        }));
        setItems(mapped);
      } catch (e) {
        setErr(e.message || 'Failed to load news');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="text-center text-black py-10">Loading news…</div>;
  if (err) return <div className="mx-auto max-w-md rounded-lg bg-red-50 p-4 text-red-700">Error: {err}</div>;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map(item => <NewsCard key={item.slug} item={item} />)}
    </div>
  );
}
