import { useCallback, useEffect, useState } from 'react';
import api from '../../api/axios';

function Modal({ title, open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-xl border bg-white shadow" onClick={(e)=>e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-3">
          <h3 className="text-base font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-zinc-100">✕</button>
        </div>
        <div className="max-h-[calc(90vh-56px)] overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
    </svg>
  );
}

function NewsForm({ initial = {}, onSubmit }) {
  const [title, setTitle] = useState(initial.title || '');
  const [slug, setSlug] = useState(initial.slug || '');
  const [summary, setSummary] = useState(initial.summary || '');
  const [content, setContent] = useState(initial.content || '');
  const [publishedAt, setPublishedAt] = useState(initial.publishedAt ? initial.publishedAt.slice(0,10) : '');
  const [image, setImage] = useState(initial.image || '');
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState(Array.isArray(initial.tags) ? initial.tags.join(', ') : '');
  const [isActive, setIsActive] = useState(initial.isActive ?? true);
  const [featured, setFeatured] = useState(initial.featured ?? false);
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (file) {
        const form = new FormData();
        form.append('title', title);
        if (slug) form.append('slug', slug);
        form.append('summary', summary);
        form.append('content', content);
        if (publishedAt) form.append('publishedAt', publishedAt);
        form.append('tags', JSON.stringify(tags.split(',').map(t => t.trim()).filter(Boolean)));
        form.append('isActive', String(isActive));
        form.append('featured', String(featured));
        form.append('image', file);
        await onSubmit(form, true);
      } else {
        await onSubmit({
          title, slug, summary, content, publishedAt,
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
          isActive, featured, image
        }, false);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <input className="rounded border px-3 py-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} disabled={saving}/>
        <input className="rounded border px-3 py-2" placeholder="Slug (optional)" value={slug} onChange={e=>setSlug(e.target.value)} disabled={saving}/>
      </div>
      <textarea className="min-h-[80px] w-full rounded border px-3 py-2" placeholder="Summary" value={summary} onChange={e=>setSummary(e.target.value)} disabled={saving}/>
      <textarea className="min-h-[160px] w-full rounded border px-3 py-2" placeholder="Content" value={content} onChange={e=>setContent(e.target.value)} disabled={saving}/>
      <div className="grid gap-3 md:grid-cols-2">
        <input type="date" className="rounded border px-3 py-2" value={publishedAt} onChange={e=>setPublishedAt(e.target.value)} disabled={saving}/>
        <input className="rounded border px-3 py-2" placeholder="Tags (comma separated)" value={tags} onChange={e=>setTags(e.target.value)} disabled={saving}/>
      </div>
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input className="rounded border px-3 py-2" placeholder="Image URL (optional)" value={image} onChange={e=>setImage(e.target.value)} disabled={saving}/>
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0] || null)} disabled={saving}/>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <label className="flex items-center gap-2"><input type="checkbox" checked={isActive} onChange={e=>setIsActive(e.target.checked)} disabled={saving}/> Active</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={featured} onChange={e=>setFeatured(e.target.checked)} disabled={saving}/> Featured</label>
      </div>
      <button className="inline-flex items-center gap-2 rounded bg-zinc-900 px-4 py-2 text-white disabled:opacity-60" disabled={saving}>
        {saving && <Spinner/>} {saving ? 'Saving…' : 'Save'}
      </button>
    </form>
  );
}

export default function NewsManager() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = useCallback(async () => {
    try {
      setErr(''); setLoading(true);
      const { data } = await api.get('/api/news/admin');
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.response?.data?.message || 'Failed to load news');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const create = async (payload, multipart) => {
    try {
      const cfg = multipart ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined;
      await api.post('/api/news', payload, cfg);
      setCreating(false);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Create failed');
    }
  };

  const update = async (id, payload, multipart) => {
    try {
      const cfg = multipart ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined;
      await api.put(`/api/news/${id}`, payload, cfg);
      setEditing(null);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Update failed');
    }
  };

  const toggle = async (id) => {
    try {
      await api.patch(`/api/news/${id}/toggle`);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Toggle failed');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this article?')) return;
    try {
      await api.delete(`/api/news/${id}`);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <div className="p-4">Loading…</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">News</h1>
        <button className="rounded bg-zinc-900 px-4 py-2 text-white" onClick={() => setCreating(true)}>+ New Article</button>
      </div>

      {err && <div className="text-sm text-red-600">{err}</div>}

      <div className="space-y-3">
        {list.map((n) => (
          <div key={n._id} className="flex items-start gap-4 rounded-xl border bg-white p-4 shadow-sm">
            {n.image && <img src={n.image} alt="" className="h-20 w-28 rounded object-cover" />}
            <div className="flex-1">
              <div className="font-semibold">{n.title} <span className="text-xs text-zinc-500">(/news/{n.slug})</span></div>
              <div className="text-xs text-zinc-600">Published: {n.publishedAt ? new Date(n.publishedAt).toLocaleDateString() : '-'}</div>
              {n.summary && <p className="mt-1 line-clamp-2 text-sm text-zinc-700">{n.summary}</p>}
              <div className="mt-1 text-xs">Active: {String(n.isActive)} • Featured: {String(n.featured)}</div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="rounded bg-blue-600 px-3 py-2 text-white" onClick={() => toggle(n._id)}>
                {n.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button className="rounded bg-zinc-900 px-3 py-2 text-white" onClick={() => setEditing(n)}>Edit</button>
              <button className="rounded bg-red-600 px-3 py-2 text-white" onClick={() => remove(n._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <Modal title="Create Article" open={creating} onClose={() => setCreating(false)}>
        <NewsForm onSubmit={create} />
      </Modal>

      <Modal title="Edit Article" open={!!editing} onClose={() => setEditing(null)}>
        {editing && <NewsForm initial={editing} onSubmit={(payload, mp) => update(editing._id, payload, mp)} />}
      </Modal>
    </div>
  );
}
