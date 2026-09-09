import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { ThemeToggle } from '../ui/ThemeToggle';

const menuItems = [
  { label: 'Início', path: '/home', icon: 'M4 10.5 12 4l8 6.5V20H4v-9.5Z M9 20v-6h6v6' },
  { label: 'Estratégia', path: '/consulting', icon: 'M6 3h9l3 3v15H6V3Z M9 8h8M10 12h4M10 16h4' },
  { label: 'Ferramentas', path: '/intelligence', icon: 'M13 3 5 14h6v7l8-11h-6V3Z' },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  async function signOut() { await logout(); navigate('/login', { replace: true }); }

  return (
    <>
      <motion.aside initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="hidden md:flex fixed z-50 left-3 top-3 bottom-3 w-[68px] rounded-[24px] border border-white/50 dark:border-white/10 bg-white/55 dark:bg-black/45 backdrop-blur-3xl shadow-[0_18px_60px_rgba(37,31,20,.12),inset_0_1px_0_rgba(255,255,255,.9)] dark:shadow-[0_18px_60px_rgba(0,0,0,.38),inset_0_1px_0_rgba(255,255,255,.08)] flex-col items-center py-5">
        <button onClick={() => navigate('/home')} aria-label="Meta Strategy — Início" className="editorial-brand w-10 h-10 rounded-full bg-[#11110f] text-white flex items-center justify-center text-xl shadow-lg">m<span className="text-[#c6a14e]">.</span></button>
        <div className="w-5 h-px bg-black/15 dark:bg-white/15 my-6" />
        <nav className="flex flex-col gap-3" aria-label="Navegação principal">
          {menuItems.map(item => {
            const active = location.pathname.startsWith(item.path);
            return <button key={item.path} onClick={() => navigate(item.path)} aria-label={item.label} className="relative group w-11 h-11 rounded-2xl flex items-center justify-center">
              {active && <motion.span layoutId="side-active" className="absolute inset-0 rounded-2xl bg-white/80 dark:bg-white/10 border border-white dark:border-white/10 shadow-[0_8px_22px_rgba(40,33,20,.1),inset_0_1px_0_white]" />}
              <svg className={`relative z-10 w-[18px] h-[18px] ${active ? 'text-[#9a7625]' : 'text-black/38 dark:text-white/45 group-hover:text-black dark:group-hover:text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d={item.icon} strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="absolute left-14 px-3 py-2 rounded-xl bg-[#11110f]/90 backdrop-blur-xl text-white text-[10px] tracking-[.15em] uppercase opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap">{item.label}</span>
            </button>;
          })}
        </nav>
        <div className="mt-auto flex flex-col gap-3">
          <ThemeToggle className="!w-11 !h-11 !rounded-2xl !bg-white/55 dark:!bg-white/[.07] !border-white dark:!border-white/10" />
          <button onClick={signOut} aria-label="Sair" className="group relative w-11 h-11 rounded-2xl bg-[#11110f] text-[#d1ad59] flex items-center justify-center hover:scale-[1.04] transition-transform shadow-lg">
            <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 6H5v12h5M14 8l4 4-4 4M18 12H9" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="absolute left-14 px-3 py-2 rounded-xl bg-[#11110f]/90 text-white text-[10px] tracking-[.15em] uppercase opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Sair</span>
          </button>
        </div>
      </motion.aside>

      <header className="md:hidden fixed z-50 top-3 left-3 right-3 h-16 rounded-[22px] bg-white/70 dark:bg-black/60 backdrop-blur-3xl border border-white/70 dark:border-white/10 shadow-lg flex items-center px-4">
        <button onClick={() => navigate('/home')} className="editorial-brand text-xl">Meta Strategy</button>
        <div className="ml-auto flex items-center gap-2"><ThemeToggle /><button onClick={signOut} className="h-10 px-4 rounded-full bg-[#11110f] text-[#d1ad59] text-xs uppercase tracking-wider">Sair</button></div>
      </header>
    </>
  );
}
