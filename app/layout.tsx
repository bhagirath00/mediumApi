import type { Metadata } from 'next';
import { Github } from 'lucide-react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Medium API',
  description: 'A personal Medium aggregation platform for portfolio integration.',
  icons: {
    icon: [
      { url: '/api.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/api.svg',
    apple: '/api.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-[#fdfdfd] text-zinc-900 flex flex-col font-sans selection:bg-blue-100 overflow-x-hidden">
        
        {/* 1. Particle "Stones" Layer */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[10%] left-[15%] w-1.5 h-1.5 bg-zinc-200 rounded-full animate-float blur-[1px]" />
          <div className="absolute top-[25%] left-[80%] w-2 h-2 bg-zinc-200 rounded-full animate-float-delayed blur-[1px]" />
          <div className="absolute top-[60%] left-[10%] w-1.5 h-1.5 bg-zinc-200 rounded-full animate-float blur-[1.5px]" />
          <div className="absolute top-[75%] left-[90%] w-2 h-2 bg-zinc-200 rounded-full animate-float-delayed blur-[1px]" />
          <div className="absolute top-[40%] left-[50%] w-1 h-1 bg-zinc-200 rounded-full animate-float blur-[0.5px]" />
        </div>

        {/* 2. Global Noise Texture */}
        <div className="fixed inset-0 opacity-[0.08] pointer-events-none z-50 mix-blend-multiply" 
             style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }} />

        {/* 3. Global Header */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-white/85 backdrop-blur-xl border-b border-zinc-100 z-[100] flex items-center justify-between px-10">
          <div className="flex items-center">
            <img src="/api.svg" alt="API Logo" className="w-8 h-8" />
          </div>
          
          <a 
            href="https://github.com/bhagirath00/mediumApi" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-zinc-100 hover:scale-105 active:scale-95 transition-all border border-zinc-200/80 shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            title="GitHub Repository"
          >
            <Github size={20} strokeWidth={2.2} className="text-black" />
          </a>
        </header>

        <main className="pt-16 w-full relative z-10 flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
