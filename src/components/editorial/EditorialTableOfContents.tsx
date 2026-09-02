import { motion } from 'framer-motion';
import { lunnaBlueprint } from '../../data/lunna-blueprint';

interface EditorialTableOfContentsProps {
  currentSectionIndex: number;
  readSections: Set<number>;
  onNavigate: (index: number) => void;
}

export function EditorialTableOfContents({ currentSectionIndex, readSections, onNavigate }: EditorialTableOfContentsProps) {
  return (
    <div className="w-full min-h-full flex flex-col justify-start p-6 md:p-12 lg:p-24 pt-32">
      <div className="w-full max-w-7xl mx-auto glass-panel bg-white/70 dark:bg-black/40 backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-[2.5rem] p-10 md:p-16 lg:p-20 shadow-[0_0_100px_rgba(0,0,0,0.1)] dark:shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden transition-colors duration-500">
        {/* Inner glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-black/20 dark:via-white/30 to-transparent" />
        
        <div className="relative z-10 w-full h-full flex flex-col">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {lunnaBlueprint.sections.map((section, index) => {
              const isCurrent = currentSectionIndex === index;
              const isRead = readSections.has(index);
              
              return (
                <button 
                  key={section.id} 
                  onClick={() => onNavigate(index)}
                  className={`
                    group relative overflow-hidden rounded-2xl border text-left p-6 transition-all duration-500
                    ${isCurrent 
                      ? 'bg-black/5 border-black/20 dark:bg-white/10 dark:border-white/40 shadow-[0_0_40px_rgba(0,0,0,0.05)] dark:shadow-[0_0_40px_rgba(255,255,255,0.1)]' 
                      : isRead 
                        ? 'bg-transparent border-black/5 dark:border-white/5 opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5 hover:border-black/20 dark:hover:border-white/20'
                        : 'bg-black/5 border-black/10 dark:bg-white/5 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/30 dark:hover:border-white/30 hover:shadow-[0_0_30px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]'
                    }
                  `}
                >
                  {/* Hover Glow - White/Clean */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black/20 dark:from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-500
                      ${isCurrent ? 'bg-black/10 border-black/50 dark:bg-white/20 dark:border-white/50' : isRead ? 'bg-black/5 border-black/10 dark:bg-black/50 dark:border-white/10' : 'bg-white/50 border-black/20 dark:bg-black/50 dark:border-white/20'}
                      group-hover:border-black/50 dark:group-hover:border-white/50
                    `}>
                      <span className={`text-[10px] font-mono transition-colors duration-500
                        ${isCurrent ? 'text-black dark:text-white font-bold' : isRead ? 'text-black/40 dark:text-white/40' : 'text-black/60 dark:text-white/60'}
                        group-hover:text-black dark:group-hover:text-white
                      `}>
                        {section.number}
                      </span>
                    </div>
                    
                    {isCurrent && (
                      <motion.div
                        layoutId="current-indicator"
                        className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white shadow-[0_0_10px_rgba(0,0,0,0.3)] dark:shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                      />
                    )}
                    {isRead && !isCurrent && (
                      <div className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/10" />
                    )}
                  </div>
                  
                  <p className={`font-light text-sm md:text-base leading-relaxed transition-colors duration-500
                    ${isCurrent ? 'text-black dark:text-white' : isRead ? 'text-black/60 dark:text-white/50' : 'text-black/80 dark:text-white/80'}
                    group-hover:text-black dark:group-hover:text-white
                  `}>
                    {section.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
