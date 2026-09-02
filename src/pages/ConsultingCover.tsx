import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HolographicLight } from '../components/ui/HolographicLight';

export function ConsultingCover() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full bg-[#050505] flex items-center justify-center p-6 md:p-12 overflow-hidden">
      {/* Background Texture & Light */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen" style={{ backgroundImage: 'url(/bg-classic.jpg)', backgroundSize: 'cover' }} />
      <HolographicLight color="bg-cyan-500/15" size={1200} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[150px]" />
      <HolographicLight color="bg-blue-600/10" size={800} className="top-0 right-0 translate-x-1/3 -translate-y-1/3 blur-[150px]" />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-6xl mx-auto bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-10 md:p-16 lg:p-20 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.4)]"
      >
        {/* Inner glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-50" />
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column: Title & Intro */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="flex items-center gap-4 mb-10"
            >
              <div className="w-12 h-px bg-cyan-500/50" />
              <span className="text-cyan-400 text-xs font-mono tracking-[0.3em] uppercase">Documento Estratégico</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-5xl md:text-7xl lg:text-[6rem] font-light text-white leading-[1.05] mb-8 tracking-tighter" 
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              A Presença<br />
              <span className="text-white/40 italic font-serif">Feminina Possível</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="text-white/50 text-lg md:text-xl font-light leading-relaxed max-w-2xl"
            >
              A direção central para a marca deixar de ser percebida apenas como "bonita" e passar a construir um território próprio de elegância contemporânea.
            </motion.p>
          </div>

          {/* Right Column: Metadata & Action */}
          <div className="lg:col-span-4 flex flex-col justify-center relative">
            <div className="absolute left-0 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block -ml-12" />
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="space-y-12 mb-16 lg:mb-16"
            >
              {/* Cliente */}
              <div>
                <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.3em] mb-3">Cliente / Marca</p>
                <p className="text-white text-3xl md:text-4xl font-light tracking-wide" style={{ fontFamily: 'var(--font-serif)' }}>Lunna Atelier</p>
              </div>
              
              {/* Versão e Duração - Side by side */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.3em] mb-3">Documento</p>
                  <p className="text-white/90 font-light text-base">v1.0 &mdash; 2026</p>
                </div>
                <div>
                  <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.3em] mb-3">Leitura</p>
                  <p className="text-white/90 font-light text-base">~45 min</p>
                </div>
              </div>

              {/* Progresso */}
              <div>
                <p className="text-white/30 text-[10px] font-mono uppercase tracking-[0.3em] mb-3 flex justify-between">
                  <span>Progresso</span>
                  <span className="text-cyan-400">0%</span>
                </p>
                <div className="h-[2px] w-full bg-white/5 relative">
                  <div className="absolute top-0 left-0 h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" style={{ width: '5%' }} />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 1 }}
            >
              <button 
                onClick={() => navigate('/reader')}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500/50 to-cyan-400/50 p-[1px] shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:shadow-[0_0_25px_rgba(34,211,238,0.25)] transition-all duration-500"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 bg-[#050505] group-hover:bg-[#0a0a0a] rounded-full px-6 py-3 flex items-center justify-between gap-6 transition-colors duration-500">
                  <span className="text-cyan-400 group-hover:text-white font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-500">
                    Iniciar Leitura
                  </span>
                  <div className="w-8 h-8 rounded-full border border-cyan-400/30 group-hover:border-white/40 flex items-center justify-center group-hover:translate-x-1 transition-all duration-500">
                    <svg className="w-3.5 h-3.5 text-cyan-400 group-hover:text-white transition-colors duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </button>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}
