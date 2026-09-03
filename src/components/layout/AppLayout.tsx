import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f3f1eb] dark:bg-[#090909] text-[#171716] dark:text-[#f0ede6] relative overflow-hidden flex transition-colors duration-500">
      <div className="absolute inset-0 pointer-events-none opacity-45 dark:opacity-30 bg-[radial-gradient(circle_at_78%_5%,rgba(255,255,255,.96),transparent_35%),radial-gradient(circle_at_12%_88%,rgba(185,163,122,.12),transparent_28%)] dark:bg-[radial-gradient(circle_at_78%_5%,rgba(255,255,255,.1),transparent_35%),radial-gradient(circle_at_12%_88%,rgba(185,163,122,.12),transparent_28%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] paper-grain" />
      <Sidebar />
      <main className="flex-1 ml-0 h-[calc(100vh-5rem)] md:h-screen md:ml-20 relative z-10 overflow-y-auto overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
