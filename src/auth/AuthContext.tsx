import React, { createContext, useContext, useEffect, useState } from 'react';

type User = { id: number; email: string; phone?: string | null };
type AuthContextValue = { user: User | null; loading: boolean; refresh: () => Promise<void>; logout: () => Promise<void> };
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      // MOCK FOR VERCEL DEMONSTRATION
      const demoSession = localStorage.getItem('meta_session_demo');
      if (demoSession) {
        setUser(JSON.parse(demoSession));
      } else {
        setUser(null);
      }
    } finally { setLoading(false); }
  }

  async function logout() {
    // MOCK FOR VERCEL DEMONSTRATION
    localStorage.removeItem('meta_session_demo');
    setUser(null);
  }

  useEffect(() => { void refresh(); }, []);
  return <AuthContext.Provider value={{ user, loading, refresh, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth precisa estar dentro de AuthProvider.');
  return context;
}
