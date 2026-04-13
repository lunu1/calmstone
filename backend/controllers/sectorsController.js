// controllers/sectorsController.js
import Section from '../models/Section.js';

const parseMaybeJSON = (v) => {
  if (typeof v === 'string') {
    try { return JSON.parse(v); } catch { /* ignore */ }
  }
  return v;
};

export const createSector = async (req, res) => {
  try {
    const body = req.body || {};
    const file = req.file; // set by multer-storage-cloudinary

    // if file uploaded, multer adds: file.path (secure_url), file.filename (public_id)
    const image = file?.path || body.image || '';
    const imagePublicId = file?.filename || body.imagePublicId || '';

    // items may arrive as JSON string in multipart
    let items = parseMaybeJSON(body.items);
    if (!Array.isArray(items)) items = [];
    // normalize to [{ text, order }]
    items = items.map((t, idx) =>
      typeof t === 'string' ? { text: t, order: idx } : { text: t.text, order: t.order ?? idx }
    );

    const doc = await Section.create({
      type: 'sectors',
      title: body.title,
      content: body.content,
      image,
      imagePublicId,
      subtitle: body.subtitle,                  // used as href in your frontend
      items,
      order: Number(body.order ?? 0),
      isActive: String(body.isActive) === 'true' || body.isActive === true,
    });

    res.status(201).json(doc);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const updateSector = async (req, res) => {
  try {
    const body = req.body || {};
    const file = req.file;

    const payload = {
      title: body.title,
      content: body.content,
      subtitle: body.subtitle,
      order: Number(body.order ?? 0),
      isActive: String(body.isActive) === 'true' || body.isActive === true,
    };

    if (file?.path) {
      payload.image = file.path;              // new secure_url
      payload.imagePublicId = file.filename;  // new public_id
    } else if (body.image) {
      payload.image = body.image;             // keep provided URL if any
      if (body.imagePublicId) payload.imagePublicId = body.imagePublicId;
    }

    let items = parseMaybeJSON(body.items);
    if (Array.isArray(items)) {
      payload.items = items.map((t, idx) =>
        typeof t === 'string' ? { text: t, order: idx } : { text: t.text, order: t.order ?? idx }
      );
    }

    const doc = await Section.findOneAndUpdate(
      { _id: req.params.id, type: 'sectors' },
      payload,
      { new: true, runValidators: true }
    );
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


// Delete
export const deleteSector = async (req, res) => {
    try {
        const doc = await Section.findOneAndDelete({ _id: req.params.id, type: 'sectors' });
        if (!doc) return res.status(404).json({ message: 'Not found' });
        res.json({ ok: true });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
export const getSectorById = async (req, res) => {
    try {
        const doc = await Section.findOne({ _id: req.params.id, type: 'sectors' });
        if (!doc) return res.status(404).json({ message: 'Not found' });
        res.json(doc);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};
export const getSectors = async (req, res) => {
  try {
    const { active } = req.query;
    const filter = { type: 'sectors' };
    if (active === 'true') filter.isActive = true;
    const docs = await Section.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(docs);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
