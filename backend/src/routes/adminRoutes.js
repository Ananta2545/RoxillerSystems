import express from 'express';
import {
  getDashboardStats,
  createUser,
  createStore,
  getUsers,
  getStores,
  getUserById
} from '../controllers/adminController.js';
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/dashboard', getDashboardStats);
router.post('/users', createUser);
router.post('/stores', createStore);
router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.get('/stores', getStores);

export default router;
