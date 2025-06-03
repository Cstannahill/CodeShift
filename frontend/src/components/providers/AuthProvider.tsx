// src/providers/AuthProvider.tsx
import { useEffect } from "react";
import { useAuthStore } from "@/lib/stores/authStore";
import { useCurrentUser } from "@/hooks/queries/useAuth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, setLoading } = useAuthStore();
  const { isLoading: isUserLoading } = useCurrentUser();

  useEffect(() => {
    // Initialize auth state
    setLoading(isUserLoading);
  }, [isUserLoading, setLoading]);

  return <>{children}</>;
}
