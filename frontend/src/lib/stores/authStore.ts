// src/stores/authStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  login: (user: User, accessToken: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (isLoading: boolean) => void;
  clearStorageAndLogout: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    immer((set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: true,

      login: (user, accessToken) =>
        set((state) => {
          state.user = user;
          state.accessToken = accessToken;
          state.isAuthenticated = true;
          state.isLoading = false;
        }),

      logout: () =>
        set((state) => {
          state.user = null;
          state.accessToken = null;
          state.isAuthenticated = false;
        }),

      updateUser: (updates) =>
        set((state) => {
          if (state.user) {
            Object.assign(state.user, updates);
          }
        }),

      setLoading: (isLoading) =>
        set((state) => {
          state.isLoading = isLoading;
        }),

      clearStorageAndLogout: () => {
        localStorage.removeItem("auth-storage");
        set((state) => {
          state.user = null;
          state.accessToken = null;
          state.isAuthenticated = false;
        });
      },
    })),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
