// src/stores/uiStore.ts
import { create } from "zustand";

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message?: string;
  duration?: number;
}

interface UIState {
  theme: "light" | "dark" | "system";
  sidebarOpen: boolean;
  commandPaletteOpen: boolean;
  activeModal: string | null;
  notifications: Notification[];
}

interface UIActions {
  setTheme: (theme: UIState["theme"]) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  addNotification: (notification: Omit<Notification, "id">) => string;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useUIStore = create<UIState & UIActions>((set) => ({
  theme: "system",
  sidebarOpen: true,
  commandPaletteOpen: false,
  activeModal: null,
  notifications: [],

  setTheme: (theme) => set({ theme }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  setSidebarOpen: (open) => set({ sidebarOpen: open }),

  toggleCommandPalette: () =>
    set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),

  openModal: (modalId) => set({ activeModal: modalId }),

  closeModal: () => set({ activeModal: null }),

  addNotification: (notification) => {
    const id = crypto.randomUUID();
    set((state) => ({
      notifications: [...state.notifications, { ...notification, id }],
    }));
    return id;
  },

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clearNotifications: () => set({ notifications: [] }),
}));
