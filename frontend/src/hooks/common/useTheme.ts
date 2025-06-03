// src/hooks/common/useTheme.ts
import { useEffect } from "react";
import { useUIStore } from "@/lib/stores/uiStore";
import { applyTheme, getSystemTheme } from "@/lib/utils/theme";

export function useTheme() {
  const { theme, setTheme } = useUIStore();

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = () => {
        applyTheme("system");
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  return {
    theme,
    setTheme,
    resolvedTheme: theme === "system" ? getSystemTheme() : theme,
  };
}
