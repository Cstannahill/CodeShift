// src/utils/analytics.ts
export function trackEvent(
  event: string,
  properties?: Record<string, any>
): void {
  // In a real app, this would integrate with analytics services
  console.log("Analytics Event:", event, properties);
}

export function trackPageView(page: string): void {
  trackEvent("page_view", { page });
}

export function trackTranslation(
  sourceFramework: string,
  targetFramework: string,
  success: boolean
): void {
  trackEvent("code_translation", {
    source: sourceFramework,
    target: targetFramework,
    success,
  });
}

export function trackLearningProgress(
  pathId: string,
  lessonId: string,
  progress: number
): void {
  trackEvent("learning_progress", {
    pathId,
    lessonId,
    progress,
  });
}
