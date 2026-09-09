import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ThemeToggle } from '../components/ui/ThemeToggle';

type Mode = 'login' | 'forgot';

export function Login() {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState(() => localStorage.getItem('meta_account') || '');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(Boolean(localStorage.getItem('meta_account')));
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, refresh } = useAuth();

  useEffect(() => {
    if (user) navigate(user.role === 'admin' ? '/admin' : ((location.state as { from?: string } | null)?.from || '/home'), { replace: true });
  }, [user, navigate, location.state]);

  const title = useMemo(() => ({ login: 'Acesse seu ambiente', forgot: 'Recupere seu acesso' })[mode], [mode]);

  function changeMode(next: Mode) {
    setMode(next); setError(''); setMessage(''); setPassword('');
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setError(''); setMessage(''); setSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 600)); // Simula tempo de rede
      
      if (mode === 'forgot') { 
        setMessage('Instruções enviadas para o seu e-mail (modo demonstração).');
        return; 
      }
      
      if (remember && email) localStorage.setItem('meta_account', email);
      else localStorage.removeItem('meta_account');
      
      const clients = JSON.parse(localStorage.getItem('meta_admin_clients') || '[]') as Array<{ id: string; name: string; email: string; password: string; active: boolean }>;
      const client = clients.find(item => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password && item.active);
      if (!client) throw new Error('E-mail ou senha incorretos, ou acesso desativado.');

      localStorage.setItem('meta_session_demo', JSON.stringify({
        id: Date.now(), email: client.email, name: client.name, role: 'client', clientId: client.id
      }));
      
      await refresh();
      navigate('/home', { replace: true });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível concluir.');
    } finally { setSubmitting(false); }
  }

  const glass = 'absolute inset-0 border-b border-black/20 dark:border-white/20 transition-colors duration-300 group-focus-within:border-[#9b7625] pointer-events-none';

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#f7f4ed] dark:bg-[#0b0b0a] text-[#171716] dark:text-[#f2eee6] px-5 py-16">
      <ThemeToggle className="absolute right-6 top-6 z-30" />
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#171716] dark:bg-[#9b7625]" />
      <div className="absolute left-[8vw] top-0 bottom-0 w-px bg-black/[.055] dark:bg-white/[.05]" />
      <div className="absolute right-[8vw] top-0 bottom-0 w-px bg-black/[.055] dark:bg-white/[.05]" />

      <motion.section initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [0.22,1,0.36,1] }} className="w-full max-w-[370px] relative z-10 flex flex-col items-center">
        <header className="mb-10 text-center w-full">
          <p className="text-[9px] tracking-[.3em] uppercase text-[#9b7625] mb-3">Ambiente estratégico</p>
          <div className="relative mx-auto w-[290px] h-[72px] overflow-hidden mb-3" aria-label="metastrategy.co">
            <img src="/logo-metastrategy.png" alt="metastrategy.co" className="absolute left-1/2 top-1/2 w-[330px] max-w-none -translate-x-1/2 -translate-y-1/2 mix-blend-multiply dark:invert dark:mix-blend-screen" />
          </div>
          <div className="w-10 h-px bg-[#9b7625] mx-auto mb-5" aria-hidden="true" />
          <p className="text-black/45 dark:text-white/45 text-[10px] tracking-[0.26em] uppercase">A clareza que antecede o movimento</p>
        </header>

        <form className="w-full flex flex-col items-center" onSubmit={submit}>
          <h2 className="text-black/45 dark:text-white/45 text-[10px] tracking-[0.22em] uppercase font-medium mb-8">{title}</h2>
          <div className="w-full space-y-5">
            <Field glass={glass}><input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" autoComplete="email" required className="glass-input" /></Field>
            <AnimatePresence initial={false}>
              {mode === 'login' && <Field glass={glass}><input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" autoComplete="current-password" minLength={4} required className="glass-input" /></Field>}
            </AnimatePresence>
          </div>

          {mode === 'login' && <div className="w-full flex justify-between items-center mt-4 gap-3">
            <label className="flex items-center gap-2.5 cursor-pointer text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors text-xs">
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="glass-checkbox" />
              <span>Lembrar minha senha</span>
            </label>
            <button type="button" onClick={() => changeMode('forgot')} className="text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white text-xs underline-offset-4 hover:underline">Recuperar senha</button>
          </div>}

          <div aria-live="polite" className="w-full min-h-8 mt-3 text-center text-sm">{error && <p className="text-[#F2B8B5]">{error}</p>}{message && <p className="text-[#D8C7A5]">{message}</p>}</div>

          <motion.button whileHover={reduceMotion ? {} : { y: -2 }} whileTap={{ scale: .985 }} disabled={submitting} type="submit" className="mt-2 relative overflow-hidden group w-full px-12 py-4 rounded-sm disabled:opacity-60 bg-[#171716] dark:bg-[#eee9df]">
            <span className="relative z-10 text-white dark:text-black font-semibold tracking-[0.18em] text-xs uppercase">{submitting ? 'Aguarde' : mode === 'login' ? 'Entrar' : 'Enviar instruções'}</span>
          </motion.button>

          <div className="mt-5 text-center">
            {mode !== 'login' && <button type="button" onClick={() => changeMode('login')} className="text-black/45 dark:text-white/45 hover:text-black dark:hover:text-white text-xs underline-offset-4 hover:underline">Voltar para o login</button>}
            {mode === 'login' && <button type="button" onClick={() => navigate('/admin/login')} className="text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white text-[10px] tracking-[.12em] uppercase">Acesso do consultor</button>}
          </div>
        </form>
      </motion.section>
      <p className="absolute bottom-7 left-0 right-0 text-center z-10 text-black/20 dark:text-white/20 text-[8px] tracking-[0.28em] uppercase">Tecnologia NEX</p>
    </main>
  );
}

function Field({ children, glass }: { children: React.ReactNode; glass: string }) {
  return <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="w-full relative group"><span className={glass} />{children}</motion.div>;
}
