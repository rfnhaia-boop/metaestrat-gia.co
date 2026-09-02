
import type { ContentBlock } from '../../types/editorial';

export function EditorialText({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="w-full min-h-full flex flex-col justify-start p-6 md:p-12 lg:p-24 pt-32">
      <div className="w-full max-w-5xl mx-auto glass-panel bg-white/70 dark:bg-black/40 backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-[2.5rem] p-10 md:p-16 lg:p-20 shadow-[0_0_100px_rgba(0,0,0,0.1)] dark:shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden transition-colors duration-500">
        {/* Inner glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-black/20 dark:via-white/30 to-transparent" />
        
        <div className="relative z-10 space-y-8">
          {blocks.map(block => {
            if (block.type === 'heading') {
              return (
                <h2 key={block.id} className="text-3xl md:text-5xl text-black dark:text-white font-light mb-8 leading-tight transition-colors" style={{ fontFamily: 'var(--font-serif)' }}>
                  {block.content as string}
                </h2>
              );
            }
            if (block.type === 'subheading') {
              return (
                <h3 key={block.id} className="text-xl md:text-2xl text-black/60 dark:text-white/60 font-light mt-8 mb-4 tracking-wide uppercase font-mono text-sm transition-colors" >
                  {block.content as string}
                </h3>
              );
            }
            if (block.type === 'paragraph') {
              return (
                <p key={block.id} className="text-black/70 dark:text-white/60 text-lg md:text-xl leading-relaxed font-light transition-colors">
                  {block.content as string}
                </p>
              );
            }
            if (block.type === 'quote') {
              return (
                <blockquote key={block.id} className="border-l-4 border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 p-8 rounded-r-2xl text-2xl md:text-3xl text-black/90 dark:text-white/90 italic font-light my-12 shadow-[inset_20px_0_40px_-20px_rgba(0,0,0,0.05)] dark:shadow-[inset_20px_0_40px_-20px_rgba(255,255,255,0.05)] transition-colors" style={{ fontFamily: 'var(--font-serif)' }}>
                  "{block.content as string}"
                </blockquote>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}
