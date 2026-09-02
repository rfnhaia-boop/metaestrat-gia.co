import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HolographicLight } from '../components/ui/HolographicLight';

export function IntelligenceCenter() {
  const [activeTab, setActiveTab] = useState<'assistant' | 'simulator'>('assistant');

  return (
    <div className="min-h-screen bg-black text-white p-8 relative flex flex-col md:flex-row gap-8">
      <HolographicLight color="bg-cyan-500/5" size={600} className="top-1/4 left-1/4" />
      
      {/* Sidebar */}
      <div className="w-full md:w-80 shrink-0 space-y-8 z-10">
        <div>
          <button onClick={() => window.location.href='/home'} className="text-white/40 hover:text-white mb-8 block">&larr; Voltar para Home</button>
          <h1 className="text-3xl font-light mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Inteligência</h1>
          <p className="text-white/50 text-sm">Ferramentas treinadas com o seu Blueprint Estratégico.</p>
        </div>

        <div className="space-y-2">
          <button 
            onClick={() => setActiveTab('assistant')}
            className={`w-full text-left px-6 py-4 rounded-xl transition-all ${activeTab === 'assistant' ? 'bg-white/10 text-white shadow-[inset_2px_0_0_#22d3ee]' : 'text-white/40 hover:bg-white/5'}`}
          >
            Assistente Contextual
          </button>
          <button 
            onClick={() => setActiveTab('simulator')}
            className={`w-full text-left px-6 py-4 rounded-xl transition-all ${activeTab === 'simulator' ? 'bg-white/10 text-white shadow-[inset_2px_0_0_#22d3ee]' : 'text-white/40 hover:bg-white/5'}`}
          >
            Simulador de Decisões
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 glass-panel rounded-3xl relative overflow-hidden flex flex-col z-10 border border-white/5">
        <div className="p-8 border-b border-white/5">
          <h2 className="text-xl font-light" style={{ fontFamily: 'var(--font-serif)' }}>
            {activeTab === 'assistant' ? 'Assistente Contextual' : 'Simulador de Decisões'}
          </h2>
        </div>

        <div className="flex-1 p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'assistant' && (
              <motion.div 
                key="assistant"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                    <span className="text-cyan-400 font-serif">N</span>
                  </div>
                  <div className="bg-white/5 p-6 rounded-2xl rounded-tl-none border border-white/5 max-w-2xl">
                    <p className="text-white/80 leading-relaxed">Olá. Sou o seu assistente treinado especificamente na estratégia da Lunna Atelier. Como posso ajudar com seu posicionamento hoje?</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 flex-row-reverse">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    <span className="text-white/60 font-serif">LA</span>
                  </div>
                  <div className="glass-panel p-6 rounded-2xl rounded-tr-none max-w-2xl">
                    <p className="text-white/90 leading-relaxed">Quais são as minhas prioridades para os próximos 30 dias de acordo com o plano estratégico?</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'simulator' && (
              <motion.div 
                key="simulator"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] animate-pulse" />
                </div>
                <h3 className="text-2xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>Simulador de Cenários</h3>
                <p className="text-white/50 mb-8 leading-relaxed">Descreva uma situação ou oportunidade comercial. O sistema avaliará se a ação está alinhada ao posicionamento "Presença Feminina Possível".</p>
                <input 
                  type="text" 
                  placeholder="Ex: Fazer uma promoção de 50% no fim de semana..." 
                  className="w-full bg-transparent border-b border-white/20 text-lg py-4 text-center focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-white/20"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {activeTab === 'assistant' && (
          <div className="p-6 border-t border-white/5 bg-black/40 backdrop-blur-md">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Pergunte sobre a sua estratégia..." 
                className="w-full bg-white/5 border border-white/10 rounded-full pl-6 pr-16 py-4 text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-cyan-500 text-black rounded-full flex items-center justify-center hover:bg-cyan-400 transition-colors">
                &uarr;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
