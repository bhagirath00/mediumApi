import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Medium Aggregation API',
  description: 'A personal Medium aggregation platform with a terminal-inspired UI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col bg-background text-foreground scroll-smooth overflow-x-hidden">
        <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-xl">
          <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center w-full">
            <Link href="/" className="text-2xl font-black tracking-tighter text-gradient hover:opacity-80 transition-opacity">
              MEDIUM<span className="text-cyan-500">API</span>
            </Link>
            <nav className="flex items-center gap-6 md:gap-12 text-[10px] font-black uppercase tracking-[0.3em]">
              <Link href="/posts" className="text-gray-400 hover:text-cyan-400 transition-colors">Posts</Link>
              <Link href="/docs" className="text-gray-400 hover:text-cyan-400 transition-colors">API</Link>
              <a href="https://github.com" target="_blank" className="text-gray-500 hover:text-white transition-colors">GitHub</a>
            </nav>
          </div>
        </header>

        <main className="flex-1 w-full pt-32 pb-20 flex justify-center">
          <div className="w-full max-w-6xl px-6 animate-fade-in">
            {children}
          </div>
        </main>

        <footer className="w-full border-t border-white/5 bg-white/[0.01]">
          <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between items-center gap-10 text-[9px] uppercase tracking-[0.3em] text-gray-600 font-mono">
            <div className="flex gap-8">
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-cyan-500/50"></span>
                Backend.Node
              </span>
              <span className="text-white/5">|</span>
              <span className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-cyan-500/50"></span>
                Frontend.React
              </span>
            </div>
            <div className="flex items-center gap-12">
              <span>© 2026 Platform.Open</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded border border-white/5">
                <span className="h-1 w-1 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></span>
                <span className="text-green-500/70">Online</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
