import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { findClientById } from '../data/clientAccess';

export function ConsultingCover() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const client = findClientById(user?.clientId);
  const company = client?.company || user?.company || user?.name || 'Sua marca';
  const blueprintReady = client?.projectStatus === 'publicado' || client?.id === 'lunna-atelier';
  const openReader = () => {
    if (!blueprintReady) return;
    if (loading) return;
    setLoading(true);
    window.setTimeout(() => navigate('/reader'), 1050);
  };
  if (!blueprintReady) return <div className="editorial-paper min-h-screen pt-24 md:pt-0 flex items-center justify-center px-6 text-center"><motion.section initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} className="max-w-2xl"><p className="text-[10px] tracking-[.3em] uppercase text-[#9b7625]">Estratégia personalizada</p><h1 className="editorial-serif text-5xl md:text-8xl tracking-[-.05em] leading-[.92] mt-7">Estamos preparando<br/><i className="text-black/35 dark:text-white/35">{company}.</i></h1><p className="mt-8 max-w-lg mx-auto leading-relaxed text-black/50 dark:text-white/50">O ambiente já foi criado e as ferramentas estão disponíveis. Quando o diagnóstico for publicado pelo consultor, o Blueprint aparecerá aqui automaticamente.</p><button onClick={()=>navigate('/intelligence')} className="mt-10 rounded-full bg-[#171716] dark:bg-[#eee9df] text-white dark:text-black px-7 py-4 text-[10px] uppercase tracking-[.18em]">Usar ferramentas agora</button></motion.section></div>;
  return (
    <div className="editorial-paper min-h-screen pt-20 md:pt-0 flex text-[#171716] dark:text-[#f2eee6]">
      {loading && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-[#090909] text-white flex flex-col items-center justify-center px-8">
        <p className="editorial-serif text-3xl tracking-[.08em] mb-14">Meta Strategy</p>
        <p className="text-lg md:text-2xl font-light mb-10">Carregando consultoria</p>
        <div className="w-full max-w-xl h-[3px] rounded-full bg-white/10 overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1, ease: 'easeInOut' }} className="h-full bg-gradient-to-r from-[#8b6922] to-[#d0b064]" /></div>
      </motion.div>}
      <aside className="hidden lg:flex w-[20%] shrink-0 border-r border-black/20 dark:border-white/15 px-12 py-16 flex-col">
        <p className="text-[12px] tracking-[.28em] uppercase mb-20">Metodologia</p>
        <h2 className="text-[52px] font-light tracking-[.18em] leading-none">NAVE</h2>
        <p className="mt-4 text-lg">Sistema estratégico</p>
        <div className="w-24 h-px bg-black/55 dark:bg-white/45 my-16" />
        <div className="space-y-6 text-[17px] text-black/75 dark:text-white/70">
          <p>Narrativa</p><p>Alinhamento</p><p>Visão</p><p>Execução</p>
        </div>
        <div className="mt-auto pt-16"><div className="w-24 h-px bg-black/55 dark:bg-white/45 mb-9" /><p className="text-lg">Blueprint Estratégico</p></div>
      </aside>

      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .9 }} className="relative flex-1 flex flex-col justify-center px-7 md:px-16 lg:px-24 py-16">
        <p className="text-[11px] md:text-[15px] tracking-[.22em] uppercase mb-9">Blueprint estratégico da marca</p>
        <h1 className="editorial-serif text-[58px] sm:text-[84px] lg:text-[clamp(6rem,10vw,10.8rem)] leading-[.86] tracking-[-.055em] font-normal">{company}</h1>
        <div className="flex flex-wrap gap-x-6 gap-y-3 mt-10 text-sm md:text-lg text-black/75 dark:text-white/70">
          {['Moda feminina, bolsas e vestuário','Brasil','Digital-first','Pré-lançamento','Ticket R$ 300 a R$ 600'].map((item, i) => <span key={item} className="flex items-center gap-6">{i > 0 && <span className="text-black/45 dark:text-white/35">|</span>}{item}</span>)}
        </div>
        <button onClick={openReader} aria-label="Iniciar leitura" className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full border border-white/80 dark:border-white/10 bg-white/45 dark:bg-white/[.07] backdrop-blur-2xl shadow-[0_12px_35px_rgba(39,31,17,.12),inset_0_1px_0_white] text-[#9d7c2d] text-3xl hover:translate-x-1 transition-transform">→</button>
        <button onClick={openReader} className="mt-16 self-start rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/[.06] backdrop-blur-2xl px-7 py-3 shadow-[inset_0_1px_0_white,0_12px_30px_rgba(45,36,20,.08)] text-[11px] uppercase tracking-[.22em] text-[#8e6c1e] hover:bg-white/80 transition-colors">Iniciar leitura</button>
      </motion.main>
    </div>
  );
}
