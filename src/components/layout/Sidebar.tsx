import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { ThemeToggle } from '../ui/ThemeToggle';

const menuItems = [
  { id: 'home', label: 'Visão Geral', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', path: '/home' },
  { id: 'consulting', label: 'Estratégia', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', path: '/consulting' },
  { id: 'intelligence', label: 'Ferramentas', icon: 'M13 10V3L4 14h7v7l9-11h-7z', path: '/intelligence' },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  async function signOut() { await logout(); navigate('/login', { replace: true }); }

  return (
    <motion.aside initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: .7 }} className="fixed bottom-0 left-0 right-0 h-20 md:h-auto md:top-0 md:w-20 flex flex-row md:flex-col items-center justify-between md:justify-start px-6 md:px-0 py-0 md:py-8 z-50 border-t md:border-t-0 md:border-r border-black/[0.08] dark:border-white/[0.08] bg-white/75 dark:bg-black/55 backdrop-blur-3xl transition-colors duration-500">
      <button aria-label="Visão geral" onClick={() => navigate('/home')} className="hidden md:flex mb-auto flex-col items-center text-[#171716] dark:text-white">
        <span className="font-serif text-2xl tracking-[-.08em]">m<span className="text-[#a68f63]">.</span></span>
        <span className="w-4 h-px bg-black/20 mt-4" />
      </button>

      <nav aria-label="Navegação principal" className="flex flex-row md:flex-col gap-2 md:gap-5 w-auto md:w-full items-center">
        {menuItems.map(item => {
          const active = location.pathname.startsWith(item.path);
          return <button key={item.id} aria-label={item.label} onClick={() => navigate(item.path)} className="relative flex items-center justify-center w-11 h-11 rounded-xl group">
            {active ? <motion.span layoutId="activeTab" className="absolute inset-0 rounded-xl bg-white/75 dark:bg-white/10 border border-black/10 dark:border-white/10 shadow-[0_10px_30px_rgba(37,34,28,.08),inset_0_1px_0_white] dark:shadow-none" /> : null}
            <svg className={`w-[18px] h-[18px] relative z-10 transition-colors ${active ? 'text-[#171716] dark:text-white' : 'text-black/30 dark:text-white/30 group-hover:text-black/65 dark:group-hover:text-white/70'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.4} d={item.icon} /></svg>
            <span className="absolute left-14 px-3 py-2 bg-[#171716] text-white text-[10px] tracking-[.16em] uppercase rounded-lg opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap">{item.label}</span>
          </button>;
        })}
      </nav>

      <div className="md:mt-auto flex flex-row md:flex-col gap-3 items-center"><ThemeToggle /><button onClick={signOut} aria-label="Sair" className="w-10 h-10 rounded-full bg-white/65 dark:bg-white/[0.07] border border-black/10 dark:border-white/15 flex items-center justify-center text-black/55 dark:text-white/60 text-xs font-serif hover:bg-white dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-colors">LA</button></div>
    </motion.aside>
  );
}
