// src/stores/repositoryStore.ts
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { Repository } from "@/types";

interface RepositoryState {
  repositories: Repository[];
  selectedRepository: Repository | null;
  isAnalyzing: Record<string, boolean>; // repoId -> isAnalyzing
  analysisProgress: Record<string, number>; // repoId -> progress
}

interface RepositoryActions {
  setRepositories: (repositories: Repository[]) => void;
  addRepository: (repository: Repository) => void;
  updateRepository: (id: string, updates: Partial<Repository>) => void;
  setSelectedRepository: (repository: Repository | null) => void;
  setAnalyzing: (repoId: string, isAnalyzing: boolean) => void;
  setAnalysisProgress: (repoId: string, progress: number) => void;
}

export const useRepositoryStore = create<RepositoryState & RepositoryActions>()(
  immer((set) => ({
    repositories: [],
    selectedRepository: null,
    isAnalyzing: {},
    analysisProgress: {},

    setRepositories: (repositories) =>
      set((state) => {
        state.repositories = repositories;
      }),

    addRepository: (repository) =>
      set((state) => {
        state.repositories.unshift(repository);
      }),

    updateRepository: (id, updates) =>
      set((state) => {
        const index = state.repositories.findIndex((r: any) => r.id === id);
        if (index >= 0) {
          Object.assign(state.repositories[index], updates);
        }
        if (state.selectedRepository?.id === id) {
          Object.assign(state.selectedRepository, updates);
        }
      }),

    setSelectedRepository: (repository) =>
      set((state) => {
        state.selectedRepository = repository;
      }),

    setAnalyzing: (repoId, isAnalyzing) =>
      set((state) => {
        state.isAnalyzing[repoId] = isAnalyzing;
      }),

    setAnalysisProgress: (repoId, progress) =>
      set((state) => {
        state.analysisProgress[repoId] = progress;
      }),
  }))
);
