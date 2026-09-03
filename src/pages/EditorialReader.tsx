import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


import { EditorialCover } from '../components/editorial/EditorialCover';
import { EditorialText } from '../components/editorial/EditorialText';
import { EditorialList } from '../components/editorial/EditorialList';
import { EditorialTableOfContents } from '../components/editorial/EditorialTableOfContents';
import { lunnaBlueprint } from '../data/lunna-blueprint';
import { ThemeToggle } from '../components/ui/ThemeToggle';

export function EditorialReader() {
  const navigate = useNavigate();
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [readSections, setReadSections] = useState<Set<number>>(new Set([0]));
  
  const totalSections = Math.max(1, lunnaBlueprint.sections.length);

  const nextSection = () => {
    if (currentSectionIndex < totalSections - 1) {
      setCurrentSectionIndex(prev => {
        const next = prev + 1;
        setReadSections(curr => {
          const newSet = new Set(curr);
          newSet.add(next);
          return newSet;
        });
        return next;
      });
    }
  };

  const prevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };

  const goToSection = (index: number) => {
    if (index >= 0 && index < totalSections) {
      setCurrentSectionIndex(index);
      setReadSections(curr => {
        const newSet = new Set(curr);
        newSet.add(index);
        return newSet;
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSection();
      if (e.key === 'ArrowLeft') prevSection();
      if (e.key === 'Escape') navigate('/consulting');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSectionIndex, totalSections]);

  return (
    <div className="absolute inset-0 bg-white dark:bg-[#050505] text-black dark:text-white overflow-hidden flex flex-col transition-colors duration-500">
      {/* Background Texture */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-screen" style={{ backgroundImage: 'url(/bg-classic.jpg)', backgroundSize: 'cover' }} />

      {/* Top Header */}
      <header className="absolute top-0 left-0 right-0 h-24 px-6 md:px-12 flex justify-between items-center z-40">
        <button onClick={() => navigate('/consulting')} className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors text-xs md:text-sm font-light tracking-[0.2em] uppercase flex items-center gap-2">
          <span>&larr;</span> Voltar à Capa
        </button>
        <div className="flex items-center gap-4 md:gap-6">
          <ThemeToggle />
          <button className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2">
            <span className="text-xs tracking-widest uppercase hidden md:inline">Ouvir</span>
            <div className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center bg-black/5 dark:bg-white/5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
          </button>
          <button className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Content Engine (Swipeable/Animated) */}
      <main className="flex-1 relative w-full h-full z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSectionIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden pb-32"
          >
            {(() => {
              const currentSection = lunnaBlueprint.sections[currentSectionIndex];
              if (!currentSection) return null;
              
              switch (currentSection.preferredTemplate) {
                case 'Cover':
                  return <EditorialCover title={currentSection.title} subtitle={lunnaBlueprint.client} number={currentSection.number} />;
                case 'TableOfContents':
                  return <EditorialTableOfContents 
                    currentSectionIndex={currentSectionIndex} 
                    readSections={readSections}
                    onNavigate={goToSection}
                  />;
                case 'List':
                  return <EditorialList blocks={currentSection.blocks} />;
                case 'Text':
                default:
                  return <EditorialText blocks={currentSection.blocks} />;
              }
            })()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Progress Bar */}
      <footer className="absolute bottom-0 left-0 right-0 h-24 px-6 md:px-12 flex justify-between items-center z-40 bg-gradient-to-t from-white dark:from-[#050505] to-transparent">
        <div className="flex flex-col">
          <span className="text-black/40 dark:text-white/30 font-mono text-xs uppercase tracking-widest mb-1">Progresso</span>
          <span className="text-black/80 dark:text-white/60 font-mono text-sm">
            {lunnaBlueprint.sections[currentSectionIndex]?.number || (currentSectionIndex + 1)} <span className="text-black/20 dark:text-white/20 mx-1">/</span> {totalSections}
          </span>
        </div>
        
        <div className="flex gap-2 md:gap-4">
          <button 
            onClick={prevSection} 
            className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors disabled:opacity-10 text-black/60 dark:text-white/60" 
            disabled={currentSectionIndex === 0}
          >
            &larr;
          </button>
          <button 
            onClick={nextSection} 
            className="w-12 h-12 rounded-full border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/40 dark:hover:border-white/40 transition-colors disabled:opacity-10 text-black dark:text-white" 
            disabled={currentSectionIndex === totalSections - 1}
          >
            &rarr;
          </button>
        </div>
      </footer>
    </div>
  );
}
