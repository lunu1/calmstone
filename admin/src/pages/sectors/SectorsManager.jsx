import { useCallback, useEffect, useState } from 'react';
import api from '../../api/axios'; // adjust if needed

function SimpleModal({ title, open, onClose, children }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl border bg-white shadow"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-3">
          <h3 className="text-base font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-zinc-100">✕</button>
        </div>
        <div className="max-h-[calc(90vh-56px)] overflow-y-auto overscroll-contain p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

function BulletsEditor({ value = [], onChange }) {
  const [text, setText] = useState('');
  const add = () => {
    if (!text.trim()) return;
    onChange?.([...value, text.trim()]);
    setText('');
  };
  const remove = (i) => onChange?.(value.filter((_, idx) => idx !== i));
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          className="w-full rounded border px-3 py-2"
          placeholder="Add bullet text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="rounded bg-zinc-900 px-3 py-2 text-white" type="button" onClick={add}>
          Add
        </button>
      </div>
      <ul className="space-y-1">
        {value.map((t, i) => (
          <li key={i} className="flex items-center justify-between rounded border px-3 py-2">
            <span className="text-sm">{t}</span>
            <button className="rounded bg-red-600 px-2 py-1 text-white" type="button" onClick={() => remove(i)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SectorForm({ initial = {}, onSubmit }) {
  // title, content, image(url), file(upload), subtitle(href), bullets->items, order, isActive
  const [title, setTitle] = useState(initial.title || '');
  const [content, setContent] = useState(initial.content || '');
  const [image, setImage] = useState(initial.image || '');
  const [file, setFile] = useState(null);
  const [href, setHref] = useState(initial.subtitle || '');
  const [order, setOrder] = useState(initial.order ?? 0);
  const [isActive, setIsActive] = useState(initial.isActive ?? true);
  const [bullets, setBullets] = useState(
    Array.isArray(initial.items)
      ? [...initial.items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .map((i) => i.text || '').filter(Boolean)
      : []
  );
  const [saving, setSaving] = useState(false);

  const previewSrc = file ? URL.createObjectURL(file) : (image || '');

  const submit = async (e) => {
    e.preventDefault();
    const items = bullets.map((text, idx) => ({ text, order: idx }));

    setSaving(true);
    try {
      if (file) {
        const form = new FormData();
        form.append('title', title);
        form.append('content', content);
        form.append('subtitle', href);
        form.append('order', String(order));
        form.append('isActive', String(isActive));
        form.append('items', JSON.stringify(items));
        form.append('image', file); // must match upload.single('image')
        await onSubmit?.(form, true);
      } else {
        await onSubmit?.({
          title,
          content,
          subtitle: href,
          order: Number(order) || 0,
          isActive: !!isActive,
          items,
          image, // optional: direct URL
        }, false);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4" aria-busy={saving}>
      <div className="grid gap-3 md:grid-cols-2">
        <input className="rounded border px-3 py-2" placeholder="Title" value={title}
               onChange={(e) => setTitle(e.target.value)} disabled={saving} />
        <input className="rounded border px-3 py-2" placeholder="Href (e.g. /construction)" value={href}
               onChange={(e) => setHref(e.target.value)} disabled={saving} />
      </div>

      <div className="grid items-start gap-3 md:grid-cols-[1fr_auto]">
        <input className="w-full rounded border px-3 py-2" placeholder="Image URL (optional)"
               value={image} onChange={(e) => setImage(e.target.value)} disabled={saving} />
        <div className="flex items-center gap-2">
          <input type="file" accept="image/*"
                 onChange={(e) => setFile(e.target.files?.[0] || null)} disabled={saving} />
          {file && (
            <button type="button" className="rounded bg-zinc-200 px-2 py-1"
                    onClick={() => setFile(null)} disabled={saving}>
              Clear file
            </button>
          )}
        </div>
      </div>

      {previewSrc && (
        <img src={previewSrc} alt="" className="h-20 w-32 rounded border object-cover" />
      )}

      <textarea className="min-h-[120px] w-full rounded border px-3 py-2" placeholder="Content"
                value={content} onChange={(e) => setContent(e.target.value)} disabled={saving} />

      <div className="grid gap-3 md:grid-cols-2">
        <input className="rounded border px-3 py-2" type="number" placeholder="Order"
               value={order} onChange={(e) => setOrder(e.target.value)} disabled={saving} />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isActive}
                 onChange={(e) => setIsActive(e.target.checked)} disabled={saving} /> Active
        </label>
      </div>

      <div>
        <div className="mb-1 text-sm font-medium">Bullets</div>
        <BulletsEditor value={bullets} onChange={setBullets} />
      </div>

      <button
        className="inline-flex items-center gap-2 rounded bg-zinc-900 px-4 py-2 text-white disabled:opacity-60"
        disabled={saving}
      >
        {saving && (
          <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
          </svg>
        )}
        {saving ? 'Saving…' : 'Save'}
      </button>
    </form>
  );
}


export default function SectorsManager() {
  const [list, setList] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const load = useCallback(async () => {
    try {
      setErr(''); setLoading(true);
      const { data } = await api.get('/api/sectors'); // public read OK
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.response?.data?.message || 'Failed to load sectors');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const create = async (payload, isMultipart) => {
    try {
      if (isMultipart) {
        await api.post('/api/sectors', payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/api/sectors', payload);
      }
      setCreating(false);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Create failed');
    }
  };

  const update = async (id, payload, isMultipart) => {
    try {
      if (isMultipart) {
        await api.put(`/api/sectors/${id}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.put(`/api/sectors/${id}`, payload);
      }
      setEditing(null);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Update failed');
    }
  };

  const remove = async (id) => {
    try {
      if (!confirm('Delete this sector?')) return;
      await api.delete(`/api/sectors/${id}`);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <div className="p-4">Loading…</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sectors</h1>
        <button className="rounded bg-zinc-900 px-4 py-2 text-white" onClick={() => setCreating(true)}>
          + New Sector
        </button>
      </div>

      {err && <div className="text-sm text-red-600">{err}</div>}

      <div className="space-y-3">
        {list.map((s) => (
          <div key={s._id} className="flex items-start gap-4 rounded-xl border bg-white p-4 shadow-sm">
            {s.image && <img src={s.image} alt="" className="h-20 w-28 rounded object-cover" />}
            <div className="flex-1">
              <div className="font-semibold">
                {s.title} <span className="text-xs text-zinc-500">({s.subtitle || '#'})</span>
              </div>
              <div className="text-xs text-zinc-600">
                Order: {s.order} • Active: {String(s.isActive)}
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-zinc-700">{s.content}</p>
              {Array.isArray(s.items) && s.items.length > 0 && (
                <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700">
                  {s.items
                    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                    .map((i, idx) => <li key={idx}>{i.text}</li>)}
                </ul>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button className="rounded bg-zinc-900 px-3 py-2 text-white" onClick={() => setEditing(s)}>Edit</button>
              <button className="rounded bg-red-600 px-3 py-2 text-white" onClick={() => remove(s._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <SimpleModal title="Create Sector" open={creating} onClose={() => setCreating(false)}>
        <SectorForm onSubmit={create} />
      </SimpleModal>

      <SimpleModal title="Edit Sector" open={!!editing} onClose={() => setEditing(null)}>
        {editing && (
          <SectorForm
            initial={editing}
            onSubmit={(payload, isMultipart) => update(editing._id, payload, isMultipart)}
          />
        )}
      </SimpleModal>
    </div>
  );
}
