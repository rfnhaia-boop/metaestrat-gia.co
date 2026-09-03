import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ThemeToggle } from '../components/ui/ThemeToggle';

type Mode = 'login' | 'register' | 'forgot';

export function Login() {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState(() => localStorage.getItem('meta_account') || '');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [remember, setRemember] = useState(Boolean(localStorage.getItem('meta_account')));
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, refresh } = useAuth();

  useEffect(() => {
    if (user) navigate((location.state as { from?: string } | null)?.from || '/home', { replace: true });
  }, [user, navigate, location.state]);

  const title = useMemo(() => ({ login: 'Faça seu login', register: 'Crie sua conta', forgot: 'Recupere seu acesso' })[mode], [mode]);

  function changeMode(next: Mode) {
    setMode(next); setError(''); setMessage(''); setPassword('');
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setError(''); setMessage(''); setSubmitting(true);
    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : mode === 'register' ? '/api/auth/register' : '/api/auth/forgot-password';
      const body = mode === 'forgot' ? { email } : { email, password, phone: mode === 'register' ? phone : undefined, remember };
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || 'Não foi possível concluir. Tente novamente.');
      if (mode === 'forgot') { setMessage(data.message); return; }
      if (remember && email) localStorage.setItem('meta_account', email);
      else localStorage.removeItem('meta_account');
      await refresh();
      navigate('/home', { replace: true });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Não foi possível concluir.');
    } finally { setSubmitting(false); }
  }

  const glass = 'absolute inset-0 rounded-2xl bg-white/[0.075] backdrop-blur-3xl border border-white/[0.18] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(0,0,0,0.28),0_18px_50px_rgba(0,0,0,0.25)] transition-all duration-500 group-focus-within:bg-white/[0.11] group-focus-within:border-white/35 pointer-events-none';

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#050505] px-5 py-16">
      <ThemeToggle className="absolute right-6 top-6 z-30 !bg-white/10 !border-white/15 !text-white/70 hover:!bg-white/15 hover:!text-white" />
      <motion.div className="absolute inset-[-10%] z-0 mix-blend-screen opacity-45" style={{ backgroundImage: 'url(/bg-classic.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} animate={reduceMotion ? {} : { x: ['-2%', '2%', '-2%'], y: ['-2%', '2%', '-2%'], scale: [1, 1.045, 1] }} transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050505_100%)] z-0 opacity-80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/35 via-transparent to-[#050505] z-0 pointer-events-none" />

      <motion.section initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="w-full max-w-[430px] relative z-10 flex flex-col items-center">
        <header className="mb-9 text-center w-full">
          <h1 className="text-[2.55rem] md:text-[3rem] leading-none font-medium tracking-[-0.045em] text-white/95 mb-6">metastrategy.co</h1>
          <div className="flex items-center justify-center gap-4 mb-4" aria-hidden="true"><div className="w-12 h-px bg-white/25" /><span className="w-1 h-1 rounded-full bg-[#B9A37A]/70" /><div className="w-12 h-px bg-white/25" /></div>
          <p className="text-white/70 text-xs md:text-sm tracking-[0.29em] uppercase font-light">A clareza que antecede o movimento</p>
        </header>

        <form className="w-full flex flex-col items-center" onSubmit={submit}>
          <h2 className="text-white/65 text-xs tracking-[0.22em] uppercase font-medium mb-6">{title}</h2>
          <div className="w-full space-y-5">
            <Field glass={glass}><input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" autoComplete="email" required className="glass-input" /></Field>
            <AnimatePresence initial={false}>
              {mode === 'register' && <Field glass={glass} key="phone"><input type="tel" name="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Telefone" autoComplete="tel" className="glass-input" /></Field>}
            </AnimatePresence>
            {(mode === 'login' || mode === 'register') && <Field glass={glass}><input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength={8} required className="glass-input" /></Field>}
          </div>

          {mode === 'login' && <div className="w-full flex justify-between items-center mt-4 gap-3">
            <label className="flex items-center gap-2.5 cursor-pointer text-white/70 hover:text-white transition-colors text-sm">
              <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} className="glass-checkbox" />
              <span>Lembrar minha senha</span>
            </label>
            <button type="button" onClick={() => changeMode('forgot')} className="text-white/70 hover:text-white text-sm underline-offset-4 hover:underline">Recuperar senha</button>
          </div>}

          <div aria-live="polite" className="w-full min-h-8 mt-3 text-center text-sm">{error && <p className="text-[#F2B8B5]">{error}</p>}{message && <p className="text-[#D8C7A5]">{message}</p>}</div>

          <motion.button whileHover={reduceMotion ? {} : { scale: 1.018 }} whileTap={{ scale: .985 }} disabled={submitting} type="submit" className="mt-2 relative overflow-hidden group min-w-48 px-12 py-4 rounded-full disabled:opacity-60">
            <span className="absolute inset-0 bg-white/[0.08] backdrop-blur-2xl border border-white/20 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,.35),0_15px_45px_rgba(0,0,0,.3)] group-hover:bg-white/[0.13] group-hover:border-white/35 transition-all duration-500" />
            <span className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-60" />
            <span className="relative z-10 text-white font-semibold tracking-[0.18em] text-sm uppercase">{submitting ? 'Aguarde' : mode === 'login' ? 'Entrar' : mode === 'register' ? 'Criar conta' : mode === 'forgot' ? 'Enviar instruções' : 'Atualizar senha'}</span>
          </motion.button>

          <div className="mt-5 text-center">
            {mode === 'login' && <button type="button" onClick={() => changeMode('register')} className="text-white/65 hover:text-white text-sm underline-offset-4 hover:underline">Criar uma conta</button>}
            {mode !== 'login' && <button type="button" onClick={() => changeMode('login')} className="text-white/65 hover:text-white text-sm underline-offset-4 hover:underline">Voltar para o login</button>}
          </div>
        </form>
      </motion.section>
      <p className="absolute bottom-7 left-0 right-0 text-center z-10 text-white/45 text-[10px] tracking-[0.38em] uppercase">Powered by <span className="text-white/75 font-semibold">NEX</span></p>
    </main>
  );
}

function Field({ children, glass }: { children: React.ReactNode; glass: string }) {
  return <motion.div layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} className="w-full relative group"><span className={glass} />{children}</motion.div>;
}
