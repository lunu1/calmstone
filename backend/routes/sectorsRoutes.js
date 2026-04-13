import upload from '../config/multer.config.js';
import { Router } from 'express';
import adminAuth from '../middlewares/adminAuth.middleware.js';
import {
  createSector,
  getSectors,
  getSectorById,
  updateSector,
  deleteSector,
} from '../controllers/sectorsController.js';

const router = Router();

// Public reads
router.get('/', getSectors);
router.get('/:id', getSectorById);

// Admin writes (now accept multipart form with field name "image")
router.post('/', adminAuth, upload.single('image'), createSector);
router.put('/:id', adminAuth, upload.single('image'), updateSector);
router.delete('/:id', adminAuth, deleteSector);

export default router;
