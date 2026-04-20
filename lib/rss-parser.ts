
import Parser from 'rss-parser';
import { prisma } from './prisma';

const parser = new Parser({
  customFields: {
    item: ['content:encoded', 'dc:creator'],
  }
});

export async function fetchAndSyncMediumFeed(username: string) {
  const feed = await parser.parseURL(`https://medium.com/feed/@${username}`);
  
  for (const item of feed.items) {
    const slug = item.link?.split('/').pop()?.split('?')[0] || item.guid || '';
    const content = item['content:encoded'] || item.content || '';
    
    // Simple thumbnail extraction from content
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const thumbnail = content.match(imgRegex)?.[1] || '';
    
    // Simple excerpt extraction (strip HTML)
    const excerpt = content.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...';

    await prisma.post.upsert({
      where: { slug },
      update: {
        title: item.title || 'No Title',
        content: content,
        excerpt: excerpt,
        publishedAt: new Date(item.pubDate || Date.now()),
        thumbnail: thumbnail,
        mediumUsername: username,
      },
      create: {
        slug,
        title: item.title || 'No Title',
        content: content,
        excerpt: excerpt,
        publishedAt: new Date(item.pubDate || Date.now()),
        url: item.link || '',
        hash: 'sync-hash',
        thumbnail: thumbnail,
        mediumUsername: username,
      },
    });

  }
  
  return feed.items.length;
}
