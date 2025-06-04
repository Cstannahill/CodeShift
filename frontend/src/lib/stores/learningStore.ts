// src/stores/learningStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { LearningPath, Lesson } from "@/types";

interface LearningState {
  activePath: LearningPath | null;
  currentLesson: Lesson | null;
  isGeneratingPath: boolean;
  lessonProgress: Record<string, number>; // lessonId -> progress percentage
}

interface LearningActions {
  setActivePath: (path: LearningPath | null) => void;
  setCurrentLesson: (lesson: Lesson | null) => void;
  setGeneratingPath: (isGenerating: boolean) => void;
  updateLessonProgress: (lessonId: string, progress: number) => void;
  completeLesson: (lessonId: string) => void;
  updatePathProgress: (pathId: string, progress: number) => void;
}

export const useLearningStore = create<LearningState & LearningActions>()(
  immer((set) => ({
    activePath: null,
    currentLesson: null,
    isGeneratingPath: false,
    lessonProgress: {},

    setActivePath: (path) =>
      set((state) => {
        state.activePath = path;
        state.currentLesson = null;
      }),

    setCurrentLesson: (lesson) =>
      set((state) => {
        state.currentLesson = lesson;
      }),

    setGeneratingPath: (isGenerating) =>
      set((state) => {
        state.isGeneratingPath = isGenerating;
      }),

    updateLessonProgress: (lessonId, progress) =>
      set((state) => {
        state.lessonProgress[lessonId] = progress;
      }),

    completeLesson: (lessonId) =>
      set((state) => {
        state.lessonProgress[lessonId] = 100;
        if (state.activePath) {
          const lesson = state.activePath.lessons.find(
            (l: any) => l.id === lessonId
          );
          if (lesson) {
            lesson.completed = true;
            lesson.completedAt = new Date().toISOString();
          }

          // Update overall path progress
          const completedLessons = state.activePath.lessons.filter(
            (l: any) => l.completed
          ).length;
          const totalLessons = state.activePath.lessons.length;
          state.activePath.progress = Math.round(
            (completedLessons / totalLessons) * 100
          );
        }
      }),

    updatePathProgress: (pathId, progress) =>
      set((state) => {
        if (state.activePath && state.activePath.id === pathId) {
          state.activePath.progress = progress;
        }
      }),
  }))
);
