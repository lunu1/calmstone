import util from 'node:util';
import ServicePage from '../models/ServicePage.js';
import cloudinary from '../config/cloudinary.js';
export const listActiveSlugs = async (_req, res) => {
  try {
    const docs = await ServicePage.find({ isActive: true })
      .select('slug -_id')
      .sort({ order: 1 })
      .lean();
    res.json(docs.map(d => d.slug));
  } catch (e) {
    res.status(500).json({ message: 'Failed to list slugs' });
  }
};

const toBool = v => String(v) === 'true' || v === true;

export const getBySlug = async (req, res) => {
  try {
    const doc = await ServicePage.findOne({ slug: req.params.slug, isActive: true }).lean();
    if (!doc) return res.status(404).json({ message: 'Not found' });
    // sort sections by order
    doc.sections = (doc.sections || []).filter(s => s.isActive !== false)
      .sort((a,b) => (a.order ?? 0) - (b.order ?? 0));
    res.json(doc);
  } catch (e) { res.status(500).json({ message: 'Failed to load' }); }
};

// Admin
export const listPages = async (_req, res) => {
  try {
    const docs = await ServicePage.find().sort({ order: 1, createdAt: -1 });
    res.json(docs);
  } catch (e) { res.status(500).json({ message: 'Failed to list' }); }
};

export const createPage = async (req, res) => {
  try {
    const b = req.body || {};
    const doc = await ServicePage.create({
      title: b.title,
      slug: b.slug,
      summary: b.summary || '',
      heroImage: b.heroImage || '',
      order: Number(b.order ?? 0),
      isActive: toBool(b.isActive),
      sections: [],
    });
    res.status(201).json(doc);
  } catch (e) {
    console.error('[servicePage:create]', util.inspect(e, { depth: 4 }));
    res.status(500).json({ message: 'Failed to create page' });
  }
};

export const updatePage = async (req, res) => {
  try {
    const b = req.body || {};
    const doc = await ServicePage.findByIdAndUpdate(
      req.params.id,
      {
        ...(b.title !== undefined && { title: b.title }),
        ...(b.slug !== undefined && { slug: b.slug }),
        ...(b.summary !== undefined && { summary: b.summary }),
        ...(b.heroImage !== undefined && { heroImage: b.heroImage }),
        ...(b.order !== undefined && { order: Number(b.order ?? 0) }),
        ...(b.isActive !== undefined && { isActive: toBool(b.isActive) }),
      },
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (e) { res.status(500).json({ message: 'Failed to update page' }); }
};

export const deletePage = async (req, res) => {
  try {
    const doc = await ServicePage.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ message: 'Failed to delete page' }); }
};

// Sections (subdocs)
export const addSection = async (req, res) => {
  try {
    const b = req.body || {};
    const file = req.file;

    const page = await ServicePage.findById(req.params.id);
    if (!page) return res.status(404).json({ message: 'Page not found' });

    const section = {
      key: b.key, title: b.title,
      intro: b.intro || '', conclusion: b.conclusion || '',
      scope: Array.isArray(b.scope) ? b.scope : (b.scope ? JSON.parse(b.scope) : []),
      order: Number(b.order ?? page.sections.length),
      isActive: toBool(b.isActive ?? true),
    };
    if (file?.path) {
      section.image = file.path;
      section.imagePublicId = file.filename;
    } else if (b.image) {
      section.image = b.image;
      if (b.imagePublicId) section.imagePublicId = b.imagePublicId;
    }

    page.sections.push(section);
    await page.save();
    res.status(201).json(page);
  } catch (e) {
    console.error('[servicePage:addSection]', e);
    res.status(500).json({ message: 'Failed to add section' });
  }
};

export const updateSection = async (req, res) => {
  try {
    const b = req.body || {};
    const file = req.file;

    const page = await ServicePage.findById(req.params.id);
    if (!page) return res.status(404).json({ message: 'Page not found' });
    const sec = page.sections.id(req.params.secId);
    if (!sec) return res.status(404).json({ message: 'Section not found' });

    if (b.key !== undefined) sec.key = b.key;
    if (b.title !== undefined) sec.title = b.title;
    if (b.intro !== undefined) sec.intro = b.intro;
    if (b.conclusion !== undefined) sec.conclusion = b.conclusion;
    if (b.order !== undefined) sec.order = Number(b.order ?? 0);
    if (b.isActive !== undefined) sec.isActive = toBool(b.isActive);

    if (b.scope !== undefined) {
      const arr = Array.isArray(b.scope) ? b.scope : (b.scope ? JSON.parse(b.scope) : []);
      sec.scope = arr.filter(Boolean);
    }

    if (file?.path) {
      if (sec.imagePublicId) {
        try { await cloudinary.uploader.destroy(sec.imagePublicId); } catch {}
      }
      sec.image = file.path;
      sec.imagePublicId = file.filename;
    } else if (b.image) {
      sec.image = b.image;
      if (b.imagePublicId) sec.imagePublicId = b.imagePublicId;
    }

    await page.save();
    res.json(page);
  } catch (e) { res.status(500).json({ message: 'Failed to update section' }); }
};

export const deleteSection = async (req, res) => {
  try {
    const page = await ServicePage.findById(req.params.id);
    if (!page) return res.status(404).json({ message: 'Page not found' });
    const sec = page.sections.id(req.params.secId);
    if (!sec) return res.status(404).json({ message: 'Section not found' });
    if (sec.imagePublicId) {
      try { await cloudinary.uploader.destroy(sec.imagePublicId); } catch {}
    }
    sec.deleteOne();
    await page.save();
    res.json({ ok: true });
  } catch (e) { res.status(500).json({ message: 'Failed to delete section' }); }
};
export const servicesMenu = async (_req, res) => {
  try {
    const pages = await ServicePage.find({ isActive: true })
      .sort({ order: 1 })
      .lean();

    const menu = pages.map((p) => ({
      label: p.title,
      href: `/services/${p.slug}`, // header will use this directly
      subpoints: (p.sections || [])
        .filter((s) => s.isActive !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((s) => s.title),
    }));

    res.json(menu);
  } catch (e) {
    res.status(500).json({ message: 'Failed to build services menu' });
  }
};