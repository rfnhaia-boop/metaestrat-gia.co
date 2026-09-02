import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  async function signOut() {
    await logout();
    navigate('/login', { replace: true });
  }

  const menuItems = [
    { id: 'home', label: 'Visão Geral', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', path: '/home' },
    { id: 'consulting', label: 'Estratégia', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', path: '/consulting' },
    { id: 'intelligence', label: 'Ferramentas', icon: 'M13 10V3L4 14h7v7l9-11h-7z', path: '/intelligence' }
  ];

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed left-0 top-0 bottom-0 w-20 flex flex-col items-center py-10 z-50 border-r border-white/5 bg-[#020202]/60 backdrop-blur-3xl group"
    >
      {/* Tiny Logo */}
      <div className="mb-auto cursor-pointer flex flex-col items-center" onClick={() => navigate('/home')}>
        <span className="text-white font-serif text-2xl tracking-tighter hover:text-white/70 transition-colors">m.</span>
        <div className="w-4 h-px bg-white/20 mt-4" />
      </div>

      {/* Nav Items */}
      <div className="flex flex-col gap-6 w-full items-center relative">
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="relative flex items-center justify-center w-12 h-12 rounded-xl group/btn transition-all duration-300"
            >
              {isActive && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/5 rounded-xl border border-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <svg className={`w-5 h-5 relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/30 group-hover/btn:text-white/70'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
              </svg>

              {/* Tooltip on hover */}
              <div className="absolute left-16 px-4 py-2 bg-[#050505]/90 border border-white/10 backdrop-blur-xl rounded-lg opacity-0 translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300 pointer-events-none">
                <span className="text-white/80 text-[10px] tracking-widest uppercase font-light whitespace-nowrap">{item.label}</span>
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-auto">
        <button onClick={signOut} aria-label="Sair" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors group/profile relative">
          <span className="text-white/60 text-xs font-serif group-hover/profile:text-white transition-colors">LA</span>
          
          <div className="absolute left-14 px-4 py-2 bg-[#050505]/90 border border-white/10 backdrop-blur-xl rounded-lg opacity-0 translate-x-2 group-hover/profile:opacity-100 group-hover/profile:translate-x-0 transition-all duration-300 pointer-events-none">
            <span className="text-white/80 text-[10px] tracking-widest uppercase font-light whitespace-nowrap">Sair</span>
          </div>
        </button>
      </div>
    </motion.div>
  );
}
