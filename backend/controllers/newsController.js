// controllers/newsController.js
import News from '../models/News.js';

const parseMaybeJSON = (v) => {
  if (typeof v === 'string') { try { return JSON.parse(v); } catch { return undefined; } }
  return v;
};

/* ------------------------------ PUBLIC ------------------------------ */

// GET /api/news?active=true&search=&limit=12&page=1
export const listPublicNews = async (req, res) => {
  try {
    const { search, active, limit = 12, page = 1 } = req.query;
    const filter = {};
    if (active === 'true') filter.isActive = true;
    if (search) {
      filter.$or = [
        { title:   { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const items = await News.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .lean();

    res.json(items);
  } catch {
    res.status(500).json({ message: 'Failed to load news' });
  }
};

// GET /api/news/slug/:slug
export const getPublicBySlug = async (req, res) => {
  try {
    const item = await News.findOne({ slug: req.params.slug, isActive: true }).lean();
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch {
    res.status(500).json({ message: 'Failed to fetch article' });
  }
};

// GET /api/news/slugs  -> ["oil-prices-drop","india-offshore-exploration"]
export const getActiveSlugs = async (_req, res) => {
  try {
    const slugs = await News.find({ isActive: true }).select('slug -_id').lean();
    res.json(slugs.map((s) => s.slug).filter(Boolean));
  } catch {
    res.status(500).json({ message: 'Failed to fetch slugs' });
  }
};

/* ------------------------------- ADMIN ------------------------------ */

// GET /api/news/admin
export const listAllNews = async (_req, res) => {
  try {
    const items = await News.find({}).sort({ createdAt: -1 }).lean();
    res.json(items);
  } catch {
    res.status(500).json({ message: 'Failed to list news' });
  }
};

// POST /api/news (multipart or JSON)
export const createNews = async (req, res) => {
  try {
    const body = req.body;
    const payload = {
      title:       body.title,
      slug:        body.slug,
      summary:     body.summary,
      content:     body.content,
      image:       req.file?.path || body.image || '',
      tags:        parseMaybeJSON(body.tags) ?? body.tags ?? [],
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
      isActive:    body.isActive !== 'false' && body.isActive !== false,
      featured:    body.featured === 'true' || body.featured === true,
    };
    const created = await News.create(payload);
    res.status(201).json(created);
  } catch (e) {
    console.error('createNews', e);
    res.status(500).json({ message: 'Failed to create news' });
  }
};

// PUT /api/news/:id (multipart or JSON)
export const updateNews = async (req, res) => {
  try {
    const body = req.body;
    const update = {
      title:    body.title,
      slug:     body.slug,
      summary:  body.summary,
      content:  body.content,
      tags:     parseMaybeJSON(body.tags) ?? body.tags,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : undefined,
      isActive: body.isActive === 'true' || body.isActive === true ? true :
                body.isActive === 'false' || body.isActive === false ? false : undefined,
      featured: body.featured === 'true' || body.featured === true ? true :
                body.featured === 'false' || body.featured === false ? false : undefined,
    };
    if (req.file?.path) update.image = req.file.path;
    if (body.image !== undefined && !req.file) update.image = body.image;

    const updated = await News.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updated) return res.status(404).json({ message: 'News not found' });
    res.json(updated);
  } catch (e) {
    console.error('updateNews', e);
    res.status(500).json({ message: 'Failed to update news' });
  }
};

// PATCH /api/news/:id/toggle
export const toggleNews = async (req, res) => {
  try {
    const doc = await News.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'News not found' });
    doc.isActive = !doc.isActive;
    await doc.save();
    res.json({ success: true, isActive: doc.isActive });
  } catch {
    res.status(500).json({ message: 'Failed to toggle news' });
  }
};

// DELETE /api/news/:id
export const removeNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ message: 'Failed to delete news' });
  }
};
