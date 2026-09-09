import { lunnaBlueprint } from '../../data/lunna-blueprint';

interface EditorialTableOfContentsProps {
  currentSectionIndex: number;
  readSections: Set<number>;
  onNavigate: (index: number) => void;
}

export function EditorialTableOfContents({ currentSectionIndex, readSections, onNavigate }: EditorialTableOfContentsProps) {
  return (
    <div className="w-full min-h-full px-7 md:px-20 lg:px-24 py-12 md:py-16">
      <div className="w-full max-w-[1500px] mx-auto">
        <p className="text-[#a27c23] text-xs md:text-sm tracking-[.16em] uppercase mb-4">03 | Sumário do documento</p>
        <h1 className="editorial-serif text-5xl md:text-7xl mb-6">Sumário do Documento</h1>
        <div className="w-16 h-px bg-[#b28a33] mb-10" />
        <div className="relative z-10 w-full h-full flex flex-col">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-0">
            {lunnaBlueprint.sections.map((section, index) => {
              const isCurrent = currentSectionIndex === index;
              const isRead = readSections.has(index);
              
              return (
                <button 
                  key={section.id} 
                  onClick={() => onNavigate(index)}
                  className={`
                    group relative text-left py-3 transition-all duration-300 flex gap-5 items-baseline
                    ${isCurrent 
                      ? 'text-black dark:text-white' 
                      : isRead 
                        ? 'opacity-55 hover:opacity-100'
                        : 'hover:text-[#8f6b1d]'
                    }
                  `}
                >
                  <span className="text-[#a27c23] text-xl min-w-8">{section.number}</span>
                  <p className={`font-light text-sm md:text-base leading-relaxed transition-colors duration-500
                    ${isCurrent ? 'text-black dark:text-white' : isRead ? 'text-black/60 dark:text-white/50' : 'text-black/80 dark:text-white/80'}
                    group-hover:text-[#8f6b1d]
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
