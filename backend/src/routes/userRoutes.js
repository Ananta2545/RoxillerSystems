import express from 'express';
import { getStores, submitRating } from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/stores', getStores);
router.post('/ratings', submitRating);

export default router;
