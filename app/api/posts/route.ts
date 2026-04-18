import { NextResponse } from 'next/server';
import { fetchAndSyncMediumFeed } from '../../../rss-parser';
import { prisma } from '../../../db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';
  const tag = searchParams.get('tag');
  const sort = searchParams.get('sort') || 'latest';

  const where = tag ? { tags: { some: { name: tag } } } : {};
  const orderBy = sort === 'latest' ? { publishedAt: 'desc' as const } : { publishedAt: 'asc' as const };

  try {
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy,
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
        include: { tags: true },
      }),
      prisma.post.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
