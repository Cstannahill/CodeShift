// src/features/repositories/RepositoryCard.tsx
import { Link } from "react-router-dom";
import { GitBranch, Star, Users, Clock, Code, AlertCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import type { Repository } from "@/types";
import { formatRelativeTime } from "@/lib/utils/format";

interface RepositoryCardProps {
  repository: Repository;
  onAnalyze?: (repositoryId: string) => void;
  isAnalyzing?: boolean;
}

export function RepositoryCard({
  repository,
  onAnalyze,
  isAnalyzing,
}: RepositoryCardProps) {
  const getStatusColor = (
    status: string
  ): "success" | "warning" | "destructive" | "secondary" => {
    switch (status) {
      case "completed":
        return "success";
      case "analyzing":
        return "warning";
      case "failed":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "analyzing":
        return <Clock className="h-3 w-3" />;
      case "failed":
        return <AlertCircle className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const topLanguages = repository.technologies.languages
    .slice(0, 3)
    .map((lang) => (
      <Badge key={lang.name} variant="outline" className="text-xs">
        {lang.name} {lang.percentage.toFixed(1)}%
      </Badge>
    ));

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 relative overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1 min-w-0">
            <CardTitle className="text-lg leading-tight">
              <Link
                to={`/repositories/${repository.id}`}
                className="hover:text-primary transition-colors"
              >
                {repository.name}
              </Link>
            </CardTitle>
            <CardDescription className="flex items-center gap-2">
              <span className="truncate">{repository.fullName}</span>
              <Badge variant="outline" className="text-xs">
                {repository.branch}
              </Badge>
            </CardDescription>
          </div>
          <Badge
            variant={getStatusColor(repository.status)}
            className="ml-2 flex items-center gap-1"
          >
            {getStatusIcon(repository.status)}
            {repository.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Languages */}
        {repository.technologies.languages.length > 0 && (
          <div className="flex flex-wrap gap-1">{topLanguages}</div>
        )}

        {/* Analysis Results */}
        {repository.status === "completed" && repository.metrics && (
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Quality:</span>
                <span className="font-medium">
                  {repository.metrics.quality}/10
                </span>
              </div>
              <div className="flex items-center gap-1">
                <GitBranch className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Commits:</span>
                <span className="font-medium">
                  {repository.metrics.totalCommits}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Contributors:</span>
                <span className="font-medium">
                  {repository.metrics.contributors}
                </span>
              </div>
            </div>

            {/* Complexity Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Complexity</span>
                <span className="font-medium">
                  {repository.metrics.complexity}/10
                </span>
              </div>
              <Progress
                value={repository.metrics.complexity * 10}
                className="h-2"
              />
            </div>
          </div>
        )}

        {/* Frameworks */}
        {repository.technologies.frameworks.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {repository.technologies.frameworks.slice(0, 3).map((framework) => (
              <Badge key={framework} variant="secondary" className="text-xs">
                {framework}
              </Badge>
            ))}
            {repository.technologies.frameworks.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{repository.technologies.frameworks.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-muted-foreground">
            {repository.analyzedAt
              ? `Analyzed ${formatRelativeTime(repository.analyzedAt)}`
              : `Added ${formatRelativeTime(repository.createdAt)}`}
          </div>

          {repository.status === "pending" && onAnalyze && (
            <Button
              size="sm"
              onClick={() => onAnalyze(repository.id)}
              disabled={isAnalyzing}
              loading={isAnalyzing}
            >
              <Code className="h-4 w-4 mr-1" />
              Analyze
            </Button>
          )}
        </div>
      </CardContent>

      {/* Analyzing Progress Overlay */}
      {repository.status === "analyzing" && (
        <div className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
            <p className="text-sm font-medium">Analyzing...</p>
          </div>
        </div>
      )}
    </Card>
  );
}
