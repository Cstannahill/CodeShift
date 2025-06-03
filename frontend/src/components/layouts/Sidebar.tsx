// src/components/layouts/Sidebar.tsx
import { NavLink } from "react-router-dom";
import {
  Home,
  GitBranch,
  Code2,
  GraduationCap,
  User,
  ChevronLeft,
  ChevronRight,
  Zap,
  BarChart3,
} from "lucide-react";
import { useUIStore } from "@/lib/stores/uiStore";
import { cn } from "@/lib/utils/cn";
import { Badge } from "@/components/ui/Badge";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    badge: null,
  },
  {
    name: "Repositories",
    href: "/repositories",
    icon: GitBranch,
    badge: null,
  },
  {
    name: "Translate",
    href: "/translate",
    icon: Code2,
    badge: "Hot",
  },
  {
    name: "Learn",
    href: "/learn",
    icon: GraduationCap,
    badge: null,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    badge: "Pro",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
    badge: null,
  },
];

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore();

  return (
    <aside
      className={cn(
        "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] bg-card border-r transition-all duration-300 ease-in-out",
        sidebarOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground"
                )
              }
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && (
                <>
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Quick Actions */}
        {sidebarOpen && (
          <div className="border-t p-4">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Quick Actions
            </h4>
            <div className="space-y-2">
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                <Zap className="h-4 w-4" />
                New Translation
              </button>
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                <GitBranch className="h-4 w-4" />
                Connect Repo
              </button>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <div className="border-t p-4">
          <button
            onClick={toggleSidebar}
            className="flex w-full items-center justify-center rounded-lg p-2 hover:bg-accent transition-colors"
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}
