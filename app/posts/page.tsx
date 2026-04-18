'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  thumbnail: string | null;
  publishedAt: string;
  readingTime: string;
  tags: { name: string }[];
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20 max-w-5xl mx-auto px-4">
      <div className="space-y-4 animate-fade-in">
        <h1 className="text-5xl font-black tracking-tighter text-gradient leading-tight">
          LATEST BLOGS.
        </h1>
        <p className="text-gray-400 text-lg max-w-xl">
          A collection of synced posts discovered from your Medium feed.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="glass-card p-16 text-center text-gray-500 bg-white/5 border-dashed border-white/10">
          <p className="font-mono text-sm uppercase tracking-widest">No cached content found.</p>
          <Link href="/" className="text-cyan-500 hover:text-cyan-400 text-xs mt-4 inline-block underline underline-offset-4">
            Return to dashboard to sync →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.slug}`} className="block group">
              <article className="glass-card h-full flex flex-col overflow-hidden bg-white/[0.02]">
                {post.thumbnail && (
                  <div className="relative aspect-video w-full overflow-hidden bg-black/20">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                )}
                <div className="p-8 flex-1 flex flex-col space-y-4">
                  <div className="flex gap-2 flex-wrap">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag.name} className="text-[10px] uppercase font-bold tracking-[0.15em] px-2.5 py-1 rounded bg-white/5 text-gray-400 border border-white/5 group-hover:border-cyan-500/30 group-hover:text-cyan-400 transition-all">
                        {tag.name}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-2xl font-bold leading-tight group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-6 flex items-center justify-between text-[10px] uppercase tracking-widest text-gray-500 font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/40"></span>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      <div className="pt-8 border-t border-white/5">
        <Link href="/" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-cyan-500 hover:text-cyan-400 transition-colors">
          <span className="mr-3">←</span> Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
