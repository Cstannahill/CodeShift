// src/stores/translationStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface TranslationHistoryItem {
  id: string;
  sourceFramework: string;
  targetFramework: string;
  timestamp: Date;
  confidence: number;
}

interface TranslationState {
  sourceCode: string;
  targetCode: string;
  sourceFramework: string | null;
  targetFramework: string | null;
  isTranslating: boolean;
  confidence: number;
  warnings: string[];
  suggestions: string[];
  history: TranslationHistoryItem[];
}

interface TranslationActions {
  setSourceCode: (code: string) => void;
  setFrameworks: (source: string, target: string) => void;
  setTranslationResult: (result: {
    targetCode: string;
    confidence: number;
    warnings: string[];
    suggestions: string[];
  }) => void;
  setTranslating: (isTranslating: boolean) => void;
  clearTranslation: () => void;
  addToHistory: (
    item: Omit<TranslationHistoryItem, "id" | "timestamp">
  ) => void;
}

export const useTranslationStore = create<
  TranslationState & TranslationActions
>()(
  immer((set) => ({
    sourceCode: "",
    targetCode: "",
    sourceFramework: null,
    targetFramework: null,
    isTranslating: false,
    confidence: 0,
    warnings: [],
    suggestions: [],
    history: [],

    setSourceCode: (code) =>
      set((state) => {
        state.sourceCode = code;
        // Clear target when source changes
        state.targetCode = "";
        state.confidence = 0;
        state.warnings = [];
        state.suggestions = [];
      }),

    setFrameworks: (source, target) =>
      set((state) => {
        state.sourceFramework = source;
        state.targetFramework = target;
        // Clear results when frameworks change
        state.targetCode = "";
        state.confidence = 0;
        state.warnings = [];
        state.suggestions = [];
      }),

    setTranslationResult: (result) =>
      set((state) => {
        state.targetCode = result.targetCode;
        state.confidence = result.confidence;
        state.warnings = result.warnings;
        state.suggestions = result.suggestions;
        state.isTranslating = false;
      }),

    setTranslating: (isTranslating) =>
      set((state) => {
        state.isTranslating = isTranslating;
      }),

    clearTranslation: () =>
      set((state) => {
        state.sourceCode = "";
        state.targetCode = "";
        state.warnings = [];
        state.suggestions = [];
        state.confidence = 0;
      }),

    addToHistory: (item) =>
      set((state) => {
        const historyItem: TranslationHistoryItem = {
          ...item,
          id: "hist_" + Date.now(),
          timestamp: new Date(),
        };
        state.history.unshift(historyItem);
        if (state.history.length > 10) {
          state.history.pop();
        }
      }),
  }))
);
