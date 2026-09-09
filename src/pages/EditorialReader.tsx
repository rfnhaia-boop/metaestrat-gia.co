import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CodedSlide, codedSlideTitles } from '../components/editorial/CodedSlides';
import { useAuth } from '../auth/AuthContext';

export function EditorialReader() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const { user } = useAuth();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!user?.clientId) return;
    const key = `meta_client_progress_${user.clientId}`;
    let previousMax = 0;
    try { previousMax = JSON.parse(localStorage.getItem(key) || '{}').lastSlide || 0; } catch { /* dado inválido */ }
    const lastSlide = Math.max(previousMax, current + 1);
    localStorage.setItem(key, JSON.stringify({ lastSlide, progress: Math.round(lastSlide / codedSlideTitles.length * 100), lastAccess: new Date().toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) }));
  }, [current, user?.clientId]);

  const previous = () => setCurrent(value => Math.max(0, value - 1));
  const next = () => setCurrent(value => Math.min(codedSlideTitles.length - 1, value + 1));

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') next();
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'Escape') navigate('/consulting');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  const label = codedSlideTitles[current];
  return (
    <section className="relative h-screen bg-[#ebe7df] dark:bg-[#080808] overflow-hidden flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.figure
          key={current}
          initial={reduceMotion ? false : { opacity: 0, x: 35, scale: .995 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: -35, scale: .995 }}
          transition={{ duration: .48, ease: [0.22, 1, 0.36, 1] }}
          drag={reduceMotion ? false : 'x'}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => {
            if (info.offset.x < -70) next();
            if (info.offset.x > 70) previous();
          }}
          className="absolute inset-0 m-0"
        >
          <CodedSlide index={current} onNavigate={setCurrent} />
        </motion.figure>
      </AnimatePresence>

      <nav aria-label="Controles da apresentação" className="absolute z-30 left-1/2 -translate-x-1/2 bottom-3 md:bottom-5 rounded-full border border-white/70 dark:border-white/10 bg-white/72 dark:bg-black/62 backdrop-blur-2xl shadow-[0_14px_38px_rgba(30,25,17,.14),inset_0_1px_0_rgba(255,255,255,.9)] px-2 py-2 flex items-center gap-2">
        <motion.button whileHover={reduceMotion ? {} : { x: -2 }} whileTap={{ scale: .94 }} onClick={previous} disabled={current === 0} aria-label="Prancha anterior" className="w-9 h-9 shrink-0 rounded-full grid place-items-center text-[#987222] hover:bg-white dark:hover:bg-white/10 transition disabled:opacity-20 disabled:pointer-events-none">
          <span aria-hidden="true" className="text-lg leading-none -translate-y-px">←</span>
        </motion.button>
        <span className="h-5 w-px bg-black/10 dark:bg-white/10" aria-hidden="true" />
        <span className="text-[9px] tracking-[.16em] uppercase text-black/45 dark:text-white/45 hidden lg:inline max-w-44 truncate">{label}</span>
        <div className="flex gap-1.5" aria-label="Navegação pelas pranchas">{codedSlideTitles.map((title,index)=><button key={title} onClick={()=>setCurrent(index)} aria-label={`Ir para ${title}`} className={`h-1.5 rounded-full transition-all duration-300 ${index===current?'w-7 bg-[#9b7625]':'w-1.5 bg-black/15 dark:bg-white/20 hover:bg-[#9b7625]/60'}`}/>)}</div>
        <span className="text-[10px] tabular-nums text-[#987222] whitespace-nowrap px-1">{String(current + 1).padStart(2, '0')} / {codedSlideTitles.length}</span>
        <span className="h-5 w-px bg-black/10 dark:bg-white/10" aria-hidden="true" />
        <motion.button whileHover={reduceMotion ? {} : { x: 2 }} whileTap={{ scale: .94 }} onClick={next} disabled={current === codedSlideTitles.length - 1} aria-label="Próxima prancha" className="w-9 h-9 shrink-0 rounded-full grid place-items-center text-[#987222] hover:bg-white dark:hover:bg-white/10 transition disabled:opacity-20 disabled:pointer-events-none">
          <span aria-hidden="true" className="text-lg leading-none -translate-y-px">→</span>
        </motion.button>
      </nav>
    </section>
  );
}
