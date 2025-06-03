// src/features/repositories/RepositoryGrid.tsx
import { Repository } from "@/types";
import { RepositoryCard } from "./RepositoryCard";
import { EmptyState } from "@/components/layouts/EmptyState";
import { GitBranch } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface RepositoryGridProps {
  repositories: Repository[];
  onAnalyze?: (repositoryId: string) => void;
  onConnect?: () => void;
  isAnalyzing?: Record<string, boolean>;
  isLoading?: boolean;
}

export function RepositoryGrid({
  repositories,
  onAnalyze,
  onConnect,
  isAnalyzing = {},
  isLoading,
}: RepositoryGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (repositories.length === 0) {
    return (
      <EmptyState
        icon={<GitBranch className="h-8 w-8 text-muted-foreground" />}
        title="No repositories yet"
        description="Connect your GitHub repositories to start analyzing your code and building skill profiles."
        action={
          onConnect && (
            <Button onClick={onConnect}>
              <GitBranch className="h-4 w-4 mr-2" />
              Connect Repository
            </Button>
          )
        }
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {repositories.map((repository) => (
        <RepositoryCard
          key={repository.id}
          repository={repository}
          onAnalyze={onAnalyze}
          isAnalyzing={isAnalyzing[repository.id]}
        />
      ))}
    </div>
  );
}
