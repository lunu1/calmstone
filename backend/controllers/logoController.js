import util from 'node:util';
import Logo from '../models/Logo.js';
import cloudinary from '../config/cloudinary.js';

const parseBool = (v) => String(v) === 'true' || v === true;

export const listLogos = async (req, res) => {
  try {
    const filter = {};
    if (req.query.active === 'true') filter.isActive = true;
    const logos = await Logo.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(logos);
  } catch (e) {
    res.status(500).json({ message: 'Failed to list logos' });
  }
};

export const getLogo = async (req, res) => {
  try {
    const logo = await Logo.findById(req.params.id);
    if (!logo) return res.status(404).json({ message: 'Not found' });
    res.json(logo);
  } catch (e) {
    res.status(500).json({ message: 'Failed to get logo' });
  }
};

export const createLogo = async (req, res) => {
  try {
    const b = req.body || {};
    const file = req.file;

    const payload = {
      name: b.name,
      href: b.href || '',
      order: Number(b.order ?? 0),
      isActive: parseBool(b.isActive),
    };

    if (file?.path) {
      payload.image = file.path;           // secure_url
      payload.imagePublicId = file.filename;
    } else if (b.image) {
      payload.image = b.image;
      if (b.imagePublicId) payload.imagePublicId = b.imagePublicId;
    } else {
      return res.status(400).json({ message: 'Image is required' });
    }

    const doc = await Logo.create(payload);
    res.status(201).json(doc);
  } catch (e) {
    console.error('[logo:create] ', util.inspect(e, { depth: 4 }));
    res.status(500).json({ message: 'Failed to create logo' });
  }
};

export const updateLogo = async (req, res) => {
  try {
    const b = req.body || {};
    const file = req.file;

    const logo = await Logo.findById(req.params.id);
    if (!logo) return res.status(404).json({ message: 'Not found' });

    if (typeof b.name !== 'undefined') logo.name = b.name;
    if (typeof b.href !== 'undefined') logo.href = b.href;
    if (typeof b.order !== 'undefined') logo.order = Number(b.order ?? 0);
    if (typeof b.isActive !== 'undefined') logo.isActive = parseBool(b.isActive);

    if (file?.path) {
      // if replacing image, optionally delete old
      if (logo.imagePublicId) {
        try { await cloudinary.uploader.destroy(logo.imagePublicId); } catch {}
      }
      logo.image = file.path;
      logo.imagePublicId = file.filename;
    } else if (b.image) {
      logo.image = b.image;
      if (b.imagePublicId) logo.imagePublicId = b.imagePublicId;
    }

    await logo.save();
    res.json(logo);
  } catch (e) {
    console.error('[logo:update] ', e);
    res.status(500).json({ message: 'Failed to update logo' });
  }
};

export const deleteLogo = async (req, res) => {
  try {
    const logo = await Logo.findByIdAndDelete(req.params.id);
    if (!logo) return res.status(404).json({ message: 'Not found' });
    if (logo.imagePublicId) {
      try { await cloudinary.uploader.destroy(logo.imagePublicId); } catch {}
    }
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: 'Failed to delete logo' });
  }
};

// optional: reorder in bulk
export const reorderLogos = async (req, res) => {
  try {
    const { order = [] } = req.body; // [{_id, order}, ...]
    const ops = order.map(({ _id, order }) => Logo.updateOne({ _id }, { $set: { order } }));
    await Promise.all(ops);
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: 'Failed to reorder logos' });
  }
};
