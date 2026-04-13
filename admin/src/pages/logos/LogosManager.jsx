import { useCallback, useEffect, useState } from 'react';
import api from '../../api/axios';

function SimpleModal({ title, open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-hidden rounded-xl border bg-white shadow" onClick={(e)=>e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-3">
          <h3 className="text-base font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-zinc-100">✕</button>
        </div>
        <div className="max-h-[calc(90vh-56px)] overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}

function LogoForm({ initial = {}, onSubmit }) {
  const [name, setName] = useState(initial.name || '');
  const [href, setHref] = useState(initial.href || '');
  const [order, setOrder] = useState(initial.order ?? 0);
  const [isActive, setIsActive] = useState(initial.isActive ?? true);
  const [image, setImage] = useState(initial.image || '');
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const preview = file ? URL.createObjectURL(file) : (image || '');

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (file) {
        const form = new FormData();
        form.append('name', name);
        form.append('href', href);
        form.append('order', String(order));
        form.append('isActive', String(isActive));
        form.append('image', file); // upload.single('image')
        await onSubmit(form, true);
      } else {
        await onSubmit({ name, href, order: Number(order)||0, isActive, image }, false);
      }
    } finally { setSaving(false); }
  };

  return (
    <form onSubmit={submit} className="space-y-4" aria-busy={saving}>
      <input className="w-full rounded border px-3 py-2" placeholder="Client name" value={name} onChange={e=>setName(e.target.value)} disabled={saving} />
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input className="w-full rounded border px-3 py-2" placeholder="Image URL (optional)" value={image} onChange={e=>setImage(e.target.value)} disabled={saving} />
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} disabled={saving} />
      </div>
      {preview && <img src={preview} alt="" className="h-16 w-auto rounded border object-contain" />}
      <input className="w-full rounded border px-3 py-2" placeholder="Link (optional)" value={href} onChange={e=>setHref(e.target.value)} disabled={saving} />
      <div className="grid gap-3 md:grid-cols-2">
        <input className="rounded border px-3 py-2" type="number" placeholder="Order" value={order} onChange={e=>setOrder(e.target.value)} disabled={saving} />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isActive} onChange={e=>setIsActive(e.target.checked)} disabled={saving} /> Active
        </label>
      </div>
      <button className="inline-flex items-center gap-2 rounded bg-zinc-900 px-4 py-2 text-white disabled:opacity-60" disabled={saving}>
        {saving && <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>}
        {saving ? 'Saving…' : 'Save'}
      </button>
    </form>
  );
}

export default function LogosManager() {
  const [list, setList] = useState([]);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const load = useCallback(async () => {
    try {
      setErr(''); setLoading(true);
      const { data } = await api.get('/api/logos');
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.response?.data?.message || 'Failed to load logos');
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const create = async (payload, isMultipart) => {
    try {
      if (isMultipart) {
        await api.post('/api/logos', payload, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/api/logos', payload);
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
        await api.put(`/api/logos/${id}`, payload, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.put(`/api/logos/${id}`, payload);
      }
      setEditing(null);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Update failed');
    }
  };

  const remove = async (id) => {
    try {
      if (!confirm('Delete this logo?')) return;
      await api.delete(`/api/logos/${id}`);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <div className="p-4">Loading…</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clients</h1>
        <button className="rounded bg-zinc-900 px-4 py-2 text-white" onClick={() => setCreating(true)}>
          + New Logo
        </button>
      </div>

      {err && <div className="text-sm text-red-600">{err}</div>}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((l) => (
          <div key={l._id} className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm">
            <img src={l.image} alt={l.name} className="h-12 w-auto shrink-0 rounded object-contain" />
            <div className="min-w-0 flex-1">
              <div className="truncate font-semibold">{l.name}</div>
              <div className="text-xs text-zinc-600">Order: {l.order} • Active: {String(l.isActive)}</div>
              {l.href && <div className="truncate text-xs text-blue-600">{l.href}</div>}
            </div>
            <div className="flex flex-col gap-2">
              <button className="rounded bg-zinc-900 px-3 py-2 text-white" onClick={() => setEditing(l)}>Edit</button>
              <button className="rounded bg-red-600 px-3 py-2 text-white" onClick={() => remove(l._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <SimpleModal title="Create Logo" open={creating} onClose={() => setCreating(false)}>
        <LogoForm onSubmit={create} />
      </SimpleModal>

      <SimpleModal title="Edit Logo" open={!!editing} onClose={() => setEditing(null)}>
        {editing && <LogoForm initial={editing} onSubmit={(p, isMultipart) => update(editing._id, p, isMultipart)} />}
      </SimpleModal>
    </div>
  );
}
