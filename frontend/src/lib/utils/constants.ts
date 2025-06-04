// src/utils/constants.ts
export const FRAMEWORK_OPTIONS = [
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "express", label: "Express.js" },
  { value: "nestjs", label: "NestJS" },
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "vite", label: "Vite" },
];

export const LANGUAGE_OPTIONS = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "jsx", label: "JSX" },
  { value: "tsx", label: "TSX" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
];

export const SKILL_CATEGORIES = [
  { value: "language", label: "Programming Language" },
  { value: "framework", label: "Framework" },
  { value: "library", label: "Library" },
  { value: "tool", label: "Tool" },
];

export const TIME_COMMITMENTS = [
  { value: "light", label: "Light (1-2 hours/week)" },
  { value: "moderate", label: "Moderate (3-5 hours/week)" },
  { value: "intensive", label: "Intensive (6+ hours/week)" },
];

export const LEARNING_STYLES = [
  { value: "practical", label: "Hands-on with code" },
  { value: "theoretical", label: "Concept-focused" },
  { value: "mixed", label: "Balanced approach" },
];

export const API_ENDPOINTS = {
  auth: {
    login: "/api/auth/github",
    callback: "/api/auth/github/callback",
    me: "/api/auth/me",
  },
  repositories: {
    list: "/api/repositories",
    create: "/api/repositories",
    get: (id: string) => `/api/repositories/${id}`,
    analyze: (id: string) => `/api/repositories/${id}/analyze`,
    status: (id: string) => `/api/repositories/${id}/analysis-status`,
  },
  skills: {
    profile: "/api/profile/skills",
  },
  translation: {
    analyze: "/api/translation/analyze",
    translate: "/api/translation/translate",
    patterns: "/api/translation/patterns",
  },
  learning: {
    generate: "/api/learning/generate",
    paths: "/api/learning/paths",
    path: (id: string) => `/api/learning/paths/${id}`,
    complete: (pathId: string, lessonId: string) =>
      `/api/learning/paths/${pathId}/lessons/${lessonId}/complete`,
  },
  dashboard: {
    overview: "/api/dashboard/overview",
  },
  search: {
    technologies: "/api/search/technologies",
    translations: "/api/search/translations",
  },
};
