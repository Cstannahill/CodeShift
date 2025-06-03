// src/hooks/common/useNotifications.ts
import { useUIStore } from "@/lib/stores/uiStore";
import { useCallback } from "react";

export function useNotifications() {
  const {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  } = useUIStore();

  const showNotification = useCallback(
    (notification: {
      type: "info" | "success" | "warning" | "error";
      title: string;
      message?: string;
      duration?: number;
    }) => {
      const id = addNotification(notification);

      // Auto-remove after duration
      if (notification.duration !== 0) {
        setTimeout(() => {
          removeNotification(id);
        }, notification.duration || 5000);
      }

      return id;
    },
    [addNotification, removeNotification]
  );

  return {
    notifications,
    showNotification,
    removeNotification,
    clearNotifications,
  };
}
