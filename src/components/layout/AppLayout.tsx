import React from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from './Sidebar';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden flex">
      {/* Moving Classic Background Texture */}
      <motion.div 
        className="absolute inset-[-10%] z-0 mix-blend-screen opacity-30 pointer-events-none"
        style={{
          backgroundImage: 'url(/bg-classic.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        animate={{
          x: ['-2%', '2%', '-2%'],
          y: ['-2%', '2%', '-2%'],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Subtle Living Background Animation (Classic/Elegant) */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Vignette & Gradient for readability */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#050505_100%)] z-0 pointer-events-none opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#050505]/90 via-transparent to-[#050505] z-0 pointer-events-none" />

      {/* Sidebar Navigation */}
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 ml-20 relative z-10 h-screen overflow-y-auto overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
