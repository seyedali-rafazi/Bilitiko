"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { UserSession } from "@/lib/types";
import { authApi, type AuthUser } from "@/lib/api";
import { clearCsrfToken } from "@/lib/csrf";
import { clearUser, getUser, setUser } from "@/lib/session";

interface AuthContextValue {
  user: UserSession | null;
  ready: boolean;
  isLoggedIn: boolean;
  refresh: () => Promise<void>;
  login: (session: UserSession) => void;
  loginWithApi: (session: UserSession) => void;
  logout: () => Promise<void>;
  requireAuth: (redirectTo?: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function toSession(user: AuthUser): UserSession {
  return {
    firstName: user.first_name ?? "",
    lastName: user.last_name ?? "",
    phone: user.phone ?? "",
    email: user.email,
    loggedInAt: new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUserState] = useState<UserSession | null>(null);
  const [ready, setReady] = useState(false);
  const mounted = useRef(true);

  // Auth tokens live in HttpOnly cookies that JS can never read, so the only
  // reliable way to know "am I logged in" is to ask the backend. This runs
  // once on mount; the cached `UserSession` in localStorage is only used to
  // avoid a flash of "logged out" UI while this request is in flight.
  const verifySession = useCallback(async () => {
    try {
      const profile = await authApi.getProfile();
      const session = toSession(profile);
      if (mounted.current) {
        setUser(session);
        setUserState(session);
      }
    } catch {
      if (mounted.current) {
        clearCsrfToken();
        clearUser();
        setUserState(null);
      }
    } finally {
      if (mounted.current) setReady(true);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    // Optimistic hint from cache so the UI doesn't flicker while we verify.
    setUserState(getUser());
    verifySession();
    return () => {
      mounted.current = false;
    };
  }, [verifySession]);

  const refresh = useCallback(async () => {
    await verifySession();
  }, [verifySession]);

  // Legacy in-memory login (no server round-trip) – kept for compatibility
  // with any code that already has a verified session object on hand.
  const login = useCallback((session: UserSession) => {
    setUser(session);
    setUserState(session);
  }, []);

  // Called right after a successful `authApi.login()`/`authApi.register()`
  // call. The backend has already set the HttpOnly cookies via `Set-Cookie`
  // on that response — this just updates the local UI cache.
  const loginWithApi = useCallback((session: UserSession) => {
    setUser(session);
    setUserState(session);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Even if the network call fails, clear local state so the UI
      // reflects "logged out" — the cookies will simply expire naturally.
    }
    clearCsrfToken();
    clearUser();
    setUserState(null);
    router.push("/");
  }, [router]);

  const requireAuth = useCallback(
    (redirectTo = "/login") => {
      if (!ready) return false;
      if (!user) {
        router.push(redirectTo);
        return false;
      }
      return true;
    },
    [ready, router, user],
  );

  const value = useMemo(
    () => ({
      user,
      ready,
      isLoggedIn: !!user,
      refresh,
      login,
      loginWithApi,
      logout,
      requireAuth,
    }),
    [user, ready, refresh, login, loginWithApi, logout, requireAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
