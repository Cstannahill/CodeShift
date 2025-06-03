// src/providers/ToastProvider.tsx
import { useUIStore } from "@/lib/stores/uiStore";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider as RadixToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/Toast";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { notifications, removeNotification } = useUIStore();

  return (
    <RadixToastProvider>
      {children}
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          variant={notification.type === "error" ? "destructive" : "default"}
          onOpenChange={(open) => {
            if (!open) {
              removeNotification(notification.id);
            }
          }}
        >
          <div className="grid gap-1">
            <ToastTitle>{notification.title}</ToastTitle>
            {notification.message && (
              <ToastDescription>{notification.message}</ToastDescription>
            )}
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </RadixToastProvider>
  );
}
