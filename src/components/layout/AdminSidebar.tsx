import { motion } from 'framer-motion';
import { LayoutDashboard, LogOut, UsersRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { ThemeToggle } from '../ui/ThemeToggle';

export function AdminSidebar(){const navigate=useNavigate();const{logout}=useAuth();async function exit(){await logout();navigate('/admin/login',{replace:true})}return <>
 <motion.aside initial={{x:-30,opacity:0}} animate={{x:0,opacity:1}} className="hidden md:flex fixed z-50 left-3 top-3 bottom-3 w-[68px] rounded-[24px] border border-white/50 dark:border-white/10 bg-white/55 dark:bg-black/45 backdrop-blur-3xl shadow-[0_18px_60px_rgba(37,31,20,.12)] flex-col items-center py-5">
  <button onClick={()=>navigate('/admin')} className="editorial-brand w-10 h-10 rounded-full bg-[#11110f] text-white flex items-center justify-center text-xl">m<span className="text-[#c6a14e]">.</span></button><div className="w-5 h-px bg-black/15 dark:bg-white/15 my-6"/>
  <nav className="flex flex-col gap-3"><AdminNav label="Dashboard" icon={<LayoutDashboard size={18}/>} onClick={()=>navigate('/admin')}/><AdminNav label="Clientes" icon={<UsersRound size={18}/>} onClick={()=>navigate('/admin')}/></nav>
  <div className="mt-auto flex flex-col gap-3"><ThemeToggle className="!w-11 !h-11 !rounded-2xl"/><button onClick={exit} className="w-11 h-11 rounded-2xl bg-[#11110f] text-[#d1ad59] grid place-items-center" aria-label="Sair do admin"><LogOut size={18}/></button></div>
 </motion.aside>
 <header className="md:hidden fixed z-50 top-3 left-3 right-3 h-16 rounded-[22px] bg-white/75 dark:bg-black/65 backdrop-blur-3xl border border-white/70 dark:border-white/10 flex items-center px-4"><button onClick={()=>navigate('/admin')} className="editorial-brand text-lg">Meta Strategy <span className="text-[8px] tracking-[.18em] uppercase opacity-40 ml-1">Admin</span></button><div className="ml-auto flex gap-2"><ThemeToggle/><button onClick={exit} className="w-10 h-10 rounded-full bg-black text-[#d1ad59] grid place-items-center"><LogOut size={15}/></button></div></header>
 </>}
function AdminNav({label,icon,onClick}:{label:string;icon:React.ReactNode;onClick:()=>void}){return <button onClick={onClick} aria-label={label} className="group relative w-11 h-11 rounded-2xl bg-white/80 dark:bg-white/10 border border-white dark:border-white/10 text-[#9a7625] grid place-items-center">{icon}<span className="absolute left-14 px-3 py-2 rounded-xl bg-[#11110f]/90 text-white text-[10px] tracking-[.15em] uppercase opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">{label}</span></button>}
