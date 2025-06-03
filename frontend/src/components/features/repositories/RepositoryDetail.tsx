// src/features/repositories/RepositoryDetail.tsx
import { useParams, Link } from "react-router-dom";
import { useRepository } from "@/hooks/queries/useRepositories";
import { LoadingPage } from "@/components/layouts/LoadingPage";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import {
  ArrowLeft,
  ExternalLink,
  GitBranch,
  Star,
  Users,
  Calendar,
  Code,
  Package,
  TrendingUp,
} from "lucide-react";
import { formatDate, formatRelativeTime } from "@/lib/utils/format";

export function RepositoryDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: repository, isLoading, error } = useRepository(id!);

  if (isLoading) {
    return <LoadingPage message="Loading repository details..." />;
  }

  if (error || !repository) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Repository not found</h2>
        <p className="text-muted-foreground mb-4">
          The repository you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/repositories">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Repositories
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/repositories">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Repositories
              </Link>
            </Button>
            <span className="text-muted-foreground">/</span>
            <h1 className="text-2xl font-bold">{repository.name}</h1>
            <Badge
              variant={
                repository.status === "completed" ? "success" : "secondary"
              }
            >
              {repository.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">{repository.fullName}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <a
              href={repository.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on GitHub
            </a>
          </Button>
          <Button>
            <Code className="h-4 w-4 mr-2" />
            Translate Code
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Technologies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Languages */}
              <div>
                <h4 className="text-sm font-medium mb-3">Languages</h4>
                <div className="space-y-2">
                  {repository.technologies.languages.map((lang) => (
                    <div
                      key={lang.name}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{lang.name}</span>
                      <div className="flex items-center gap-2">
                        <Progress
                          value={lang.percentage}
                          className="w-20 h-2"
                        />
                        <span className="text-sm text-muted-foreground w-12">
                          {lang.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frameworks */}
              {repository.technologies.frameworks.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-3">Frameworks</h4>
                  <div className="flex flex-wrap gap-2">
                    {repository.technologies.frameworks.map((framework) => (
                      <Badge key={framework} variant="secondary">
                        {framework}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Packages */}
              {repository.technologies.packages.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-3">Key Packages</h4>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {repository.technologies.packages.slice(0, 6).map((pkg) => (
                      <div
                        key={pkg.name}
                        className="flex items-center justify-between p-2 rounded border"
                      >
                        <span className="text-sm font-mono">{pkg.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {pkg.version}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Metrics */}
          {repository.metrics && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Code Quality Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Quality Score
                      </span>
                      <span className="font-medium">
                        {repository.metrics.quality}/10
                      </span>
                    </div>
                    <Progress
                      value={repository.metrics.quality * 10}
                      className="h-2"
                    />
                  </div>

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

                <div className="grid gap-4 sm:grid-cols-3 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {repository.metrics.totalCommits}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Total Commits
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {repository.metrics.contributors}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Contributors
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {formatRelativeTime(repository.metrics.lastCommit)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Last Commit
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Repository Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Repository Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <GitBranch className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Branch:</span>
                <Badge variant="outline">{repository.branch}</Badge>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Added:</span>
                <span>{formatDate(repository.createdAt)}</span>
              </div>

              {repository.analyzedAt && (
                <div className="flex items-center gap-2 text-sm">
                  <Star className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Analyzed:</span>
                  <span>{formatDate(repository.analyzedAt)}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" asChild>
                <Link to={`/translate?repo=${repository.id}`}>
                  <Code className="h-4 w-4 mr-2" />
                  Translate Code
                </Link>
              </Button>

              <Button variant="outline" className="w-full">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Skill Impact
              </Button>

              <Button variant="outline" className="w-full">
                <Package className="h-4 w-4 mr-2" />
                Migration Guide
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
