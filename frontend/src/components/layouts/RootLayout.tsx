// src/components/layouts/RootLayout.tsx
import { Outlet } from "react-router-dom";
import { useAuthStore } from "@/lib/stores/authStore";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useUIStore } from "@/lib/stores/uiStore";
import { cn } from "@/lib/utils/cn";

export function RootLayout() {
  const { isAuthenticated } = useAuthStore();
  const { sidebarOpen } = useUIStore();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-6">
          <Outlet />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />
        <main
          className={cn(
            "flex-1 overflow-y-auto transition-all duration-300 ease-in-out",
            sidebarOpen ? "ml-64" : "ml-16"
          )}
        >
          <div className="container py-6 mx-2">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
