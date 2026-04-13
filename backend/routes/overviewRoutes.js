import { Router } from 'express';
import { getOverview, upsertOverview } from '../controllers/overviewController.js';
import adminAuth from '../middlewares/adminAuth.middleware.js';

const router = Router();
router.get('/', getOverview);          // public read
router.put('/', adminAuth, upsertOverview); // admin write
export default router;
