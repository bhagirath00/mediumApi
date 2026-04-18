'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [stats, setStats] = useState<{ totalPosts: number; lastUpdated: string | null }>({
    totalPosts: 0,
    lastUpdated: null,
  });
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      if (!res.ok) throw new Error('Backend unreachable');
      const data = await res.json();
      setStats(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch stats:', err);
      setError('Cannot connect to API server');
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!username) {
      alert('Please enter a Medium username');
      return;
    }

    const cleanUsername = username.replace('@', '').trim();
    setSyncing(true);
    try {
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUsername }),
      });
      if (res.ok) {
        await fetchStats();
        alert(`Successfully synced ${cleanUsername}!`);
      } else {
        const data = await res.json();
        alert(`Sync failed: ${data.error || 'Server error'}`);
      }
    } catch (err) {
      alert('Sync failed: Network error');
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-32">
      {/* Hero Section */}
      <section className="space-y-12 text-center py-12">
        <div className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gradient leading-[0.95]">
            AGGREGATE YOUR <br />
            <span className="text-cyan-500">MEDIUM ENGINE.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-2xl leading-relaxed max-w-2xl mx-auto">
            A high-performance RSS-to-JSON normalization engine.
            Sync your Medium blog in seconds.
          </p>
        </div>

        <form onSubmit={handleSync} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto p-3 glass-card rounded-2xl bg-white/[0.01]">
          <div className="relative flex-1">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 font-mono text-xs">medium.com/@</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className="w-full bg-transparent border-none rounded-xl py-4 pl-36 pr-6 text-white placeholder-gray-700 focus:ring-0 transition-all font-mono text-sm"
              required
            />
          </div>
          <button
            type="submit"
            disabled={syncing}
            className={`px-10 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all ${syncing
              ? 'bg-white/5 text-gray-500 cursor-not-allowed'
              : 'bg-cyan-500 text-black hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] hover:scale-[1.02]'
              }`}
          >
            {syncing ? 'SYNCING' : 'SYNC ENGINE'}
          </button>
        </form>

        <div className="pt-8">
          <Link href="/posts" className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-cyan-400 transition-all group">
            Browse Cached Articles
            <span className="h-px w-12 bg-white/10 group-hover:w-20 group-hover:bg-cyan-500 transition-all"></span>
          </Link>
        </div>
      </section>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="glass-card p-12 space-y-6 flex flex-col justify-center">
          <div className="text-[11px] uppercase tracking-[0.3em] font-black text-cyan-500/70">Database</div>
          <div className="space-y-1">
            <div className="text-7xl font-black tracking-tighter">
              {loading ? '...' : stats.totalPosts}
            </div>
            <div className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Normalized Posts</div>
          </div>
        </div>

        <div className="glass-card p-12 space-y-8 col-span-1 md:col-span-2">
          <div className="flex justify-between items-start">
            <div className="text-[11px] uppercase tracking-[0.3em] font-black text-gray-500">Engine Status</div>
            <div className="flex items-center gap-3 px-3 py-1.5 bg-green-500/5 rounded-full border border-green-500/20 text-[10px] font-black text-green-500 uppercase tracking-widest">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              Operational
            </div>
          </div>
          <div className="space-y-6">
            <div className="text-2xl font-bold tracking-tight">Latest Sync Cycle</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 font-mono text-[10px] uppercase tracking-widest">
              <div className="space-y-2 border-l border-white/5 pl-6">
                <div className="text-gray-600">Sync Timestamp</div>
                <div className="text-gray-300 text-sm font-bold">{loading ? '---' : (stats.lastUpdated ? new Date(stats.lastUpdated).toLocaleDateString() : 'Never')}</div>
              </div>
              <div className="space-y-2 border-l border-white/5 pl-6">
                <div className="text-gray-600">Response Latency</div>
                <div className="text-gray-300 text-sm font-bold">~240ms</div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-12 col-span-1 md:col-span-3 bg-gradient-to-br from-white/[0.03] to-cyan-500/[0.01]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
            <div className="space-y-4">
              <div className="text-xl font-bold tracking-tight">API Documentation Preview</div>
              <div className="text-sm text-gray-500 leading-relaxed max-w-2xl font-mono whitespace-pre-wrap break-all">
                {`$ curl -X GET https://mediumapi.app/api/posts?username=${username || 'medium'}
{
  "status": "success",
  "data": {
    "posts": [...],
    "count": ${stats.totalPosts}
  }
}`}
              </div>
            </div>
            <div className="flex items-center gap-6 w-full md:w-auto">
              <a href="/api/posts" target="_blank" className="flex-1 md:flex-none text-center font-mono text-[10px] px-8 py-4 border border-white/5 rounded-xl hover:bg-white/5 hover:border-cyan-500/30 transition-all uppercase tracking-[0.2em]">v1/posts</a>
              <a href="/api/stats" target="_blank" className="flex-1 md:flex-none text-center font-mono text-[10px] px-8 py-4 border border-white/5 rounded-xl hover:bg-white/5 hover:border-cyan-500/30 transition-all uppercase tracking-[0.2em]">v1/stats</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
