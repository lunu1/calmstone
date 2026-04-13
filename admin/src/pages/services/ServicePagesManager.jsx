import { useCallback, useEffect, useMemo, useState } from 'react';
import api from '../../api/axios'; // ← adjust if your axios instance lives elsewhere

/* -------------------- Reusable UI -------------------- */

function SimpleModal({ title, open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-xl border bg-white shadow"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-3">
          <h3 className="text-base font-semibold">{title}</h3>
          <button onClick={onClose} className="rounded p-1 hover:bg-zinc-100">✕</button>
        </div>
        <div className="max-h-[calc(90vh-56px)] overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );
}

function BulletsEditor({ value = [], onChange, addLabel = 'Add item' }) {
  const [text, setText] = useState('');
  const add = () => {
    const v = text.trim();
    if (!v) return;
    onChange?.([...(value || []), v]);
    setText('');
  };
  const remove = (i) => onChange?.((value || []).filter((_, idx) => idx !== i));
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          className="w-full rounded border px-3 py-2"
          placeholder={addLabel}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="button" className="rounded bg-zinc-900 px-3 py-2 text-white" onClick={add}>Add</button>
      </div>
      <ul className="space-y-1">
        {(value || []).map((t, i) => (
          <li key={i} className="flex items-center justify-between rounded border px-3 py-2">
            <span className="text-sm">{t}</span>
            <button type="button" className="rounded bg-red-600 px-2 py-1 text-white" onClick={() => remove(i)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------- Forms -------------------- */

// Create / Edit Service Page (category-level)
function ServicePageForm({ initial = {}, onSubmit }) {
  const [title, setTitle] = useState(initial.title || '');
  const [slug, setSlug] = useState(initial.slug || '');
  const [summary, setSummary] = useState(initial.summary || '');
  const [heroImage, setHeroImage] = useState(initial.heroImage || '');
  const [order, setOrder] = useState(initial.order ?? 0);
  const [isActive, setIsActive] = useState(initial.isActive ?? true);
  const [saving, setSaving] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit?.({
        title,
        slug,
        summary,
        heroImage,
        order: Number(order) || 0,
        isActive: !!isActive,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4" aria-busy={saving}>
      <div className="grid gap-3 md:grid-cols-2">
        <input className="rounded border px-3 py-2" placeholder="Title (e.g., Oilfield Surface Construction)"
               value={title} onChange={(e) => setTitle(e.target.value)} disabled={saving} />
        <input className="rounded border px-3 py-2" placeholder="Slug (e.g., construction)"
               value={slug} onChange={(e) => setSlug(e.target.value)} disabled={saving} />
      </div>
      <input className="w-full rounded border px-3 py-2" placeholder="Hero Image URL (optional)"
             value={heroImage} onChange={(e) => setHeroImage(e.target.value)} disabled={saving} />
      <textarea className="min-h-[100px] w-full rounded border px-3 py-2" placeholder="Summary (optional)"
                value={summary} onChange={(e) => setSummary(e.target.value)} disabled={saving} />
      <div className="grid gap-3 md:grid-cols-2">
        <input className="rounded border px-3 py-2" type="number" placeholder="Order"
               value={order} onChange={(e) => setOrder(e.target.value)} disabled={saving} />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} disabled={saving} />
          Active
        </label>
      </div>
      <button className="inline-flex items-center gap-2 rounded bg-zinc-900 px-4 py-2 text-white disabled:opacity-60" disabled={saving}>
        {saving && <Spinner />} {saving ? 'Saving…' : 'Save'}
      </button>
    </form>
  );
}

// Create / Edit Section (sub-sections with optional image upload)
function SectionForm({ pageId, initial = {}, onSubmit }) {
  const [keyVal, setKeyVal] = useState(initial.key || '');
  const [title, setTitle] = useState(initial.title || '');
  const [image, setImage] = useState(initial.image || '');
  const [file, setFile] = useState(null);
  const [intro, setIntro] = useState(initial.intro || '');
  const [scope, setScope] = useState(Array.isArray(initial.scope) ? initial.scope : []);
  const [conclusion, setConclusion] = useState(initial.conclusion || '');
  const [order, setOrder] = useState(initial.order ?? 0);
  const [isActive, setIsActive] = useState(initial.isActive ?? true);
  const [saving, setSaving] = useState(false);

  const preview = file ? URL.createObjectURL(file) : (image || '');

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (file) {
        const form = new FormData();
        form.append('key', keyVal);
        form.append('title', title);
        form.append('intro', intro);
        form.append('conclusion', conclusion);
        form.append('order', String(order));
        form.append('isActive', String(isActive));
        form.append('scope', JSON.stringify(scope));
        form.append('image', file); // multer: upload.single('image')
        await onSubmit?.(form, true);
      } else {
        await onSubmit?.({
          key: keyVal,
          title,
          image,
          intro,
          scope,
          conclusion,
          order: Number(order) || 0,
          isActive: !!isActive,
        }, false);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4" aria-busy={saving}>
      <div className="grid gap-3 md:grid-cols-2">
        <input className="rounded border px-3 py-2" placeholder="Key (anchor id, e.g., civil-structural)"
               value={keyVal} onChange={(e) => setKeyVal(e.target.value)} disabled={saving} />
        <input className="rounded border px-3 py-2" placeholder="Title (e.g., Civil & Structural)"
               value={title} onChange={(e) => setTitle(e.target.value)} disabled={saving} />
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <input className="w-full rounded border px-3 py-2" placeholder="Image URL (optional)"
               value={image} onChange={(e) => setImage(e.target.value)} disabled={saving} />
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} disabled={saving} />
      </div>
      {preview && <img src={preview} alt="" className="h-16 w-auto rounded border object-contain" />}

      <textarea className="min-h-[100px] w-full rounded border px-3 py-2" placeholder="Intro"
                value={intro} onChange={(e) => setIntro(e.target.value)} disabled={saving} />

      <div>
        <div className="mb-1 text-sm font-medium">Scope list</div>
        <BulletsEditor value={scope} onChange={setScope} addLabel="Add scope item" />
      </div>

      <textarea className="min-h-[80px] w-full rounded border px-3 py-2" placeholder="Conclusion"
                value={conclusion} onChange={(e) => setConclusion(e.target.value)} disabled={saving} />

      <div className="grid gap-3 md:grid-cols-2">
        <input className="rounded border px-3 py-2" type="number" placeholder="Order"
               value={order} onChange={(e) => setOrder(e.target.value)} disabled={saving} />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} disabled={saving} />
          Active
        </label>
      </div>

      <button className="inline-flex items-center gap-2 rounded bg-zinc-900 px-4 py-2 text-white disabled:opacity-60" disabled={saving}>
        {saving && <Spinner />} {saving ? 'Saving…' : 'Save'}
      </button>
    </form>
  );
}

function Spinner() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
    </svg>
  );
}

/* -------------------- Main Manager -------------------- */

export default function ServicePagesManager() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  // page CRUD modals
  const [creatingPage, setCreatingPage] = useState(false);
  const [editingPage, setEditingPage] = useState(null);

  // sections modal state (for a specific page)
  const [openSectionsFor, setOpenSectionsFor] = useState(null); // page doc
  const sections = useMemo(() => {
    if (!openSectionsFor) return [];
    return (openSectionsFor.sections || []).slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [openSectionsFor]);

  const [creatingSection, setCreatingSection] = useState(false);
  const [editingSection, setEditingSection] = useState(null);

  const load = useCallback(async () => {
    try {
      setErr(''); setLoading(true);
      const { data } = await api.get('/api/service-pages'); // admin list
      setPages(Array.isArray(data) ? data : []);
    } catch (e) {
      setErr(e?.response?.data?.message || 'Failed to load service pages');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  /* ---------- Page CRUD ---------- */

  const createPage = async (payload) => {
    try {
      await api.post('/api/service-pages', payload);
      setCreatingPage(false);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Create failed');
    }
  };

  const updatePage = async (id, payload) => {
    try {
      await api.put(`/api/service-pages/${id}`, payload);
      setEditingPage(null);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Update failed');
    }
  };

  const removePage = async (id) => {
    if (!confirm('Delete this service page?')) return;
    try {
      await api.delete(`/api/service-pages/${id}`);
      await load();
    } catch (e) {
      alert(e?.response?.data?.message || 'Delete failed');
    }
  };

  /* ---------- Sections CRUD (nested) ---------- */

  const refreshOnePage = useCallback(async (id) => {
    try {
      const { data } = await api.get('/api/service-pages'); // quick way: reload all and pick one
      const arr = Array.isArray(data) ? data : [];
      const found = arr.find(p => p._id === id);
      if (found) setOpenSectionsFor(found);
      setPages(arr);
    } catch (e) {}
  }, []);

  const createSection = async (pageId, payload, isMultipart) => {
    try {
      if (isMultipart) {
        await api.post(`/api/service-pages/${pageId}/sections`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post(`/api/service-pages/${pageId}/sections`, payload);
      }
      setCreatingSection(false);
      await refreshOnePage(pageId);
    } catch (e) {
      alert(e?.response?.data?.message || 'Create section failed');
    }
  };

  const updateSection = async (pageId, secId, payload, isMultipart) => {
    try {
      if (isMultipart) {
        await api.put(`/api/service-pages/${pageId}/sections/${secId}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.put(`/api/service-pages/${pageId}/sections/${secId}`, payload);
      }
      setEditingSection(null);
      await refreshOnePage(pageId);
    } catch (e) {
      alert(e?.response?.data?.message || 'Update section failed');
    }
  };

  const removeSection = async (pageId, secId) => {
    if (!confirm('Delete this section?')) return;
    try {
      await api.delete(`/api/service-pages/${pageId}/sections/${secId}`);
      await refreshOnePage(pageId);
    } catch (e) {
      alert(e?.response?.data?.message || 'Delete section failed');
    }
  };

  /* ---------- UI ---------- */

  if (loading) return <div className="p-4">Loading…</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Service Pages</h1>
        <button className="rounded bg-zinc-900 px-4 py-2 text-white" onClick={() => setCreatingPage(true)}>
          + New Page
        </button>
      </div>

      {err && <div className="text-sm text-red-600">{err}</div>}

      <div className="space-y-3">
        {pages.map((p) => (
          <div key={p._id} className="flex items-start gap-4 rounded-xl border bg-white p-4 shadow-sm">
            {p.heroImage && <img src={p.heroImage} alt="" className="h-20 w-28 rounded object-cover" />}
            <div className="flex-1">
              <div className="font-semibold">
                {p.title} <span className="text-xs text-zinc-500">(/services/{p.slug})</span>
              </div>
              <div className="text-xs text-zinc-600">Order: {p.order} • Active: {String(p.isActive)}</div>
              {p.summary && <p className="mt-1 line-clamp-2 text-sm text-zinc-700">{p.summary}</p>}
              <div className="mt-2 text-xs text-zinc-600">
                Sections: {Array.isArray(p.sections) ? p.sections.length : 0}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="rounded bg-blue-600 px-3 py-2 text-white" onClick={() => setOpenSectionsFor(p)}>
                Manage Sections
              </button>
              <button className="rounded bg-zinc-900 px-3 py-2 text-white" onClick={() => setEditingPage(p)}>
                Edit
              </button>
              <button className="rounded bg-red-600 px-3 py-2 text-white" onClick={() => removePage(p._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Page */}
      <SimpleModal title="Create Service Page" open={creatingPage} onClose={() => setCreatingPage(false)}>
        <ServicePageForm onSubmit={createPage} />
      </SimpleModal>

      <SimpleModal title="Edit Service Page" open={!!editingPage} onClose={() => setEditingPage(null)}>
        {editingPage && <ServicePageForm initial={editingPage} onSubmit={(payload) => updatePage(editingPage._id, payload)} />}
      </SimpleModal>

      {/* Sections Manager */}
      <SimpleModal
        title={openSectionsFor ? `Sections · ${openSectionsFor.title}` : 'Sections'}
        open={!!openSectionsFor}
        onClose={() => setOpenSectionsFor(null)}
      >
        {openSectionsFor && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-zinc-600">
                Route: <span className="font-mono">/services/{openSectionsFor.slug}</span>
              </div>
              <button className="rounded bg-zinc-900 px-3 py-2 text-white" onClick={() => setCreatingSection(true)}>
                + New Section
              </button>
            </div>

            <div className="space-y-3">
              {sections.map((s) => (
                <div key={s._id} className="flex items-start gap-4 rounded border bg-white p-3">
                  {s.image && <img src={s.image} alt="" className="h-16 w-24 rounded object-cover" />}
                  <div className="flex-1">
                    <div className="font-medium">{s.title} <span className="text-xs text-zinc-500">#{s.key}</span></div>
                    <div className="text-xs text-zinc-600">Order: {s.order} • Active: {String(s.isActive)} • Scope: {s.scope?.length || 0}</div>
                    {s.intro && <div className="mt-1 line-clamp-2 text-sm text-zinc-700">{s.intro}</div>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button className="rounded bg-zinc-900 px-3 py-2 text-white" onClick={() => setEditingSection(s)}>
                      Edit
                    </button>
                    <button className="rounded bg-red-600 px-3 py-2 text-white" onClick={() => removeSection(openSectionsFor._id, s._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {sections.length === 0 && <div className="text-sm text-zinc-600">No sections yet.</div>}
            </div>

            {/* Create / Edit Section */}
            <SimpleModal title="Create Section" open={creatingSection} onClose={() => setCreatingSection(false)}>
              <SectionForm
                pageId={openSectionsFor._id}
                onSubmit={(payload, isMultipart) => createSection(openSectionsFor._id, payload, isMultipart)}
              />
            </SimpleModal>

            <SimpleModal title="Edit Section" open={!!editingSection} onClose={() => setEditingSection(null)}>
              {editingSection && (
                <SectionForm
                  pageId={openSectionsFor._id}
                  initial={editingSection}
                  onSubmit={(payload, isMultipart) =>
                    updateSection(openSectionsFor._id, editingSection._id, payload, isMultipart)
                  }
                />
              )}
            </SimpleModal>
          </div>
        )}
      </SimpleModal>
    </div>
  );
}
