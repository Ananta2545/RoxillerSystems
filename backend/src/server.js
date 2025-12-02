import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import storeRoutes from './routes/storeRoutes.js';

dotenv.config();

const app = express();

// CORS configuration - must be before routes
app.use(cors({
  origin: ['https://roxiller-systems-xe4x.vercel.app', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/store', storeRoutes);

// I am handling middle ware errors here
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

// Only start server if not in serverless environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
