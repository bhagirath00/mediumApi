import { NextResponse } from 'next/server';
import { prisma } from '../../../db';

export async function GET() {
  try {
    const totalPosts = await prisma.post.count();
    const lastUpdated = await prisma.post.findFirst({ orderBy: { updatedAt: 'desc' } });

    return NextResponse.json({
      totalPosts,
      lastUpdated: lastUpdated?.updatedAt || null,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
