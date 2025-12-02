import express from 'express';
import { getDashboard } from '../controllers/storeController.js';
import { authMiddleware, storeOwnerMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.use(storeOwnerMiddleware);

router.get('/dashboard', getDashboard);

export default router;
