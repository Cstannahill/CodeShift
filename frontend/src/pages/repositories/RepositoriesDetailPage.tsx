// src/features/repositories/RepositoryDetailPage.tsx
import { useParams, Link, Navigate } from "react-router-dom";
import { useRepository } from "@/hooks/queries/useRepositories";
import { LoadingPage } from "@/components/layouts/LoadingPage";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
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
  Download,
  Share,
  BookOpen,
  Zap,
} from "lucide-react";
import {
  formatDate,
  formatRelativeTime,
  formatSkillLevel,
} from "@/lib/utils/format";
import { getFrameworkColor } from "@/lib/utils/frameworks";

export default function RepositoryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: repository, isLoading, error } = useRepository(id!);

  if (isLoading) {
    return <LoadingPage message="Loading repository details..." />;
  }

  if (error || !repository) {
    return <Navigate to="/repositories" replace />;
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
          <Button asChild>
            <Link to={`/translate?repo=${repository.id}`}>
              <Code className="h-4 w-4 mr-2" />
              Translate Code
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="technologies">Technologies</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
          <TabsTrigger value="skills">Skill Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatsCard
                  icon={<GitBranch className="h-4 w-4" />}
                  label="Branch"
                  value={repository.branch}
                />
                <StatsCard
                  icon={<Calendar className="h-4 w-4" />}
                  label="Added"
                  value={formatRelativeTime(repository.createdAt)}
                />
                {repository.metrics && (
                  <>
                    <StatsCard
                      icon={<Star className="h-4 w-4" />}
                      label="Quality"
                      value={`${repository.metrics.quality}/10`}
                    />
                    <StatsCard
                      icon={<Users className="h-4 w-4" />}
                      label="Contributors"
                      value={repository.metrics.contributors.toString()}
                    />
                  </>
                )}
              </div>

              {/* Language Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Language Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {repository.technologies.languages.map((lang) => (
                      <div key={lang.name} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{lang.name}</span>
                          <span className="text-muted-foreground">
                            {lang.percentage.toFixed(1)}%
                          </span>
                        </div>
                        <Progress value={lang.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Frameworks & Libraries */}
              <Card>
                <CardHeader>
                  <CardTitle>Frameworks & Libraries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {repository.technologies.frameworks.map((framework) => (
                      <Badge
                        key={framework}
                        variant="secondary"
                        style={{
                          backgroundColor: `${getFrameworkColor(framework)}20`,
                          borderColor: getFrameworkColor(framework),
                        }}
                      >
                        {framework}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Repository Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Repository Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <InfoItem
                    icon={<GitBranch className="h-4 w-4" />}
                    label="Branch"
                    value={repository.branch}
                  />
                  <InfoItem
                    icon={<Calendar className="h-4 w-4" />}
                    label="Added"
                    value={formatDate(repository.createdAt)}
                  />
                  {repository.analyzedAt && (
                    <InfoItem
                      icon={<Star className="h-4 w-4" />}
                      label="Analyzed"
                      value={formatDate(repository.analyzedAt)}
                    />
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
                    <BookOpen className="h-4 w-4 mr-2" />
                    Create Learning Path
                  </Button>

                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Export Analysis
                  </Button>

                  <Button variant="outline" className="w-full">
                    <Share className="h-4 w-4 mr-2" />
                    Share Repository
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="technologies">
          <TechnologiesTab repository={repository} />
        </TabsContent>

        <TabsContent value="metrics">
          <MetricsTab repository={repository} />
        </TabsContent>

        <TabsContent value="skills">
          <SkillsTab repository={repository} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper components
function StatsCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2">
          <div className="text-muted-foreground">{icon}</div>
          <div>
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="font-medium">{value}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="text-muted-foreground">{icon}</div>
      <span className="text-muted-foreground">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function TechnologiesTab({ repository }: { repository: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {repository.technologies.languages.map((lang: any) => (
              <div
                key={lang.name}
                className="flex items-center justify-between"
              >
                <span className="font-medium">{lang.name}</span>
                <Badge variant="outline">{lang.percentage.toFixed(1)}%</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Packages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {repository.technologies.packages.map((pkg: any) => (
              <div
                key={pkg.name}
                className="flex items-center justify-between p-2 rounded border"
              >
                <span className="font-mono text-sm">{pkg.name}</span>
                <Badge variant="outline" className="text-xs">
                  {pkg.version}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricsTab({ repository }: { repository: any }) {
  if (!repository.metrics) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No metrics available</h3>
          <p className="text-muted-foreground">
            Complete the repository analysis to view detailed metrics.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Code Quality</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <MetricBar
            label="Quality Score"
            value={repository.metrics.quality}
            max={10}
          />
          <MetricBar
            label="Complexity"
            value={repository.metrics.complexity}
            max={10}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Repository Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">
                {repository.metrics.totalCommits}
              </div>
              <div className="text-sm text-muted-foreground">Total Commits</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {repository.metrics.contributors}
              </div>
              <div className="text-sm text-muted-foreground">Contributors</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Last Commit</div>
            <div className="font-medium">
              {formatRelativeTime(repository.metrics.lastCommit)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MetricBar({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="font-medium">
          {value}/{max}
        </span>
      </div>
      <Progress value={(value / max) * 100} className="h-2" />
    </div>
  );
}

function SkillsTab({ repository }: { repository: any }) {
  // Mock skill impact data based on repository technologies
  const skillImpacts = repository.technologies.languages.map((lang: any) => ({
    technology: lang.name,
    currentLevel: Math.min(10, 3 + lang.percentage / 10),
    impact: `+${(lang.percentage / 20).toFixed(1)}`,
    category: "language",
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill Impact Analysis</CardTitle>
        <CardDescription>
          How this repository contributes to your skill development
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {skillImpacts.map((skill: any) => (
            <div
              key={skill.technology}
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <div>
                  <div className="font-medium">{skill.technology}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatSkillLevel(skill.currentLevel)} • {skill.category}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-green-600">
                  {skill.impact}
                </div>
                <div className="text-xs text-muted-foreground">
                  skill points
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
