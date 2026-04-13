import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function OverviewManager() {
  const [form, setForm] = useState({
    overview: { title: 'Company Overview', content: '' },
    mission:  { title: 'Mission',          content: '' },
    vision:   { title: 'Vision',           content: '' },
  });
  const [saving, setSaving]   = useState(false);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [ok,  setOk]  = useState('');

  const load = async () => {
    try {
      setErr(''); setOk(''); setLoading(true);
      const { data } = await api.get('/api/overview');
      setForm({
        overview: { title: data?.overview?.title || 'Company Overview', content: data?.overview?.content || '' },
        mission:  { title: data?.mission?.title  || 'Mission',          content: data?.mission?.content  || '' },
        vision:   { title: data?.vision?.title   || 'Vision',           content: data?.vision?.content   || '' },
      });
    } catch (e) {
      setErr(e?.response?.data?.message || 'Failed to load overview');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    try {
      setErr(''); setOk(''); setSaving(true);
      await api.put('/api/overview', form);
      setOk('Saved successfully');
    } catch (e) {
      setErr(e?.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const set = (key, value) => setForm(prev => ({ ...prev, [key]: { ...prev[key], ...value } }));

  if (loading) return <div className="p-4">Loading…</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Overview</h1>
      {err && <div className="text-sm text-red-600">{err}</div>}
      {ok  && <div className="text-sm text-green-600">{ok}</div>}

      {/* Company Overview */}
      <section className="rounded-xl border bg-white p-4 shadow-sm space-y-3">
        <h2 className="text-lg font-semibold">{form.overview.title}</h2>
        <textarea
          className="w-full rounded border px-3 py-2 min-h-[140px]"
          placeholder="Company overview content… (use blank lines for paragraphs)"
          value={form.overview.content}
          onChange={(e) => set('overview', { content: e.target.value })}
        />
      </section>

      {/* Mission */}
      <section className="rounded-xl border bg-white p-4 shadow-sm space-y-3">
        <h2 className="text-lg font-semibold">{form.mission.title}</h2>
        <textarea
          className="w-full rounded border px-3 py-2 min-h-[100px]"
          placeholder="Mission"
          value={form.mission.content}
          onChange={(e) => set('mission', { content: e.target.value })}
        />
      </section>

      {/* Vision */}
      <section className="rounded-xl border bg-white p-4 shadow-sm space-y-3">
        <h2 className="text-lg font-semibold">{form.vision.title}</h2>
        <textarea
          className="w-full rounded border px-3 py-2 min-h-[100px]"
          placeholder="Vision"
          value={form.vision.content}
          onChange={(e) => set('vision', { content: e.target.value })}
        />
      </section>

      <button
        className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-4 py-2 text-white disabled:opacity-60"
        onClick={save}
        disabled={saving}
      >
        {saving ? 'Saving…' : 'Save'}
      </button>
    </div>
  );
}
