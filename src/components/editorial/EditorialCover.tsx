

export function EditorialCover({ title, subtitle, number }: { title: string, subtitle?: string, number?: string }) {
  return (
    <div className="w-full h-full flex flex-col justify-center px-6 md:px-20 lg:px-40 max-w-7xl mx-auto relative">
      {number && (
        <span className="absolute top-20 left-10 md:left-20 lg:left-40 text-black/5 dark:text-white/10 font-serif text-8xl md:text-[150px] leading-none pointer-events-none -z-10">
          {number}
        </span>
      )}
      
      {subtitle && (
        <p className="text-black/40 dark:text-white/40 text-xs md:text-sm tracking-[0.4em] uppercase font-light mb-8">
          {subtitle}
        </p>
      )}
      
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter text-black dark:text-white leading-[1.1]" style={{ fontFamily: 'var(--font-serif)' }}>
        {title}
      </h1>
    </div>
  );
}
