import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, KeyRound } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { findClientByAccessKey } from '../data/clientAccess';

export function Login() {
  const [accessKey, setAccessKey] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const reduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, refresh } = useAuth();

  useEffect(() => {
    if (user) navigate(user.role === 'admin' ? '/admin' : ((location.state as { from?: string } | null)?.from || '/home'), { replace: true });
  }, [user, navigate, location.state]);

  async function submit(event: React.FormEvent) {
    event.preventDefault(); setError(''); setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 520));
    const client = findClientByAccessKey(accessKey);
    if (!client) {
      setError('Esta palavra de acesso não foi reconhecida. Confira o convite recebido.');
      setSubmitting(false); return;
    }
    localStorage.setItem('meta_session_demo', JSON.stringify({ id: client.id, email: client.email, name: client.name, company: client.company, role: 'client', clientId: client.id }));
    await refresh(); navigate('/home', { replace: true });
  }

  return <main className="min-h-screen relative overflow-hidden bg-[#f5f1e8] dark:bg-[#0a0a09] text-[#171716] dark:text-[#f3efe7] grid place-items-center px-6 py-16">
    <ThemeToggle className="absolute right-6 top-6 z-30" />
    <div className="absolute inset-0 pointer-events-none opacity-70 dark:opacity-40" style={{background:'radial-gradient(circle at 50% 42%, rgba(174,145,83,.12), transparent 32%), linear-gradient(90deg, transparent 8%, rgba(120,99,58,.08) 8.05%, transparent 8.1%, transparent 91.9%, rgba(120,99,58,.08) 91.95%, transparent 92%)'}} />
    <motion.section initial={reduceMotion ? false : { opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, ease: [0.22,1,0.36,1] }} className="relative z-10 w-full max-w-[520px] text-center">
      <p className="text-[9px] tracking-[.34em] uppercase text-[#9b7625] mb-8">Convite privado</p>
      <div className="relative mx-auto w-[310px] h-[74px] overflow-hidden" aria-label="metastrategy.co"><img src="/logo-metastrategy.png" alt="metastrategy.co" className="absolute left-1/2 top-1/2 w-[350px] max-w-none -translate-x-1/2 -translate-y-1/2 mix-blend-multiply dark:invert dark:mix-blend-screen" /></div>
      <div className="w-px h-14 bg-[#9b7625]/50 mx-auto my-7" />
      <h1 className="editorial-serif text-[clamp(2.6rem,7vw,4.6rem)] leading-[.95] tracking-[-.045em]">Seu ambiente<br/><i className="font-normal text-black/42 dark:text-white/42">foi preparado.</i></h1>
      <p className="mt-7 mx-auto max-w-sm text-sm leading-relaxed text-black/48 dark:text-white/48">Digite a palavra que acompanha o seu convite para abrir a estratégia criada exclusivamente para sua marca.</p>
      <form onSubmit={submit} className="mt-10 mx-auto max-w-[390px]">
        <label className="group relative block"><KeyRound size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9b7625]" /><input autoFocus value={accessKey} onChange={event => { setAccessKey(event.target.value); setError(''); }} required autoComplete="one-time-code" spellCheck={false} placeholder="Sua palavra de acesso" className="w-full h-16 rounded-full border border-black/15 dark:border-white/16 bg-white/42 dark:bg-white/[.045] backdrop-blur-xl pl-14 pr-16 outline-none text-center tracking-[.12em] placeholder:tracking-normal placeholder:text-black/30 dark:placeholder:text-white/28 focus:border-[#9b7625] focus:shadow-[0_0_0_4px_rgba(155,118,37,.08)] transition" /><button disabled={submitting} aria-label="Abrir meu ambiente" className="absolute right-2 top-2 w-12 h-12 rounded-full bg-[#171716] dark:bg-[#eee9df] text-white dark:text-black grid place-items-center disabled:opacity-50 hover:scale-[1.04] active:scale-95 transition"><ArrowRight size={17}/></button></label>
        <div aria-live="polite" className="min-h-12 pt-4 text-xs text-[#9e423c] dark:text-[#e5a29e]">{submitting ? 'Localizando seu ambiente…' : error}</div>
      </form>
      <p className="mt-8 text-[9px] uppercase tracking-[.18em] text-black/25 dark:text-white/25">Acesso individual · conteúdo confidencial</p>
      <button onClick={() => navigate('/admin/login')} className="mt-5 text-[9px] uppercase tracking-[.16em] text-black/28 dark:text-white/28 hover:text-[#9b7625] transition">Área do consultor</button>
    </motion.section>
  </main>;
}
