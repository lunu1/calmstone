// src/app/news/[slug]/page.jsx
import { notFound } from 'next/navigation';
import NewsDetail from './NewsDetail';

const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function getArticle(slug) {
  const res = await fetch(`${BASE}/api/news/slug/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) return null;
  return res.json();
}

async function getAllNews() {
  const res = await fetch(`${BASE}/api/news?active=true&limit=100`, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  const data = await res.json();
  return Array.isArray(data)
    ? data.sort((a, b) => new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt))
    : [];
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${BASE}/api/news/slugs`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const slugs = await res.json();
    return Array.isArray(slugs) ? slugs.map((slug) => ({ slug })) : [];
  } catch {
    return [];
  }
}

// ---- Use a fixed locale + timezone to keep SSR/CSR identical ----
const fmt = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  timeZone: 'UTC',
});
const formatDate = (d) => (d ? fmt.format(new Date(d)) : '');

export async function generateMetadata({ params }) {
  const article = await getArticle(params.slug);
  if (!article) return { title: 'News' };
  return {
    title: article.title,
    description: article.summary || '',
    openGraph: {
      title: article.title,
      description: article.summary || '',
      images: article.image ? [{ url: article.image }] : [],
    },
  };
}

export default async function Page({ params }) {
  const [article, list] = await Promise.all([getArticle(params.slug), getAllNews()]);
  if (!article) notFound();

  // format dates once on the server
  const listFmt = list.map((n) => ({
    ...n,
    dateFormatted: formatDate(n.publishedAt || n.createdAt),
  }));

  const idx = listFmt.findIndex((n) => n.slug === params.slug);
  const prev = idx >= 0 && idx < listFmt.length - 1 ? listFmt[idx + 1] : null;
  const next = idx > 0 ? listFmt[idx - 1] : null;
  const otherNews = listFmt.filter((n) => n.slug !== params.slug).slice(0, 6);

  const formatted = {
    ...article,
    dateFormatted: formatDate(article.publishedAt || article.createdAt),
  };

  return <NewsDetail newsItem={formatted} otherNews={otherNews} prev={prev} next={next} />;
}
