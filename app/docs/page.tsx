'use client';

import Link from 'next/link';

export default function DocsPage() {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://mediumblogsapi.vercel.app';

  const endpoints = [
    {
      method: 'GET',
      path: '/api/posts',
      params: '?username=medium',
      desc: 'Fetch all normalized posts for a specific Medium user.',
    },
    {
      method: 'GET',
      path: '/api/stats',
      params: '',
      desc: 'Get global engine statistics and database health.',
    },
    {
      method: 'POST',
      path: '/api/sync',
      params: '{ "username": "medium" }',
      desc: 'Trigger a fresh sync cycle for a specific user.',
    }
  ];

  return (
    <div className="space-y-20 max-w-4xl mx-auto py-10">
      <header className="space-y-4">
        <h1 className="text-5xl font-black tracking-tighter text-gradient">DOCUMENTATION.</h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          The Medium Engine provides a robust REST interface to fetch your normalized articles
          directly into your personal portfolio or project.
        </p>
      </header>

      <div className="space-y-12">
        <section className="space-y-6">
          <h2 className="text-xl font-bold uppercase tracking-widest text-cyan-500 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            Integration Guide
          </h2>
          <div className="glass-card p-10 space-y-6 bg-white/[0.01]">
            <p className="text-sm text-gray-400 leading-relaxed">
              To fetch your blogs, simply use the endpoint below with your Medium username.
              The response is a cleaned, normalized JSON structure ready for React, Vue, or any other framework.
            </p>
            <div className="p-6 bg-black/40 rounded-xl border border-white/5 font-mono text-sm space-y-4">
              <div className="text-gray-500">// Example cURL request</div>
              <div className="text-cyan-400 break-all whitespace-pre-wrap">
                curl -X GET &quot;{baseUrl}/api/posts?username=bhagirath00&quot;
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <h2 className="text-xl font-bold uppercase tracking-widest text-gray-500">Available Endpoints</h2>
          <div className="grid gap-6">
            {endpoints.map((ep) => (
              <div key={ep.path} className="glass-card p-8 group hover:border-cyan-500/30 transition-all">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 bg-cyan-500 text-black text-[10px] font-black uppercase rounded">
                        {ep.method}
                      </span>
                      <span className="font-mono text-sm text-white font-bold">{ep.path}</span>
                    </div>
                    <p className="text-xs text-gray-500">{ep.desc}</p>
                  </div>
                  <div className="font-mono text-[10px] text-gray-600 uppercase tracking-widest self-center">
                    {ep.params || 'no params'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="glass-card p-10 border-dashed border-white/10 text-center space-y-6">
            <h3 className="text-lg font-bold">Need help with integration?</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Check our GitHub repository for full source code and advanced integration patterns.
            </p>
            <a href="https://github.com" target="_blank" className="inline-block px-8 py-3 border border-white/10 rounded-xl hover:bg-white/5 hover:border-cyan-500/30 transition-all font-mono text-[10px] uppercase tracking-widest">
              Source Repository
            </a>
          </div>
        </section>
      </div>

      <div className="pt-10 text-center">
        <Link href="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 hover:text-cyan-400 transition-colors">
          ← Return to Engine
        </Link>
      </div>
    </div>
  );
}
