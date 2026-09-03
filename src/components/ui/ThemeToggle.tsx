import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../theme/ThemeContext';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === 'dark';
  return <button type="button" onClick={toggleTheme} aria-label={dark ? 'Ativar modo claro' : 'Ativar modo noturno'} title={dark ? 'Modo claro' : 'Modo noturno'} className={`w-10 h-10 rounded-full border border-black/10 dark:border-white/15 bg-white/65 dark:bg-white/[0.07] text-black/55 dark:text-white/65 backdrop-blur-2xl flex items-center justify-center hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/10 transition-all shadow-sm ${className}`}>
    {dark ? <Sun size={17} strokeWidth={1.5} /> : <Moon size={17} strokeWidth={1.5} />}
  </button>;
}
