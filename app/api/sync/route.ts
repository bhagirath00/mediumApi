import { NextResponse } from 'next/server';
import { fetchAndSyncMediumFeed } from '../../../rss-parser';

export async function POST(request: Request) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    await fetchAndSyncMediumFeed(username);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Sync Error:', error);
    return NextResponse.json({ error: 'Failed to sync feed' }, { status: 500 });
  }
}
