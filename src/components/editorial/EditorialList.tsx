
import type { ContentBlock } from '../../types/editorial';

export function EditorialList({ blocks }: { blocks: ContentBlock[] }) {
  const headings = blocks.filter(b => b.type === 'heading' || b.type === 'subheading');
  const lists = blocks.filter(b => b.type === 'list');
  const paragraphs = blocks.filter(b => b.type === 'paragraph');

  return (
    <div className="w-full min-h-full flex flex-col justify-start p-6 md:p-12 lg:p-24 pt-32">
      <div className="w-full max-w-6xl mx-auto glass-panel bg-white/70 dark:bg-black/40 backdrop-blur-3xl border border-black/10 dark:border-white/10 rounded-[2.5rem] p-10 md:p-16 lg:p-20 shadow-[0_0_100px_rgba(0,0,0,0.1)] dark:shadow-[0_0_100px_rgba(0,0,0,0.5)] relative overflow-hidden transition-colors duration-500">
        {/* Inner glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-black/20 dark:via-white/30 to-transparent" />
        
        <div className="relative z-10 space-y-16">
          
          <div className="max-w-3xl">
            {headings.map(block => (
              <h2 key={block.id} className="text-3xl md:text-5xl text-black dark:text-white font-light mb-8 leading-tight transition-colors" style={{ fontFamily: 'var(--font-serif)' }}>
                {block.content as string}
              </h2>
            ))}
            {paragraphs.map(block => (
              <p key={block.id} className="text-black/70 dark:text-white/60 text-lg leading-relaxed font-light mb-6 transition-colors">
                {block.content as string}
              </p>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lists.map(block => {
              const items = Array.isArray(block.content) ? block.content : [block.content as string];
              return items.map((item, index) => (
                <div key={`${block.id}-${index}`} className="group relative overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/5 p-8 transition-all hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/30 dark:hover:border-white/30 hover:shadow-[0_0_30px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-black/20 dark:from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-10 h-10 rounded-full bg-white/50 dark:bg-black/50 border border-black/20 dark:border-white/10 flex items-center justify-center mb-6 group-hover:border-black/50 dark:group-hover:border-white/50 transition-colors">
                    <span className="text-black/60 dark:text-white/50 text-xs font-mono group-hover:text-black dark:group-hover:text-white transition-colors">{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                  </div>
                  <p className="text-black/80 dark:text-white/80 font-light leading-relaxed group-hover:text-black dark:group-hover:text-white transition-colors">
                    {item}
                  </p>
                </div>
              ));
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
