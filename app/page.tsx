'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, BookOpen, Calendar } from 'lucide-react';

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState('blogs');

  const fetchData = async (targetUser?: string) => {
    setLoading(true);
    try {
      const postsUrl = targetUser ? `/api/posts?limit=10&username=${targetUser}` : '/api/posts?limit=10';
      const res = await fetch(postsUrl);
      const data = await res.json();
      setRecentPosts(data.posts || []);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    const cleanUsername = username.toLowerCase().replace('@', '').trim();
    setSyncing(true);
    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUsername }),
      });
      if (res.ok) await fetchData(cleanUsername);
      else alert('Sync failed. Please check the username.');
    } catch (err) {
      alert('Sync failed: Network error');
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div
      className={`relative w-full flex flex-col items-center px-6 selection:bg-blue-100 font-sans transition-all duration-700 ${
        recentPosts.length > 0
          ? 'min-h-[calc(100vh-4rem)] justify-start pt-12 pb-24'
          : 'h-[calc(100vh-4rem)] justify-center overflow-hidden'
      }`}
    >
      {/* 1. Global Noise Texture */}
      <div
        className="fixed inset-0 opacity-[0.08] pointer-events-none z-50 mix-blend-multiply"
        style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}
      />

      {/* 2. Ambient Lighting: Upper area stays faded pure white; downside has the rich blue crescent */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[60vw] max-w-[600px] h-[120px] bg-sky-200/10 blur-[70px] rounded-full -z-10 pointer-events-none" />
      <div className="fixed bottom-[-8%] left-1/2 -translate-x-1/2 w-[120vw] max-w-[1300px] h-[480px] bg-gradient-to-t from-sky-400/50 via-blue-500/35 to-transparent blur-[85px] rounded-[100%] -z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[70vw] max-w-[800px] h-[220px] bg-blue-400/35 blur-[70px] rounded-full -z-10 pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-3xl px-4 sm:px-6 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
        
        {/* LIQUID GLASS SEARCH PILL */}
        <form onSubmit={handleSync} className={`flex justify-center transition-all duration-500 ${recentPosts.length > 0 ? 'mb-10' : 'mb-0'}`}>
          <div className="relative group w-full max-w-[560px]">
            {/* Ambient Liquid Aura */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-400/20 via-blue-400/15 to-indigo-400/20 rounded-[34px] blur-xl opacity-70 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-700 pointer-events-none" />

            {/* Outer Liquid Glass Capsule */}
            <div className="relative flex items-center bg-white/45 backdrop-blur-2xl border border-white/90 rounded-[26px] h-[72px] p-[6px] shadow-[inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(0,0,0,0.03),0_20px_50px_-10px_rgba(14,116,144,0.12),0_4px_24px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_28px_65px_-12px_rgba(30,157,241,0.22)] group-focus-within:border-white group-focus-within:shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_30px_70px_-10px_rgba(30,157,241,0.25)]">
              {/* Inner Translucent Liquid Glass Input Track */}
              <div className="flex-1 flex items-center bg-white/60 backdrop-blur-xl border border-white/80 rounded-[20px] h-full px-6 overflow-hidden shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.85),inset_0_2px_6px_rgba(0,0,0,0.02)] transition-all duration-300 group-focus-within:bg-white/80 group-focus-within:border-white">
                <span className="text-zinc-400 font-medium text-[17px] mr-0.5 pointer-events-none select-none">medium.com/@</span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  className="flex-1 bg-transparent border-none outline-none text-[17px] text-zinc-800 placeholder:text-zinc-300 font-medium"
                  required
                />
              </div>
              {/* Glossy Liquid Blue Action Button */}
              <button
                type="submit"
                disabled={syncing}
                className="ml-2 w-[46px] h-[46px] bg-gradient-to-b from-[#38bdf8] via-[#0284c7] to-[#0369a1] border border-white/50 text-white rounded-[18px] flex items-center justify-center transition-all shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.6),0_8px_20px_rgba(2,132,199,0.35)] hover:shadow-[inset_0_2px_3px_rgba(255,255,255,0.8),0_12px_28px_rgba(2,132,199,0.45)] hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {syncing ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Results Flow */}
        {recentPosts.length > 0 && (
          <div className="w-full transition-all duration-700 animate-fade-in space-y-4">
            {recentPosts.map((post) => (
              <a
                key={post.id}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block bg-white/40 hover:bg-white/60 backdrop-blur-2xl border border-white/80 hover:border-white rounded-[26px] p-5 sm:p-6 shadow-[inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(0,0,0,0.03),0_16px_40px_-12px_rgba(30,157,241,0.12),0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[inset_0_2px_4px_rgba(255,255,255,1),0_24px_60px_-10px_rgba(30,157,241,0.22)] hover:-translate-y-1 transition-all duration-500"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start sm:items-center">
                  {/* Thumbnail */}
                  <div className="w-full sm:w-44 h-36 sm:h-28 rounded-[18px] overflow-hidden flex-shrink-0 bg-white/50 backdrop-blur-md border border-white/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7)] relative">
                    {post.thumbnail ? (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/40 to-sky-100/30 text-zinc-300">
                        <BookOpen size={24} className="text-zinc-400 group-hover:text-blue-500 transition-colors" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 w-full flex flex-col justify-between">
                    {/* Meta header */}
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[12px] font-semibold text-blue-600 bg-white/70 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] truncate">
                          @{post.mediumUsername}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-zinc-300/80 flex-shrink-0" />
                        <span className="text-[11px] text-zinc-400 font-medium flex items-center gap-1 flex-shrink-0">
                          <Calendar size={12} className="text-zinc-400" />
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>

                      <div className="w-8 h-8 rounded-[14px] bg-white/60 group-hover:bg-blue-500 border border-white/80 group-hover:border-blue-400 flex items-center justify-center flex-shrink-0 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] group-hover:shadow-[0_4px_12px_rgba(30,157,241,0.35)]">
                        <ArrowUpRight
                          size={15}
                          className="text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                        />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-[17px] font-bold text-zinc-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-1.5">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-xs sm:text-[13px] text-zinc-500 line-clamp-2 leading-relaxed font-normal">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>


      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;900&display=swap');
        body {
          font-family: 'Inter Tight', sans-serif;
          background-color: #fdfdfd;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}
