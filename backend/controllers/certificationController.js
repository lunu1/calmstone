import util from 'node:util';
import Certification from '../models/Certification.js';
import cloudinary from '../config/cloudinary.js';

const toBool = v => String(v) === 'true' || v === true;

export const listCerts = async (req, res) => {
  try {
    const filter = {};
    if (req.query.active === 'true') filter.isActive = true;
    const docs = await Certification.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(docs);
  } catch (e) {
    res.status(500).json({ message: 'Failed to list certifications' });
  }
};

export const getCert = async (req, res) => {
  try {
    const doc = await Certification.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: 'Failed to get certification' });
  }
};

export const createCert = async (req, res) => {
  try {
    const b = req.body || {};
    const file = req.file;

    const payload = {
      title: b.title,
      href: b.href || '',
      order: Number(b.order ?? 0),
      isActive: toBool(b.isActive),
    };

    if (file?.path) {
      payload.image = file.path;
      payload.imagePublicId = file.filename;
    } else if (b.image) {
      payload.image = b.image;
      if (b.imagePublicId) payload.imagePublicId = b.imagePublicId;
    } else {
      return res.status(400).json({ message: 'Image is required' });
    }

    const doc = await Certification.create(payload);
    res.status(201).json(doc);
  } catch (e) {
    console.error('[cert:create]', util.inspect(e, { depth: 4 }));
    res.status(500).json({ message: 'Failed to create certification' });
  }
};

export const updateCert = async (req, res) => {
  try {
    const b = req.body || {};
    const file = req.file;

    const doc = await Certification.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });

    if (typeof b.title !== 'undefined') doc.title = b.title;
    if (typeof b.href !== 'undefined') doc.href = b.href;
    if (typeof b.order !== 'undefined') doc.order = Number(b.order ?? 0);
    if (typeof b.isActive !== 'undefined') doc.isActive = toBool(b.isActive);

    if (file?.path) {
      if (doc.imagePublicId) {
        try { await cloudinary.uploader.destroy(doc.imagePublicId); } catch {}
      }
      doc.image = file.path;
      doc.imagePublicId = file.filename;
    } else if (b.image) {
      doc.image = b.image;
      if (b.imagePublicId) doc.imagePublicId = b.imagePublicId;
    }

    await doc.save();
    res.json(doc);
  } catch (e) {
    console.error('[cert:update]', e);
    res.status(500).json({ message: 'Failed to update certification' });
  }
};

export const deleteCert = async (req, res) => {
  try {
    const doc = await Certification.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    if (doc.imagePublicId) {
      try { await cloudinary.uploader.destroy(doc.imagePublicId); } catch {}
    }
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: 'Failed to delete certification' });
  }
};

export const reorderCerts = async (req, res) => {
  try {
    const { order = [] } = req.body; // [{_id, order}]
    await Promise.all(order.map(({ _id, order }) =>
      Certification.updateOne({ _id }, { $set: { order } })
    ));
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: 'Failed to reorder certifications' });
  }
};
