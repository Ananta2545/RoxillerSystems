import prisma from '../config/db.js';

export const getStores = async (req, res) => {
  try {
    const { name, address, sortBy = 'name', sortOrder = 'asc' } = req.query;
    const userId = req.user.id;

    const where = {};
    if (name) where.name = { contains: name, mode: 'insensitive' };
    if (address) where.address = { contains: address, mode: 'insensitive' };

    const stores = await prisma.store.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      include: {
        ratings: {
          select: {
            rating: true,
            userId: true
          }
        }
      }
    });

    const storesWithRating = stores.map(store => {
      const avgRating = store.ratings.length > 0
        ? store.ratings.reduce((sum, r) => sum + r.rating, 0) / store.ratings.length
        : 0;
      
      const userRating = store.ratings.find(r => r.userId === userId);

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        rating: Math.round(avgRating * 10) / 10,
        userRating: userRating ? userRating.rating : null
      };
    });

    res.json(storesWithRating);
  } catch (error) {
    console.error('Get stores error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    const userId = req.user.id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const store = await prisma.store.findUnique({ where: { id: storeId } });
    if (!store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    const existingRating = await prisma.rating.findUnique({
      where: {
        userId_storeId: {
          userId,
          storeId
        }
      }
    });

    let result;
    if (existingRating) {
      result = await prisma.rating.update({
        where: {
          userId_storeId: {
            userId,
            storeId
          }
        },
        data: { rating }
      });
    } else {
      result = await prisma.rating.create({
        data: {
          rating,
          userId,
          storeId
        }
      });
    }

    res.json({
      id: result.id,
      rating: result.rating,
      message: existingRating ? 'Rating updated successfully' : 'Rating submitted successfully'
    });
  } catch (error) {
    console.error('Submit rating error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
