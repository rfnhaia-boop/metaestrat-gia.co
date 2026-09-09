

export function EditorialCover({ title, subtitle, number }: { title: string, subtitle?: string, number?: string }) {
  return (
    <div className="w-full h-full flex flex-col justify-center px-8 md:px-24 lg:px-36 max-w-[1500px] mx-auto relative">
      {number && (
        <span className="text-[#a6812b] text-sm tracking-[.2em] mb-8">
          {number}
        </span>
      )}
      
      {subtitle && (
        <p className="text-black/60 dark:text-white/50 text-xs md:text-sm tracking-[0.3em] uppercase font-light mb-8">
          {subtitle}
        </p>
      )}
      
      <h1 className="editorial-serif text-6xl md:text-8xl lg:text-[9rem] font-normal tracking-[-.05em] text-black dark:text-white leading-[.92]">
        {title}
      </h1>
    </div>
  );
}
