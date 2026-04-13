import ClientServicePage from './ClientServicePage';

export const dynamic = 'force-static';
export const dynamicParams = false;

async function getSlugs() {
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  try {
    const res = await fetch(`${base}/api/service-pages/slugs`, { cache: 'no-store' });
    if (!res.ok) return ['construction'];                      // fallback
    const slugs = await res.json();
    return Array.isArray(slugs) && slugs.length ? slugs : ['construction'];
  } catch {
    return ['construction'];
  }
}

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug })); // MUST be objects: [{ slug }]
}

export default async function Page({ params }) {
  // 👇 Next 15 requires awaiting params in server components
  const { slug } = await params;
  return <ClientServicePage slug={slug} />;
}
