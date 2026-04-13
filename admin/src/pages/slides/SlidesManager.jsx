import { useCallback, useEffect, useState } from 'react';
import api from '../../api/axios'; // adjust path if needed

// lightweight modal (no external deps)
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

// inline form for create/edit
function SlideFormInline({ initial = {}, onSubmit }) {
  const [image, setImage] = useState(initial.image || '');
  const [heading, setHeading] = useState(initial.heading || '');
  const [subheading, setSubheading] = useState(initial.subheading || '');
  const [order, setOrder] = useState(initial.order ?? 0);
  const [isActive, setIsActive] = useState(initial.isActive ?? true);

  const submit = (e) => {
    e.preventDefault();
    onSubmit?.({ image, heading, subheading, order: Number(order) || 0, isActive: !!isActive });
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="flex items-center gap-3">
        {image && <img src={image} alt="" className="h-16 w-28 rounded border object-cover" />}
        <input
          className="w-full rounded-lg border px-3 py-2"
          placeholder="Image URL (https://...)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <input className="w-full rounded-lg border px-3 py-2" placeholder="Heading" value={heading} onChange={(e) => setHeading(e.target.value)} />
      <textarea className="w-full rounded-lg border px-3 py-2" placeholder="Subheading" value={subheading} onChange={(e) => setSubheading(e.target.value)} />
      <input className="w-full rounded-lg border px-3 py-2" type="number" placeholder="Order" value={order} onChange={(e) => setOrder(e.target.value)} />
      <label className="flex items-center gap-2">
        <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> Active
      </label>
      <button className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-white">Save</button>
    </form>
  );
}

export default function SlidesManager() {
  const [slides, setSlides] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const load = useCallback(async () => {
    try {
      setErr('');
      setLoading(true);
      const { data } = await api.get('/api/slides');
      setSlides(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.response?.data?.message || 'Failed to load slides');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const create = async (payload) => {
    try {
      await api.post('/api/slides', payload);
      setCreating(false);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Create failed');
    }
  };

  const update = async (id, payload) => {
    try {
      await api.put(`/api/slides/${id}`, payload);
      setEditing(null);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Update failed');
    }
  };

  const toggle = async (id) => {
    try {
      await api.patch(`/api/slides/${id}/toggle`);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Toggle failed');
    }
  };

  const remove = async (id) => {
    try {
      if (!confirm('Delete this slide?')) return;
      await api.delete(`/api/slides/${id}`);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <div className="p-4">Loading…</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Slides</h1>
        <button className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-white" onClick={() => setCreating(true)}>
          + New Slide
        </button>
      </div>

      {err && <p className="text-sm text-red-600">{err}</p>}

      <div className="grid gap-4 md:grid-cols-2">
        {slides.map((s) => (
          <div key={s._id} className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm">
            <img src={s.image} alt="" className="h-24 w-40 rounded object-cover" />
            <div className="flex-1">
              <div className="font-semibold">{s.heading}</div>
              <div className="text-sm text-zinc-600">{s.subheading}</div>
              <div className="mt-1 text-xs">Order: {s.order} • Active: {String(s.isActive)}</div>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex rounded-lg bg-zinc-900 px-3 py-2 text-white" onClick={() => setEditing(s)}>Edit</button>
              <button className="inline-flex rounded-lg bg-zinc-700 px-3 py-2 text-white" onClick={() => toggle(s._id)}>
                {s.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button className="inline-flex rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700" onClick={() => remove(s._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <SimpleModal title="Create Slide" open={creating} onClose={() => setCreating(false)}>
        <SlideFormInline onSubmit={create} />
      </SimpleModal>

      <SimpleModal title="Edit Slide" open={!!editing} onClose={() => setEditing(null)}>
        {editing && <SlideFormInline initial={editing} onSubmit={(p) => update(editing._id, p)} />}
      </SimpleModal>
    </div>
  );
}
