import Section from '../models/Section.js';

export const createSection = async (req, res) => {
  try {
    const doc = await Section.create(req.body);
    res.status(201).json(doc);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getSections = async (req, res) => {
  try {
    const { type, active } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (active === 'true') filter.isActive = true;

    const sections = await Section.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(sections);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const getSectionById = async (req, res) => {
  try {
    const doc = await Section.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const updateSection = async (req, res) => {
  try {
    const doc = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const deleteSection = async (req, res) => {
  try {
    const doc = await Section.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
