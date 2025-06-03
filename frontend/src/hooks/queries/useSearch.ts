// src/hooks/queries/useSearch.ts
import { useQuery } from "@tanstack/react-query";
import { searchService } from "@/services/api";

export function useTechnologies(query?: string) {
  return useQuery({
    queryKey: ["search", "technologies", query],
    queryFn: () => searchService.getTechnologies(query),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

export function useTranslationPaths(from?: string, to?: string) {
  return useQuery({
    queryKey: ["search", "translation-paths", from, to],
    queryFn: () => searchService.getTranslationPaths(from, to),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}
