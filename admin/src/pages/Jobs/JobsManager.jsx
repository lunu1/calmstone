import { useCallback, useEffect, useMemo, useState } from 'react';
import api from '../../api/axios';

function SimpleModal({ title, open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-xl border bg-white shadow" onClick={e => e.stopPropagation()}>
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

function BulletsEditor({ value = [], onChange, label }) {
  const [text, setText] = useState('');
  const add = () => {
    const v = text.trim();
    if (!v) return;
    onChange?.([...(value || []), v]);
    setText('');
  };
  const remove = (i) => onChange?.((value || []).filter((_, idx) => idx !== i));
  return (
    <div>
      <div className="mb-1 text-sm font-medium">{label}</div>
      <div className="flex gap-2">
        <input className="w-full rounded border px-3 py-2" placeholder={`Add ${label?.toLowerCase()?.slice(0,-1) || 'item'}`} value={text} onChange={(e) => setText(e.target.value)}/>
        <button type="button" className="rounded bg-zinc-900 px-3 py-2 text-white" onClick={add}>Add</button>
      </div>
      <ul className="mt-2 space-y-1">
        {(value || []).map((t, i) => (
          <li key={i} className="flex items-center justify-between rounded border px-3 py-2">
            <span className="text-sm">{t}</span>
            <button type="button" className="rounded bg-red-600 px-2 py-1 text-white" onClick={() => remove(i)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function JobForm({ initial = {}, onSubmit }) {
  const [title, setTitle] = useState(initial.title || '');
  const [slug, setSlug] = useState(initial.slug || '');
  const [department, setDepartment] = useState(initial.department || '');
  const [location, setLocation] = useState(initial.location || '');
  const [type, setType] = useState(initial.type || 'Full-time');
  const [experience, setExperience] = useState(initial.experience || '');
  const [salary, setSalary] = useState(initial.salary || '');
  const [preference, setPreference] = useState(initial.preference || '');
  const [description, setDescription] = useState(initial.description || '');
  const [postedAt, setPostedAt] = useState(initial.postedAt ? initial.postedAt.slice(0,10) : '');
  const [closingDate, setClosingDate] = useState(initial.closingDate ? initial.closingDate.slice(0,10) : '');
  const [image, setImage] = useState(initial.image || '');
  const [file, setFile] = useState(null);
  const [responsibilities, setResponsibilities] = useState(Array.isArray(initial.responsibilities) ? initial.responsibilities : []);
  const [requirements, setRequirements] = useState(Array.isArray(initial.requirements) ? initial.requirements : []);
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
        form.append('department', department);
        form.append('location', location);
        form.append('type', type);
        form.append('experience', experience);
        form.append('salary', salary);
        form.append('preference', preference);
        form.append('description', description);
        if (postedAt) form.append('postedAt', postedAt);
        if (closingDate) form.append('closingDate', closingDate);
        form.append('responsibilities', JSON.stringify(responsibilities));
        form.append('requirements', JSON.stringify(requirements));
        form.append('isActive', String(isActive));
        form.append('featured', String(featured));
        form.append('image', file); // multer
        await onSubmit(form, true);
      } else {
        await onSubmit({
          title, slug, department, location, type, experience, salary, preference, description,
          postedAt, closingDate, responsibilities, requirements, isActive, featured, image
        }, false);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4" aria-busy={saving}>
      <div className="grid gap-3 md:grid-cols-2">
        <input className="rounded border px-3 py-2" placeholder="Job title" value={title} onChange={(e) => setTitle(e.target.value)} disabled={saving}/>
        <input className="rounded border px-3 py-2" placeholder="Slug (optional)" value={slug} onChange={(e) => setSlug(e.target.value)} disabled={saving}/>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <input className="rounded border px-3 py-2" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} disabled={saving}/>
        <input className="rounded border px-3 py-2" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} disabled={saving}/>
        <select className="rounded border px-3 py-2" value={type} onChange={(e) => setType(e.target.value)} disabled={saving}>
          <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option><option>Remote</option>
        </select>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <input className="rounded border px-3 py-2" placeholder="Experience (e.g. 7+ years)" value={experience} onChange={(e) => setExperience(e.target.value)} disabled={saving}/>
        <input className="rounded border px-3 py-2" placeholder="Salary (optional)" value={salary} onChange={(e) => setSalary(e.target.value)} disabled={saving}/>
        <input className="rounded border px-3 py-2" placeholder="Preference (optional)" value={preference} onChange={(e) => setPreference(e.target.value)} disabled={saving}/>
      </div>

      <textarea className="min-h-[120px] w-full rounded border px-3 py-2" placeholder="Short description" value={description} onChange={(e) => setDescription(e.target.value)} disabled={saving}/>

      <div className="grid gap-3 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm">Posted date</label>
          <input type="date" className="w-full rounded border px-3 py-2" value={postedAt} onChange={(e) => setPostedAt(e.target.value)} disabled={saving}/>
        </div>
        <div>
          <label className="mb-1 block text-sm">Closing date (optional)</label>
          <input type="date" className="w-full rounded border px-3 py-2" value={closingDate} onChange={(e) => setClosingDate(e.target.value)} disabled={saving}/>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input className="w-full rounded border px-3 py-2" placeholder="Image URL (optional)" value={image} onChange={(e) => setImage(e.target.value)} disabled={saving}/>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} disabled={saving}/>
      </div>

      <BulletsEditor value={responsibilities} onChange={setResponsibilities} label="Responsibilities" />
      <BulletsEditor value={requirements} onChange={setRequirements} label="Requirements" />

      <div className="grid gap-3 md:grid-cols-3">
        <label className="flex items-center gap-2"><input type="checkbox" checked={isActive}  onChange={(e)=>setIsActive(e.target.checked)} disabled={saving}/> Active</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={featured} onChange={(e)=>setFeatured(e.target.checked)} disabled={saving}/> Featured</label>
      </div>

      <button className="inline-flex items-center gap-2 rounded bg-zinc-900 px-4 py-2 text-white disabled:opacity-60" disabled={saving}>
        {saving && <Spinner/>} {saving ? 'Saving…' : 'Save'}
      </button>
    </form>
  );
}

export default function JobsManager() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = useCallback(async () => {
    try {
      setErr(''); setLoading(true);
      const { data } = await api.get('/api/jobs/admin'); // admin list
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.response?.data?.message || 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const create = async (payload, multipart) => {
    try {
      const cfg = multipart ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined;
      await api.post('/api/jobs', payload, cfg);
      setCreating(false);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Create failed');
    }
  };

  const update = async (id, payload, multipart) => {
    try {
      const cfg = multipart ? { headers: { 'Content-Type': 'multipart/form-data' } } : undefined;
      await api.put(`/api/jobs/${id}`, payload, cfg);
      setEditing(null);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Update failed');
    }
  };

  const toggle = async (id) => {
    try {
      await api.patch(`/api/jobs/${id}/toggle`);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Toggle failed');
    }
  };

  const remove = async (id) => {
    if (!confirm('Delete this job?')) return;
    try {
      await api.delete(`/api/jobs/${id}`);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <div className="p-4">Loading…</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <button className="rounded bg-zinc-900 px-4 py-2 text-white" onClick={() => setCreating(true)}>+ New Job</button>
      </div>

      {err && <div className="text-sm text-red-600">{err}</div>}

      <div className="space-y-3">
        {list.map((j) => (
          <div key={j._id} className="flex items-start gap-4 rounded-xl border bg-white p-4 shadow-sm">
            {j.image && <img src={j.image} alt="" className="h-20 w-28 rounded object-cover" />}
            <div className="flex-1">
              <div className="font-semibold">{j.title} <span className="text-xs text-zinc-500">(/jobs/{j.slug})</span></div>
              <div className="text-xs text-zinc-600">
                Dept: {j.department || '-'} • {j.location || '-'} • {j.type || '-'}
              </div>
              <div className="text-xs text-zinc-600">
                Posted: {j.postedAt ? new Date(j.postedAt).toLocaleDateString() : '-'} • Active: {String(j.isActive)}
              </div>
              {j.description && <p className="mt-1 line-clamp-2 text-sm text-zinc-700">{j.description}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <button className="rounded bg-blue-600 px-3 py-2 text-white" onClick={() => toggle(j._id)}>
                {j.isActive ? 'Deactivate' : 'Activate'}
              </button>
              <button className="rounded bg-zinc-900 px-3 py-2 text-white" onClick={() => setEditing(j)}>Edit</button>
              <button className="rounded bg-red-600 px-3 py-2 text-white" onClick={() => remove(j._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <SimpleModal title="Create Job" open={creating} onClose={() => setCreating(false)}>
        <JobForm onSubmit={create} />
      </SimpleModal>

      <SimpleModal title="Edit Job" open={!!editing} onClose={() => setEditing(null)}>
        {editing && <JobForm initial={editing} onSubmit={(payload, mp) => update(editing._id, payload, mp)} />}
      </SimpleModal>
    </div>
  );
}
