import { motion, type Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-full p-10 md:p-20 lg:p-32 max-w-7xl mx-auto flex flex-col justify-center">
      
      {/* Magazine Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="mb-24 md:mb-32"
      >
        <div className="flex items-center gap-6 mb-8">
          <div className="w-16 h-px bg-[#a68f63]/70" />
          <p className="text-black/45 dark:text-white/45 text-xs md:text-sm tracking-[0.4em] uppercase font-medium">
            Sessão Estratégica Privada
          </p>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-light tracking-tighter text-[#171716] dark:text-white mb-8 leading-[0.9]" style={{ fontFamily: 'var(--font-serif)' }}>
          Lunna<br/><span className="text-black/35 dark:text-white/35 font-sans tracking-tight">Atelier.</span>
        </h1>
        
        <p className="text-black/55 dark:text-white/55 max-w-xl text-lg font-normal leading-relaxed">
          Bem-vinda à sua central arquitetural. Aqui acompanhamos a construção do território de presença feminina possível, etapa por etapa.
        </p>
      </motion.div>

      {/* Progressive Disclosure Modules */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-6"
      >
        {/* Module 1: Blueprint */}
        <motion.div variants={item} className="w-full">
          <div 
            onClick={() => navigate('/consulting')}
            className="group relative w-full overflow-hidden rounded-3xl bg-white/62 dark:bg-white/[0.065] border border-black/[0.08] dark:border-white/[0.1] backdrop-blur-2xl p-8 md:p-12 cursor-pointer transition-all duration-500 hover:bg-white/85 dark:hover:bg-white/[0.1] hover:border-black/15 dark:hover:border-white/20 shadow-[0_24px_70px_rgba(44,39,29,.07),inset_0_1px_0_white] dark:shadow-[0_24px_70px_rgba(0,0,0,.25)]"
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex items-start gap-8">
                <span className="text-[#a68f63]/60 font-serif text-5xl md:text-6xl mt-1">01</span>
                <div>
                  <h3 className="text-3xl md:text-4xl text-[#171716] dark:text-white mb-3" style={{ fontFamily: 'var(--font-serif)' }}>Blueprint Estratégico</h3>
                  <p className="text-black/40 dark:text-white/40 text-xs md:text-sm tracking-[0.2em] uppercase">Documento Fundacional</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 opacity-50 group-hover:opacity-100 transition-opacity">
                <span className="text-black dark:text-white text-xs tracking-[0.2em] uppercase hidden md:block">Acessar</span>
                <div className="w-12 h-12 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center group-hover:scale-110 group-hover:border-[#a68f63]/60 group-hover:bg-white dark:group-hover:bg-white/10 transition-all">
                  <svg className="w-5 h-5 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Module 2: Intelligence */}
        <motion.div variants={item} className="w-full">
          <div 
            onClick={() => navigate('/intelligence')}
            className="group relative w-full overflow-hidden rounded-3xl bg-white/25 dark:bg-white/[0.035] border border-black/[0.07] dark:border-white/[0.08] p-8 md:p-12 cursor-pointer transition-all duration-500 hover:bg-white/60 dark:hover:bg-white/[0.075] hover:border-black/12 dark:hover:border-white/15"
          >
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="flex items-start gap-8">
                <span className="text-black/12 dark:text-white/15 font-serif text-5xl md:text-6xl mt-1">02</span>
                <div>
                  <h3 className="text-3xl md:text-4xl text-black/65 dark:text-white/65 mb-3 group-hover:text-black dark:group-hover:text-white transition-colors" style={{ fontFamily: 'var(--font-serif)' }}>Ferramentas Inteligentes</h3>
                  <p className="text-black/35 dark:text-white/35 text-xs md:text-sm tracking-[0.2em] uppercase group-hover:text-black/55 dark:group-hover:text-white/55 transition-colors">Simuladores & I.A.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6 opacity-30 group-hover:opacity-100 transition-opacity">
                <span className="text-black dark:text-white text-xs tracking-[0.2em] uppercase hidden md:block">Acessar</span>
                <div className="w-12 h-12 rounded-full border border-black/15 dark:border-white/15 flex items-center justify-center group-hover:scale-110 group-hover:border-black/30 dark:group-hover:border-white/30 group-hover:bg-white dark:group-hover:bg-white/10 transition-all">
                  <svg className="w-5 h-5 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
