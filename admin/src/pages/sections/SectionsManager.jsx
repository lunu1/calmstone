import { useEffect, useState, useCallback } from 'react';
import api from '../../api/axios'; // adjust path if needed

function SimpleModal({ title, open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-xl border bg-white shadow">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h3 className="text-base font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-zinc-100">✕</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

function SectionFormInline({ initial = {}, onSubmit }) {
  const [type, setType] = useState(initial.type || 'about');
  const [title, setTitle] = useState(initial.title || '');
  const [subtitle, setSubtitle] = useState(initial.subtitle || '');
  const [content, setContent] = useState(initial.content || '');
  const [image, setImage] = useState(initial.image || '');
  const [order, setOrder] = useState(initial.order ?? 0);
  const [isActive, setIsActive] = useState(initial.isActive ?? true);

  const submit = (e) => {
    e.preventDefault();
    onSubmit?.({ type, title, subtitle, content, image, order: Number(order) || 0, isActive: !!isActive });
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <input className="w-full rounded-lg border px-3 py-2" placeholder="type (about/services/cta...)" value={type} onChange={(e) => setType(e.target.value)} />
      <input className="w-full rounded-lg border px-3 py-2" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input className="w-full rounded-lg border px-3 py-2" placeholder="subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
      <textarea className="w-full rounded-lg border px-3 py-2" placeholder="content" value={content} onChange={(e) => setContent(e.target.value)} />
      <div className="flex items-center gap-3">
        {image && <img src={image} alt="" className="h-16 w-28 rounded border object-cover" />}
        <input className="w-full rounded-lg border px-3 py-2" placeholder="image URL (optional)" value={image} onChange={(e) => setImage(e.target.value)} />
      </div>
      <input className="w-full rounded-lg border px-3 py-2" type="number" placeholder="order" value={order} onChange={(e) => setOrder(e.target.value)} />
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> Active
      </label>
      <button className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-white">Save</button>
    </form>
  );
}

export default function SectionsManager() {
  const [sections, setSections] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const load = useCallback(async () => {
    try {
      setErr('');
      setLoading(true);
      const { data } = await api.get('/api/sections');
      setSections(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.response?.data?.message || 'Failed to load sections');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const create = async (payload) => {
    try {
      await api.post('/api/sections', payload);
      setCreating(false);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Create failed');
    }
  };

  const update = async (id, payload) => {
    try {
      await api.put(`/api/sections/${id}`, payload);
      setEditing(null);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Update failed');
    }
  };

  const remove = async (id) => {
    try {
      if (!confirm('Delete this section?')) return;
      await api.delete(`/api/sections/${id}`);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <div className="p-4">Loading…</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sections</h1>
        <button className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-white" onClick={() => setCreating(true)}>
          + New Section
        </button>
      </div>

      {err && <p className="text-sm text-red-600">{err}</p>}

      <div className="space-y-3">
        {sections.map((s) => (
          <div key={s._id} className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm">
            {s.image && <img src={s.image} alt="" className="h-16 w-24 rounded object-cover" />}
            <div className="flex-1">
              <div className="font-semibold">[{s.type}] {s.title}</div>
              <div className="text-xs text-zinc-600">Order: {s.order} • Active: {String(s.isActive)}</div>
              {s.subtitle && <div className="text-xs text-zinc-500">{s.subtitle}</div>}
            </div>
            <div className="flex gap-2">
              <button className="inline-flex rounded-lg bg-zinc-900 px-3 py-2 text-white" onClick={() => setEditing(s)}>Edit</button>
              <button className="inline-flex rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700" onClick={() => remove(s._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <SimpleModal title="Create Section" open={creating} onClose={() => setCreating(false)}>
        <SectionFormInline onSubmit={create} />
      </SimpleModal>

      <SimpleModal title="Edit Section" open={!!editing} onClose={() => setEditing(null)}>
        {editing && <SectionFormInline initial={editing} onSubmit={(p) => update(editing._id, p)} />}
      </SimpleModal>
    </div>
  );
}
