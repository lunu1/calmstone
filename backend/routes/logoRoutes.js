import { Router } from 'express';
import adminAuth from '../middlewares/adminAuth.middleware.js';
import upload from '../config/multer.config.js';
import {
  listLogos, getLogo, createLogo, updateLogo, deleteLogo, reorderLogos
} from '../controllers/logoController.js';

const router = Router();

// Public
router.get('/', listLogos);
router.get('/:id', getLogo);

// Admin
router.post('/', adminAuth, upload.single('image'), createLogo);
router.put('/:id', adminAuth, upload.single('image'), updateLogo);
router.delete('/:id', adminAuth, deleteLogo);
router.patch('/reorder', adminAuth, reorderLogos);

export default router;
