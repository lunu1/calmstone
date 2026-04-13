// controllers/jobController.js
import Job from '../models/Jobs.js';

/* ------------------------------ PUBLIC READS ------------------------------ */

// GET /api/jobs?q=&department=&location=&type=
export const listPublicJobs = async (req, res) => {
  try {
    const { q, department, location, type } = req.query;
    const filter = { isActive: true };

    if (q) {
      filter.$or = [
        { title:       { $regex: q, $options: 'i' } },
        { department:  { $regex: q, $options: 'i' } },
        { location:    { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ];
    }
    if (department) filter.department = department;
    if (location)   filter.location   = location;
    if (type)       filter.type       = type;

    const jobs = await Job.find(filter)
      .sort({ postedAt: -1, createdAt: -1 })
      .lean();

    res.json(jobs);
  } catch (e) {
    res.status(500).json({ message: 'Failed to load jobs' });
  }
};

// GET /api/jobs/slug/:slug
export const getBySlugPublic = async (req, res) => {
  try {
    const doc = await Job.findOne({ slug: req.params.slug, isActive: true }).lean();
    if (!doc) return res.status(404).json({ message: 'Job not found' });
    res.json(doc);
  } catch {
    res.status(500).json({ message: 'Failed to fetch job' });
  }
};

/* --------------------------------- ADMIN --------------------------------- */

// GET /api/jobs/admin
export const listAllJobs = async (_req, res) => {
  try {
    const jobs = await Job.find({}).sort({ createdAt: -1 }).lean();
    res.json(jobs);
  } catch {
    res.status(500).json({ message: 'Failed to list jobs' });
  }
};

// POST /api/jobs  (supports multipart with image OR JSON with image url)
export const createJob = async (req, res) => {
  try {
    const body = req.body;
    // if multipart, responsibilities/requirements may arrive as JSON strings
    const responsibilities = parseMaybeJSON(body.responsibilities) ?? body.responsibilities ?? [];
    const requirements     = parseMaybeJSON(body.requirements)     ?? body.requirements     ?? [];
    const payload = {
      title: body.title,
      department: body.department,
      location: body.location,
      type: body.type,
      experience: body.experience,
      salary: body.salary,
      preference: body.preference,
      description: body.description,
      responsibilities,
      requirements,
      postedAt: body.postedAt ? new Date(body.postedAt) : new Date(),
      closingDate: body.closingDate ? new Date(body.closingDate) : null,
      slug: body.slug,
      image: req.file?.path || body.image || '',
      isActive: body.isActive !== 'false' && body.isActive !== false, // default true
      featured: body.featured === 'true' || body.featured === true,
    };

    const created = await Job.create(payload);
    res.status(201).json(created);
  } catch (e) {
    console.error('createJob err', e);
    res.status(500).json({ message: 'Failed to create job' });
  }
};

// PUT /api/jobs/:id  (supports multipart)
export const updateJob = async (req, res) => {
  try {
    const body = req.body;
    const responsibilities = parseMaybeJSON(body.responsibilities) ?? body.responsibilities;
    const requirements     = parseMaybeJSON(body.requirements)     ?? body.requirements;

    const update = {
      title:        body.title,
      department:   body.department,
      location:     body.location,
      type:         body.type,
      experience:   body.experience,
      salary:       body.salary,
      preference:   body.preference,
      description:  body.description,
      postedAt:     body.postedAt ? new Date(body.postedAt) : undefined,
      closingDate:  body.closingDate ? new Date(body.closingDate) : undefined,
      slug:         body.slug,
      isActive:     body.isActive === 'true' || body.isActive === true || body.isActive === undefined ? undefined : false,
      featured:     body.featured === 'true' || body.featured === true ? true : (body.featured === 'false' || body.featured === false ? false : undefined),
    };

    if (Array.isArray(responsibilities)) update.responsibilities = responsibilities;
    if (Array.isArray(requirements))     update.requirements     = requirements;
    if (req.file?.path)                  update.image            = req.file.path;
    if (body.image !== undefined && !req.file) update.image      = body.image;

    const updated = await Job.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updated) return res.status(404).json({ message: 'Job not found' });
    res.json(updated);
  } catch (e) {
    console.error('updateJob err', e);
    res.status(500).json({ message: 'Failed to update job' });
  }
};

// PATCH /api/jobs/:id/toggle
export const toggleJob = async (req, res) => {
  try {
    const doc = await Job.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Job not found' });
    doc.isActive = !doc.isActive;
    await doc.save();
    res.json({ success: true, isActive: doc.isActive });
  } catch {
    res.status(500).json({ message: 'Failed to toggle job' });
  }
};

// DELETE /api/jobs/:id
export const removeJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch {
    res.status(500).json({ message: 'Failed to delete job' });
  }
};

/* -------------------------------- Helpers -------------------------------- */
function parseMaybeJSON(v) {
  if (typeof v === 'string') {
    try { return JSON.parse(v); } catch { return undefined; }
  }
  return v;
}
