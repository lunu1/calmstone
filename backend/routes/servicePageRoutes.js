import { Router } from 'express';
import { listActiveSlugs } from '../controllers/servicePageController.js';
import adminAuth from '../middlewares/adminAuth.middleware.js';
import upload from '../config/multer.config.js';
import {
  getBySlug, listPages, createPage, updatePage, deletePage,
  addSection, updateSection, deleteSection,servicesMenu
} from '../controllers/servicePageController.js';

const router = Router();

// Public
router.get('/slug/:slug', getBySlug);

// Admin
router.get('/', adminAuth, listPages);
router.get('/slugs', listActiveSlugs); //
router.post('/', adminAuth, createPage);
router.put('/:id', adminAuth, updatePage);
router.delete('/:id', adminAuth, deletePage);
router.get('/menu', servicesMenu);

router.post('/:id/sections', adminAuth, upload.single('image'), addSection);
router.put('/:id/sections/:secId', adminAuth, upload.single('image'), updateSection);
router.delete('/:id/sections/:secId', adminAuth, deleteSection);


export default router;
