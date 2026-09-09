import type { ReactNode } from 'react';
import { AdminSidebar } from './AdminSidebar';

export function AdminLayout({children}:{children:ReactNode}){
 return <div className="min-h-screen bg-[#f5f2eb] dark:bg-[#10100f] text-[#171716] dark:text-[#f3efe6] transition-colors duration-500"><AdminSidebar/><main className="min-h-screen md:pl-[92px] overflow-x-hidden">{children}</main></div>
}
