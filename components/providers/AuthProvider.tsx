'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { UserSession } from '@/lib/types';
import { clearUser, getUser, setUser, isLoggedIn as checkLoggedIn } from '@/lib/session';

interface AuthContextValue {
  user: UserSession | null;
  ready: boolean;
  isLoggedIn: boolean;
  refresh: () => void;
  login: (session: UserSession) => void;
  logout: () => void;
  requireAuth: (redirectTo?: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUserState] = useState<UserSession | null>(null);
  const [ready, setReady] = useState(false);

  const syncFromStorage = useCallback(() => {
    setUserState(getUser());
  }, []);

  useEffect(() => {
    syncFromStorage();
    setReady(true);
  }, [syncFromStorage]);

  useEffect(() => {
    if (ready) syncFromStorage();
  }, [pathname, ready, syncFromStorage]);

  const refresh = useCallback(() => {
    syncFromStorage();
  }, [syncFromStorage]);

  const login = useCallback((session: UserSession) => {
    setUser(session);
    setUserState(session);
  }, []);

  const logout = useCallback(() => {
    clearUser();
    setUserState(null);
    router.push('/');
  }, [router]);

  const requireAuth = useCallback(
    (redirectTo = '/login') => {
      if (!ready) return false;
      const sessionUser = getUser();
      if (!sessionUser) {
        router.push(redirectTo);
        return false;
      }
      if (!user) setUserState(sessionUser);
      return true;
    },
    [ready, router, user]
  );

  const value = useMemo(
    () => ({
      user,
      ready,
      isLoggedIn: !!user || checkLoggedIn(),
      refresh,
      login,
      logout,
      requireAuth,
    }),
    [user, ready, refresh, login, logout, requireAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
