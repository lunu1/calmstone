import Section from '../models/Section.js';

const TITLES = [
  { key: 'overview', title: 'Company Overview', order: 1 },
  { key: 'mission',  title: 'Mission',          order: 2 },
  { key: 'vision',   title: 'Vision',           order: 3 },
];

// GET /api/overview (public)
export const getOverview = async (_req, res) => {
  try {
    const docs = await Section.find({ type: 'overview', isActive: true }).sort({ order: 1 });
    const byTitle = Object.fromEntries(docs.map(d => [String(d.title || '').toLowerCase(), d]));
    res.json({
      overview: { title: 'Company Overview', content: byTitle['company overview']?.content || '' },
      mission:  { title: 'Mission',          content: byTitle['mission']?.content || '' },
      vision:   { title: 'Vision',           content: byTitle['vision']?.content || '' },
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// PUT /api/overview (admin)
export const upsertOverview = async (req, res) => {
  try {
    const { overview, mission, vision } = req.body || {};
    const ops = TITLES.map(({ key, title, order }) => {
      const content =
        key === 'overview' ? overview?.content :
        key === 'mission'  ? mission?.content  :
        key === 'vision'   ? vision?.content   : '';
      return Section.updateOne(
        { type: 'overview', title },
        { $set: { type: 'overview', title, content: String(content || ''), order, isActive: true } },
        { upsert: true }
      );
    });
    await Promise.all(ops);
    const docs = await Section.find({ type: 'overview' }).sort({ order: 1 });
    res.json(docs);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
