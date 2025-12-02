import express from 'express';
import { signup, login, updatePassword, setupFirstAdmin } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.put('/update-password', authMiddleware, updatePassword);
router.post('/setup-admin', setupFirstAdmin);

export default router;
