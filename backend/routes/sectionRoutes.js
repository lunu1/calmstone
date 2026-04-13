import { Router } from 'express';
import adminAuth from '../middlewares/adminAuth.middleware.js';
import {
  createSection,
  getSections,
  getSectionById,
  updateSection,
  deleteSection,
} from '../controllers/sectionController.js';

const router = Router();

// Public reads
router.get('/', getSections);          // /api/sections?type=about&active=true
router.get('/:id', getSectionById);

// Admin writes
router.post('/', adminAuth, createSection);
router.put('/:id', adminAuth, updateSection);
router.delete('/:id', adminAuth, deleteSection);

export default router;
