import { Router } from 'express';
import adminAuth from '../middlewares/adminAuth.middleware.js';
import {
  createSlide,
  getSlides,
  getSlideById,
  updateSlide,
  deleteSlide,
  reorderSlides,
  toggleActive,
} from '../controllers/slideController.js';

const router = Router();

// Public reads
router.get('/', getSlides);

// Admin-only utility routes (define BEFORE /:id to avoid conflicts)
router.put('/reorder', adminAuth, reorderSlides);     // bulk reorder [{ _id, order }]
router.patch('/:id/toggle', adminAuth, toggleActive); // flip isActive

// Admin CRUD
router.get('/:id', getSlideById);
router.post('/', adminAuth, createSlide);
router.put('/:id', adminAuth, updateSlide);
router.delete('/:id', adminAuth, deleteSlide);

export default router;
