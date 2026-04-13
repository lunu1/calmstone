// routes/authRoutes.js
import { Router } from 'express';
import { login, logout, me, register } from '../controllers/authController.js';
import adminAuth from '../middlewares/adminAuth.middleware.js';

const router = Router();

router.post('/register', register);        // seed once, then disable in prod
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', adminAuth, me);

export default router;
