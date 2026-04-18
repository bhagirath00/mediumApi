import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username')?.toLowerCase();

  
  const where = username ? { mediumUsername: username } : {};

  try {
    const totalPosts = await prisma.post.count({ where });
    const lastUpdated = await prisma.post.findFirst({ 
      where,
      orderBy: { updatedAt: 'desc' } 
    });

    return NextResponse.json({
      totalPosts,
      lastUpdated: lastUpdated?.updatedAt || null,
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
