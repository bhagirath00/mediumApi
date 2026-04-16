
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = `${process.env.DATABASE_URL}`;

async function main() {
  console.log('Seeding database...');
  const pool = new pg.Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const post1 = await prisma.post.upsert({
      where: { slug: 'welcome-to-my-blog' },
      update: {},
      create: {
        title: 'Welcome to my Blog',
        slug: 'welcome-to-my-blog',
        publishedAt: new Date(),
        hash: 'initial-hash-1',
        url: 'https://medium.com/@bhagirath/welcome',
        content: 'This is my first post synced from Medium!',
        mediumUsername: 'Bhagirath00',
        tags: {
          create: [
            { name: 'Introduction' },
            { name: 'Tech' }
          ]
        }
      }
    });

    console.log('✅ Seeded:', post1.title);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
