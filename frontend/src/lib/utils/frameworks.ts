// src/utils/framework.ts
export function detectFramework(code: string): string | null {
  // React
  if (
    code.includes("import React") ||
    code.includes('from "react"') ||
    code.includes("jsx")
  ) {
    if (
      code.includes("next/") ||
      code.includes("getServerSideProps") ||
      code.includes("getStaticProps")
    ) {
      return "Next.js";
    }
    return "React";
  }

  // Vue
  if (
    code.includes("<template>") ||
    (code.includes("export default") && code.includes("Vue"))
  ) {
    return "Vue.js";
  }

  // Angular
  if (
    code.includes("@Component") ||
    code.includes("ng-") ||
    code.includes("import { Component }")
  ) {
    return "Angular";
  }

  // Express
  if (
    code.includes("express()") ||
    code.includes("app.listen") ||
    code.includes("router.")
  ) {
    return "Express.js";
  }

  // NestJS
  if (
    code.includes("@Controller") ||
    code.includes("@Injectable") ||
    code.includes("NestFactory")
  ) {
    return "NestJS";
  }

  // TypeScript
  if (
    code.includes("interface ") ||
    code.includes("type ") ||
    code.includes(": string") ||
    code.includes(": number")
  ) {
    return "TypeScript";
  }

  // JavaScript
  if (
    code.includes("function ") ||
    code.includes("const ") ||
    code.includes("var ") ||
    code.includes("let ")
  ) {
    return "JavaScript";
  }

  return null;
}

export function getFrameworkColor(framework: string): string {
  const colors: Record<string, string> = {
    React: "#61DAFB",
    "Next.js": "#000000",
    "Vue.js": "#4FC08D",
    Angular: "#DD0031",
    "Express.js": "#000000",
    NestJS: "#E0234E",
    TypeScript: "#3178C6",
    JavaScript: "#F7DF1E",
    Vite: "#646CFF",
    "Nuxt.js": "#00DC82",
  };

  return colors[framework] || "#6B7280";
}
