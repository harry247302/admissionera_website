"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { verifyCurrentUser, type AuthUser } from "@/lib/auth";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  refreshUser: () => Promise<AuthUser | null>;
};

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  refreshUser: async () => null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const next = await verifyCurrentUser().catch(() => null);
    setUser(next);
    setLoading(false);
    return next;
  }, []);

  useEffect(() => {
    void refreshUser();
  }, [refreshUser]);

  const value = useMemo(
    () => ({ user, loading, refreshUser }),
    [user, loading, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
