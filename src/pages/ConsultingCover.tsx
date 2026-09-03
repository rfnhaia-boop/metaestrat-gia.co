import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function ConsultingCover() {
  const navigate = useNavigate();
  return (
    <div className="relative h-full min-h-screen w-full flex items-center justify-center p-4 py-4 md:p-12 overflow-hidden">
      <div className="absolute right-[-8%] top-[-20%] h-[34rem] w-[34rem] rounded-full border-[1px] border-[#a68f63]/20" />
      <div className="absolute right-[-2%] top-[-10%] h-[27rem] w-[27rem] rounded-full border border-black/[0.055] dark:border-white/[0.08]" />

      <motion.article initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: [0.22, 1, 0.36, 1] }} className="relative z-10 w-full max-w-6xl mx-auto bg-white/68 dark:bg-white/[0.06] backdrop-blur-3xl border border-black/[0.09] dark:border-white/[0.1] rounded-[2rem] p-5 sm:p-10 md:p-16 lg:p-20 overflow-hidden shadow-[0_35px_100px_rgba(57,49,34,.09),inset_0_1px_0_white] dark:shadow-[0_35px_100px_rgba(0,0,0,.3)]">
        <div className="absolute top-0 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-[#a68f63]/55 to-transparent" />
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-20">
          <div className="lg:col-span-8 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-4 md:mb-10"><div className="w-12 h-px bg-[#a68f63]" /><span className="text-[#8d7852] text-[10px] md:text-[11px] tracking-[0.3em] uppercase font-semibold">Documento Estratégico</span></div>
            <h1 className="text-4xl md:text-7xl lg:text-[5.8rem] font-light text-[#171716] dark:text-white leading-[1.05] md:leading-[1.02] mb-4 md:mb-8 tracking-tighter" style={{ fontFamily: 'var(--font-serif)' }}>A Presença<br /><span className="text-black/35 dark:text-white/35 italic">Feminina Possível</span></h1>
            <p className="text-black/55 dark:text-white/55 text-sm md:text-xl leading-relaxed max-w-2xl">A direção central para a marca deixar de ser percebida apenas como “bonita” e construir um território próprio de elegância contemporânea.</p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-black/[0.08] dark:border-white/[0.1] pt-6 lg:pt-0 lg:pl-12">
            <div className="space-y-4 md:space-y-10 mb-6 md:mb-12">
              <div><p className="meta-label !mb-1 md:!mb-2">Cliente / Marca</p><p className="text-[#171716] dark:text-white text-2xl md:text-4xl font-light" style={{ fontFamily: 'var(--font-serif)' }}>Lunna Atelier</p></div>
              <div className="grid grid-cols-2 gap-4 md:gap-8"><div><p className="meta-label !mb-1 md:!mb-2">Documento</p><p className="text-black/70 dark:text-white/70 text-sm md:text-base">v1.0 — 2026</p></div><div><p className="meta-label !mb-1 md:!mb-2">Leitura</p><p className="text-black/70 dark:text-white/70 text-sm md:text-base">~45 min</p></div></div>
              <div><p className="meta-label flex justify-between !mb-1 md:!mb-2"><span>Progresso</span><span className="text-[#8d7852]">0%</span></p><div className="h-px w-full bg-black/10"><div className="h-px bg-[#a68f63] w-[5%]" /></div></div>
            </div>
            <button onClick={() => navigate('/reader')} className="group self-start rounded-full bg-[#171716] text-white px-6 md:px-7 py-3 md:py-3.5 flex items-center gap-6 md:gap-8 shadow-[0_15px_35px_rgba(23,23,22,.16)] hover:bg-[#2b2925] transition-all">
              <span className="text-[11px] tracking-[0.2em] uppercase font-semibold">Iniciar leitura</span><span className="text-[#c7b182] group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
