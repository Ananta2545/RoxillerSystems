import bcrypt from 'bcrypt';
import prisma from '../config/db.js';
import { validateUserData } from '../utils/validation.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalStores = await prisma.store.count();
    const totalRatings = await prisma.rating.count();

    res.json({
      totalUsers,
      totalStores,
      totalRatings
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const validationErrors = validateUserData({ name, email, password, address });
    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors });
    }

    if (!['ADMIN', 'USER'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
        role
      }
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createStore = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    const validationErrors = validateUserData({ name, email, password, address });
    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const existingStore = await prisma.store.findUnique({ where: { email } });
    if (existingStore) {
      return res.status(400).json({ error: 'Store email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
        role: 'STORE_OWNER',
        store: {
          create: {
            name,
            email,
            address
          }
        }
      },
      include: { store: true }
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
      store: user.store
    });
  } catch (error) {
    console.error('Create store error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { name, email, address, role, sortBy = 'name', sortOrder = 'asc' } = req.query;

    const where = {};
    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (email) where.email = { contains: email, mode: 'insensitive' };
    if (address) where.address = { contains: address, mode: 'insensitive' };
    if (role) where.role = role;

    const users = await prisma.user.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        store: {
          select: {
            id: true,
            name: true,
            ratings: {
              select: {
                rating: true
              }
            }
          }
        }
      }
    });

    const usersWithRating = users.map(user => {
      if (user.role === 'STORE_OWNER' && user.store) {
        const ratings = user.store.ratings;
        const avgRating = ratings.length > 0
          ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
          : 0;
        return {
          ...user,
          rating: Math.round(avgRating * 10) / 10
        };
      }
      return user;
    });

    res.json(usersWithRating);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getStores = async (req, res) => {
  try {
    const { name, email, address, sortBy = 'name', sortOrder = 'asc' } = req.query;

    const where = {};
    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (email) where.email = { contains: email, mode: 'insensitive' };
    if (address) where.address = { contains: address, mode: 'insensitive' };

    const stores = await prisma.store.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      include: {
        ratings: {
          select: {
            rating: true
          }
        }
      }
    });

    const storesWithRating = stores.map(store => {
      const avgRating = store.ratings.length > 0
        ? store.ratings.reduce((sum, r) => sum + r.rating, 0) / store.ratings.length
        : 0;
      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        rating: Math.round(avgRating * 10) / 10
      };
    });

    res.json(storesWithRating);
  } catch (error) {
    console.error('Get stores error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        store: {
          include: {
            ratings: {
              select: {
                rating: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const response = {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role
    };

    if (user.role === 'STORE_OWNER' && user.store) {
      const ratings = user.store.ratings;
      const avgRating = ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
        : 0;
      response.rating = Math.round(avgRating * 10) / 10;
    }

    res.json(response);
  } catch (error) {
    console.error('Get user by id error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
