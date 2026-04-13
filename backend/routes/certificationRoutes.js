import { Router } from 'express';
import adminAuth from '../middlewares/adminAuth.middleware.js';
import upload from '../config/multer.config.js';
import {
  listCerts, getCert, createCert, updateCert, deleteCert, reorderCerts
} from '../controllers/certificationController.js';

const router = Router();

router.get('/', listCerts);
router.get('/:id', getCert);

router.post('/', adminAuth, upload.single('image'), createCert);
router.put('/:id', adminAuth, upload.single('image'), updateCert);
router.delete('/:id', adminAuth, deleteCert);
router.patch('/reorder', adminAuth, reorderCerts);

export default router;
