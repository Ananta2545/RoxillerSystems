import prisma from '../config/db.js';

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        store: {
          include: {
            ratings: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true
                  }
                }
              },
              orderBy: {
                createdAt: 'desc'
              }
            }
          }
        }
      }
    });

    if (!user || !user.store) {
      return res.status(404).json({ error: 'Store not found' });
    }

    const ratings = user.store.ratings;
    const avgRating = ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : 0;

    const ratingsWithUsers = ratings.map(r => ({
      id: r.id,
      rating: r.rating,
      createdAt: r.createdAt,
      user: r.user
    }));

    res.json({
      store: {
        id: user.store.id,
        name: user.store.name,
        email: user.store.email,
        address: user.store.address
      },
      averageRating: Math.round(avgRating * 10) / 10,
      totalRatings: ratings.length,
      ratings: ratingsWithUsers
    });
  } catch (error) {
    console.error('Store dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
