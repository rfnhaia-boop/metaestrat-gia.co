import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f2eb] dark:bg-[#050505] text-[#171716] dark:text-[#f3efe6] transition-colors duration-500 relative overflow-hidden">
      {/* Holographic Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#a68f63]/15 blur-[160px] dark:opacity-80 opacity-20" />
      <div className="pointer-events-none absolute top-1/2 -right-40 w-[650px] h-[650px] rounded-full bg-cyan-500/10 blur-[180px] dark:opacity-50 opacity-10" />
      <div className="pointer-events-none absolute -bottom-40 left-1/3 w-[550px] h-[550px] rounded-full bg-amber-500/10 blur-[170px] dark:opacity-60 opacity-10" />

      <Sidebar />
      <main className="min-h-screen md:pl-[92px] overflow-x-hidden relative z-10">
        {children}
      </main>
    </div>
  );
}
