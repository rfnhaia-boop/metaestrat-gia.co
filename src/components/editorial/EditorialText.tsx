
import type { ContentBlock } from '../../types/editorial';

export function EditorialText({ blocks, title, number }: { blocks: ContentBlock[]; title?: string; number?: string }) {
  return (
    <div className="w-full min-h-full px-7 md:px-20 lg:px-36 py-14 md:py-20">
      <div className="w-full max-w-[1450px] mx-auto">
        <div className="mb-12">
          <p className="text-xs md:text-sm tracking-[.2em] uppercase mb-4"><span className="text-[#a27c23]">{number}</span> <span className="text-black/30 dark:text-white/25 mx-2">|</span> {title}</p>
          <h1 className="editorial-serif text-5xl md:text-7xl leading-none">{title}</h1>
        </div>
        <div className="space-y-8 columns-1 lg:columns-2 lg:gap-20">
          {blocks.map(block => {
            if (block.type === 'heading') {
              return (
                <h2 key={block.id} className="editorial-serif text-5xl md:text-7xl text-black dark:text-white font-normal mb-12 leading-tight break-after-avoid">
                  {block.content as string}
                </h2>
              );
            }
            if (block.type === 'subheading') {
              return (
                <h3 key={block.id} className="text-[#a27c23] font-medium mt-8 mb-4 tracking-[.2em] uppercase text-xs break-after-avoid" >
                  {block.content as string}
                </h3>
              );
            }
            if (block.type === 'paragraph') {
              if (block.content === '---') return null;
              return (
                <p key={block.id} className="text-black/85 dark:text-white/75 text-lg md:text-[21px] leading-[1.72] font-normal mb-7 break-inside-avoid">
                  {block.content as string}
                </p>
              );
            }
            if (block.type === 'quote') {
              return (
                <blockquote key={block.id} className="editorial-serif border-l border-[#b38a31] pl-8 text-3xl md:text-4xl text-black/90 dark:text-white/90 italic my-12 break-inside-avoid">
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
