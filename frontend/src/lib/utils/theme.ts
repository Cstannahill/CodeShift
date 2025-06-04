// src/utils/theme.ts
export function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function applyTheme(theme: "light" | "dark" | "system"): void {
  const root = document.documentElement;

  if (theme === "system") {
    const systemTheme = getSystemTheme();
    root.classList.toggle("dark", systemTheme === "dark");
  } else {
    root.classList.toggle("dark", theme === "dark");
  }
}
