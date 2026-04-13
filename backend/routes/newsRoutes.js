// routes/newsRoutes.js
import { Router } from 'express';
import adminAuth from '../middlewares/adminAuth.middleware.js';
import upload from '../config/multer.config.js';
import {
  listPublicNews, getPublicBySlug, getActiveSlugs,
  listAllNews, createNews, updateNews, toggleNews, removeNews
} from '../controllers/newsController.js';

const router = Router();

// Public
router.get('/', listPublicNews);
router.get('/slug/:slug', getPublicBySlug);
router.get('/slugs', getActiveSlugs);

// Admin
router.get('/admin', adminAuth, listAllNews);
router.post('/', adminAuth, upload.single('image'), createNews);
router.put('/:id', adminAuth, upload.single('image'), updateNews);
router.patch('/:id/toggle', adminAuth, toggleNews);
router.delete('/:id', adminAuth, removeNews);

router.get('/slugs', async (req, res) => {
  try {
    const docs = await News.find({ isActive: true })
      .select({ slug: 1, _id: 0 })
      .lean();

    res.json(docs.map(d => d.slug));
  } catch (e) {
    res.status(500).json({ message: 'Failed to load slugs' });
  }
})

export default router;
