// src/hooks/queries/useLearning.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { learningService } from "@/services/api";
import { useLearningStore } from "@/lib/stores/learningStore";
import type { CreateLearningPathRequest } from "@/types";

export function useLearningPaths() {
  return useQuery({
    queryKey: ["learning", "paths"],
    queryFn: learningService.getPaths,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useLearningPath(pathId: string) {
  const { setActivePath } = useLearningStore();

  return useQuery({
    queryKey: ["learning", "paths", pathId],
    queryFn: () => learningService.getPath(pathId),
    enabled: !!pathId,
    staleTime: 1000 * 60 * 10, // 10 minutes
    onSuccess: (data) => {
      setActivePath(data);
    },
  });
}

export function useCreateLearningPath() {
  const queryClient = useQueryClient();
  const { setGeneratingPath, setActivePath } = useLearningStore();

  return useMutation({
    mutationFn: (request: CreateLearningPathRequest) =>
      learningService.createPath(request),
    onMutate: () => {
      setGeneratingPath(true);
    },
    onSuccess: (data) => {
      setGeneratingPath(false);
      setActivePath(data);
      queryClient.invalidateQueries({ queryKey: ["learning", "paths"] });
    },
    onError: () => {
      setGeneratingPath(false);
    },
  });
}

export function useCompleteLesson() {
  const queryClient = useQueryClient();
  const { completeLesson, updatePathProgress } = useLearningStore();

  return useMutation({
    mutationFn: ({ pathId, lessonId }: { pathId: string; lessonId: string }) =>
      learningService.completeLesson(pathId, lessonId),
    onSuccess: (data, { pathId, lessonId }) => {
      completeLesson(lessonId);
      updatePathProgress(pathId, data.pathProgress);

      // Invalidate the specific learning path to refresh data
      queryClient.invalidateQueries({
        queryKey: ["learning", "paths", pathId],
      });
    },
  });
}
