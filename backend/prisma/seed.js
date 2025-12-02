import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Create an admin user
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@storerating.com' },
    update: {},
    create: {
      name: 'System Administrator User Account',
      email: 'admin@storerating.com',
      password: adminPassword,
      address: '123 Admin Street, Admin City, State 12345, Country',
      role: 'ADMIN'
    }
  });

  console.log('Created admin user:', admin.email);

  // Create some store owners with their stores
  const store1Password = await bcrypt.hash('Store@123', 10);
  const store1Owner = await prisma.user.upsert({
    where: { email: 'techstore@example.com' },
    update: {},
    create: {
      name: 'Tech Electronics Store Owner Account',
      email: 'techstore@example.com',
      password: store1Password,
      address: '456 Tech Avenue, Silicon Valley, CA 94025, United States',
      role: 'STORE_OWNER',
      store: {
        create: {
          name: 'Tech Electronics Store',
          email: 'techstore@example.com',
          address: '456 Tech Avenue, Silicon Valley, CA 94025, United States'
        }
      }
    }
  });

  console.log('Created store owner 1:', store1Owner.email);

  const store2Password = await bcrypt.hash('Fashion@123', 10);
  const store2Owner = await prisma.user.upsert({
    where: { email: 'fashionboutique@example.com' },
    update: {},
    create: {
      name: 'Fashion Boutique Store Manager Account',
      email: 'fashionboutique@example.com',
      password: store2Password,
      address: '789 Fashion Boulevard, New York, NY 10001, United States',
      role: 'STORE_OWNER',
      store: {
        create: {
          name: 'Fashion Boutique Store',
          email: 'fashionboutique@example.com',
          address: '789 Fashion Boulevard, New York, NY 10001, United States'
        }
      }
    }
  });

  console.log('Created store owner 2:', store2Owner.email);

  const store3Password = await bcrypt.hash('Books@123', 10);
  const store3Owner = await prisma.user.upsert({
    where: { email: 'bookstore@example.com' },
    update: {},
    create: {
      name: 'Downtown Bookstore Owner Management Account',
      email: 'bookstore@example.com',
      password: store3Password,
      address: '321 Library Street, Boston, MA 02108, United States',
      role: 'STORE_OWNER',
      store: {
        create: {
          name: 'Downtown Bookstore',
          email: 'bookstore@example.com',
          address: '321 Library Street, Boston, MA 02108, United States'
        }
      }
    }
  });

  console.log('Created store owner 3:', store3Owner.email);

  // Create some regular users
  const user1Password = await bcrypt.hash('User@123', 10);
  const user1 = await prisma.user.upsert({
    where: { email: 'john.doe@example.com' },
    update: {},
    create: {
      name: 'John Doe Regular Customer User Account',
      email: 'john.doe@example.com',
      password: user1Password,
      address: '555 Customer Lane, Los Angeles, CA 90001, United States',
      role: 'USER'
    }
  });

  console.log('Created regular user 1:', user1.email);

  const user2Password = await bcrypt.hash('User@456', 10);
  const user2 = await prisma.user.upsert({
    where: { email: 'jane.smith@example.com' },
    update: {},
    create: {
      name: 'Jane Smith Premium Customer User Account',
      email: 'jane.smith@example.com',
      password: user2Password,
      address: '777 Shopper Street, Miami, FL 33101, United States',
      role: 'USER'
    }
  });

  console.log('Created regular user 2:', user2.email);

  // Create some sample ratings
  const stores = await prisma.store.findMany();
  
  if (stores.length > 0) {
    // User 1 rates all stores
    await prisma.rating.create({
      data: {
        rating: 5,
        userId: user1.id,
        storeId: stores[0].id
      }
    });
    
    if (stores.length > 1) {
      await prisma.rating.create({
        data: {
          rating: 4,
          userId: user1.id,
          storeId: stores[1].id
        }
      });
    }
    
    if (stores.length > 2) {
      await prisma.rating.create({
        data: {
          rating: 3,
          userId: user1.id,
          storeId: stores[2].id
        }
      });
    }
    
    // User 2 rates some stores
    await prisma.rating.create({
      data: {
        rating: 4,
        userId: user2.id,
        storeId: stores[0].id
      }
    });
    
    if (stores.length > 1) {
      await prisma.rating.create({
        data: {
          rating: 5,
          userId: user2.id,
          storeId: stores[1].id
        }
      });
    }
    
    console.log('Created sample ratings');
  }

  console.log('Database seeding completed successfully!');
  console.log('\nLogin Credentials:');
  console.log('===================');
  console.log('\nAdmin:');
  console.log('  Email: admin@storerating.com');
  console.log('  Password: Admin@123');
  console.log('\nStore Owners:');
  console.log('  1. Email: techstore@example.com | Password: Store@123');
  console.log('  2. Email: fashionboutique@example.com | Password: Fashion@123');
  console.log('  3. Email: bookstore@example.com | Password: Books@123');
  console.log('\nRegular Users:');
  console.log('  1. Email: john.doe@example.com | Password: User@123');
  console.log('  2. Email: jane.smith@example.com | Password: User@456');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
