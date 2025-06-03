// src/hooks/queries/useRepositories.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { repositoryService } from "@/services/api";
import { useRepositoryStore } from "@/lib/stores/repositoryStore";
import type {
  Repository,
  RepositoryQueryParams,
  ConnectRepositoryRequest,
} from "@/types";

export function useRepositories(params?: RepositoryQueryParams) {
  const { setRepositories } = useRepositoryStore();

  return useQuery({
    queryKey: ["repositories", params],
    queryFn: () => repositoryService.list(params),
    staleTime: 1000 * 60 * 2, // 2 minutes
    onSuccess: (data) => {
      setRepositories(data.data);
    },
  });
}

export function useRepository(id: string) {
  const { setSelectedRepository } = useRepositoryStore();

  return useQuery({
    queryKey: ["repositories", id],
    queryFn: () => repositoryService.get(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
    onSuccess: (data) => {
      setSelectedRepository(data);
    },
  });
}

export function useConnectRepository() {
  const queryClient = useQueryClient();
  const { addRepository } = useRepositoryStore();

  return useMutation({
    mutationFn: (request: ConnectRepositoryRequest) =>
      repositoryService.connect(request),
    onSuccess: (data) => {
      addRepository(data);
      queryClient.invalidateQueries({ queryKey: ["repositories"] });
    },
  });
}

export function useAnalyzeRepository() {
  const queryClient = useQueryClient();
  const { setAnalyzing, updateRepository } = useRepositoryStore();

  return useMutation({
    mutationFn: ({ repositoryId }: { repositoryId: string }) =>
      repositoryService.analyze(repositoryId),
    onMutate: ({ repositoryId }) => {
      setAnalyzing(repositoryId, true);
    },
    onSuccess: (data, { repositoryId }) => {
      // Start polling for analysis status
      queryClient.invalidateQueries({
        queryKey: ["analysis-status", data.jobId],
      });
    },
    onError: (error, { repositoryId }) => {
      setAnalyzing(repositoryId, false);
    },
  });
}

export function useAnalysisStatus(jobId: string, enabled: boolean = true) {
  const { setAnalysisProgress, setAnalyzing, updateRepository } =
    useRepositoryStore();

  return useQuery({
    queryKey: ["analysis-status", jobId],
    queryFn: () => repositoryService.getAnalysisStatus(jobId),
    enabled: enabled && !!jobId,
    refetchInterval: (data) => {
      // Stop polling when completed or failed
      if (data?.status === "completed" || data?.status === "failed") {
        return false;
      }
      return 2000; // Poll every 2 seconds
    },
    onSuccess: (data) => {
      if (data.progress !== undefined) {
        setAnalysisProgress(jobId, data.progress);
      }

      if (data.status === "completed") {
        setAnalyzing(jobId, false);
        // Refresh repositories list
        queryClient.invalidateQueries({ queryKey: ["repositories"] });
      }
    },
  });
}
