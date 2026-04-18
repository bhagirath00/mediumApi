'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
  readingTime: string;
  url: string;
  thumbnail: string | null;
  tags: { name: string }[];
}

export default function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/posts/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Post not found');
        return res.json();
      })
      .then((data) => setPost(data))
      .catch((err) => {
        console.error(err);
        setError('Post not found or API error');
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const [error, setError] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-20 space-y-4">
        <h1 className="text-3xl font-bold">404 - Post Not Found</h1>
        <p className="text-gray-400">The post you are looking for does not exist or has not been synced.</p>
        <Link href="/posts" className="text-cyan-500 hover:underline inline-block mt-4">Back to All Posts</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-12 pb-32 animate-fade-in">
      <Link href="/posts" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-cyan-500 transition-colors">
        <span className="mr-3">←</span> Back to Gallery
      </Link>

      <article className="space-y-8">
        <header className="space-y-6">
          <div className="flex gap-2">
            {post.tags.map((tag) => (
              <span key={tag.name} className="text-[10px] uppercase font-bold tracking-[0.15em] px-2.5 py-1 rounded bg-white/5 text-cyan-400/70 border border-white/5">
                {tag.name}
              </span>
            ))}
          </div>

          <h1 className="text-5xl font-black tracking-tighter leading-[1.1]">
            {post.title}
          </h1>

          <div className="flex items-center justify-between py-6 border-y border-white/5 text-xs text-gray-500 font-mono uppercase tracking-widest">
            <div className="flex gap-6">
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              <span>{post.readingTime}</span>
            </div>
            <a href={post.url} target="_blank" className="text-cyan-500 hover:text-cyan-400 transition-colors">
              Original Article ↗
            </a>
          </div>
        </header>

        {post.thumbnail && (
          <div className="glass-card overflow-hidden">
            <img src={post.thumbnail} alt={post.title} className="w-full aspect-video object-cover" />
          </div>
        )}

        <div className="prose prose-invert prose-cyan max-w-none prose-p:text-gray-300 prose-p:leading-relaxed prose-headings:text-white prose-headings:font-black prose-headings:tracking-tighter prose-a:text-cyan-500 prose-img:rounded-xl prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:overflow-x-auto prose-pre:max-w-full">
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="medium-content break-words whitespace-pre-wrap [&>p]:mb-8 [&>h2]:text-4xl [&>h2]:mt-16 [&>h2]:mb-8 [&>h2]:font-black [&>h2]:tracking-tighter [&>h3]:text-3xl [&>h3]:mt-12 [&>h3]:mb-6 [&>img]:my-16 [&>img]:mx-auto [&>img]:rounded-2xl [&>figure]:my-16 [&>figure]:mx-auto [&>figure>img]:rounded-2xl [&>ul]:list-disc [&>ul]:ml-8 [&>ul]:mb-10 [&>ol]:list-decimal [&>ol]:ml-8 [&>ol]:mb-10 [&>li]:mb-4 [&_pre]:overflow-x-auto [&_pre]:p-8 [&_pre]:rounded-2xl [&_pre]:bg-black/40 [&_pre]:border [&_pre]:border-white/5 [&_code]:font-mono [&_code]:text-cyan-400 [&_code]:break-all [&_code]:whitespace-pre-wrap"
          />
        </div>
      </article>

      <div className="pt-12 border-t border-white/5 flex justify-between items-center">
        <Link href="/posts" className="text-sm font-bold text-gray-400 hover:text-white transition-colors">
          Browse more articles
        </Link>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-[10px] uppercase tracking-widest text-gray-500 hover:text-cyan-500 transition-colors"
        >
          Back to Top ↑
        </button>
      </div>
    </div>
  );
}
