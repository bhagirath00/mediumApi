import { NextResponse } from 'next/server';
import { fetchAndSyncMediumFeed } from '@/lib/rss-parser';


export async function POST(request: Request) {
  try {
    const { username } = await request.json();


    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const cleanUsername = username.toLowerCase().replace('@', '').trim();
    await fetchAndSyncMediumFeed(cleanUsername);


    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sync Error:', error);
    return NextResponse.json({ error: 'Failed to sync feed' }, { status: 500 });
  }
}
