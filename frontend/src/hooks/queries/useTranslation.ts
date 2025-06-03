// src/hooks/queries/useTranslation.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { translationService } from "@/services/api";
import { useTranslationStore } from "@/lib/stores/translationStore";
import type { TranslationRequest } from "@/types";

export function useTranslateCode() {
  const { setTranslationResult, setTranslating, addToHistory } =
    useTranslationStore();

  return useMutation({
    mutationFn: (request: TranslationRequest) =>
      translationService.translateCode(request),
    onMutate: () => {
      setTranslating(true);
    },
    onSuccess: (data, variables) => {
      setTranslationResult({
        targetCode: data.target.code,
        confidence: data.metadata.confidence,
        warnings: data.metadata.warnings,
        suggestions: data.metadata.suggestions,
      });

      addToHistory({
        sourceFramework: variables.sourceFramework,
        targetFramework: variables.targetFramework,
        confidence: data.metadata.confidence,
      });
    },
    onError: () => {
      setTranslating(false);
    },
  });
}

export function useAnalyzeCode() {
  return useMutation({
    mutationFn: (request: Omit<TranslationRequest, "options">) =>
      translationService.analyzeCode(request),
  });
}

export function useTranslationPatterns(source?: string, target?: string) {
  return useQuery({
    queryKey: ["translation", "patterns", source, target],
    queryFn: () => translationService.getPatterns(source, target),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}
