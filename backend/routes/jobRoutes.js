// routes/jobRoutes.js
import { Router } from 'express';
import adminAuth from '../middlewares/adminAuth.middleware.js';
import upload from '../config/multer.config.js';
import {
  listPublicJobs, getBySlugPublic,
  listAllJobs, createJob, updateJob, toggleJob, removeJob
} from '../controllers/jobController.js';

const router = Router();

// Public
router.get('/', listPublicJobs);
router.get('/slug/:slug', getBySlugPublic);

// Admin
router.get('/admin', adminAuth, listAllJobs);
router.post('/', adminAuth, upload.single('image'), createJob);
router.put('/:id', adminAuth, upload.single('image'), updateJob);
router.patch('/:id/toggle', adminAuth, toggleJob);
router.delete('/:id', adminAuth, removeJob);

export default router;
