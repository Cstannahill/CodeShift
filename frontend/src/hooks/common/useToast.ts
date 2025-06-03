// src/hooks/common/useToast.ts
import { useUIStore } from "@/lib/stores/uiStore";

interface ToastProps {
  title: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "warning";
  duration?: number;
}

export function useToast() {
  const { addNotification } = useUIStore();

  const toast = ({
    title,
    description,
    variant = "default",
    duration,
  }: ToastProps) => {
    const type =
      variant === "destructive"
        ? "error"
        : variant === "success"
          ? "success"
          : variant === "warning"
            ? "warning"
            : "info";

    addNotification({
      type,
      title,
      message: description,
      duration,
    });
  };

  return { toast };
}
