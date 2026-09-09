import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

export function ProtectedRoute({ children, role }: { children: ReactNode; role?: 'admin' | 'client' }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="min-h-screen bg-[#050505]" aria-label="Carregando" />;
  if (!user) return <Navigate to={role === 'admin' ? '/admin/login' : '/login'} replace state={{ from: location.pathname }} />;
  const userRole = user.role || 'client';
  if (role && userRole !== role) return <Navigate to={userRole === 'admin' ? '/admin' : '/home'} replace />;
  return children;
}
