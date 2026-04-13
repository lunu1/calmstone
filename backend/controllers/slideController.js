import Slide from '../models/Slide.js';

// Create
export const createSlide = async (req, res) => {
  try {
    const { image, heading, subheading, order, isActive } = req.body;
    if (!image || !heading || !subheading) {
      return res.status(400).json({ message: 'image, heading, and subheading are required' });
    }

    // if no order provided, append to end
    let finalOrder = order;
    if (finalOrder === undefined || finalOrder === null) {
      const last = await Slide.findOne().sort({ order: -1 }).lean();
      finalOrder = last ? (Number(last.order) + 1) : 0;
    }

    const slide = await Slide.create({
      image, heading, subheading,
      order: Number(finalOrder) || 0,
      isActive: isActive !== undefined ? !!isActive : true,
    });

    res.status(201).json(slide);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Read list
export const getSlides = async (req, res) => {
  try {
    const { active, limit } = req.query;
    const filter = {};
    if (active === 'true') filter.isActive = true;

    const q = Slide.find(filter).sort({ order: 1, createdAt: -1 });
    if (limit) q.limit(Number(limit));

    const slides = await q.exec();
    res.json(slides);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Read by id
export const getSlideById = async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);
    if (!slide) return res.status(404).json({ message: 'Not found' });
    res.json(slide);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Update
export const updateSlide = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.order !== undefined) payload.order = Number(payload.order);

    const slide = await Slide.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });
    if (!slide) return res.status(404).json({ message: 'Not found' });
    res.json(slide);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Delete
export const deleteSlide = async (req, res) => {
  try {
    const deleted = await Slide.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Bulk reorder: body = [{ _id, order }, ...]
export const reorderSlides = async (req, res) => {
  try {
    const updates = Array.isArray(req.body) ? req.body : [];
    if (!updates.length) return res.status(400).json({ message: 'Provide an array of {_id, order}' });

    const ops = updates.map(u => ({
      updateOne: {
        filter: { _id: u._id },
        update: { $set: { order: Number(u.order) || 0 } },
      },
    }));

    const result = await Slide.bulkWrite(ops);
    res.json({ ok: true, modified: result.modifiedCount ?? result.nModified });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// Toggle active
export const toggleActive = async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);
    if (!slide) return res.status(404).json({ message: 'Not found' });

    slide.isActive = !slide.isActive;
    await slide.save();
    res.json(slide);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
