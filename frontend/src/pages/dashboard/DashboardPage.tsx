// src/features/dashboard/DashboardPage.tsx
import { Link } from "react-router-dom";
import { useDashboardOverview } from "@/hooks/queries/useDashboard";
import { PageHeader } from "@/components/layouts/PageHeader";
import { LoadingPage } from "@/components/layouts/LoadingPage";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import {
  Plus,
  TrendingUp,
  GitBranch,
  Code2,
  GraduationCap,
  Users,
  Zap,
  ArrowRight,
  Clock,
  Target,
  Award,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

export default function DashboardPage() {
  const { data: overview, isLoading, error } = useDashboardOverview();

  if (isLoading) {
    return <LoadingPage message="Loading dashboard..." />;
  }

  if (error || !overview) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Error loading dashboard</h2>
        <p className="text-muted-foreground mb-4">
          Unable to load dashboard data. Please try again.
        </p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Track your coding progress and learning journey"
      >
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/repositories">
              <GitBranch className="h-4 w-4 mr-2" />
              Add Repository
            </Link>
          </Button>
          <Button asChild>
            <Link to="/translate">
              <Code2 className="h-4 w-4 mr-2" />
              Translate Code
            </Link>
          </Button>
        </div>
      </PageHeader>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Repositories"
          value={overview.stats.repositoriesAnalyzed}
          icon={<GitBranch className="h-4 w-4" />}
          trend="+2 this week"
          color="text-blue-600"
        />
        <StatsCard
          title="Translations"
          value={overview.stats.translationsCompleted}
          icon={<Code2 className="h-4 w-4" />}
          trend="+5 this week"
          color="text-green-600"
        />
        <StatsCard
          title="Learning Paths"
          value={overview.stats.learningPathsActive}
          icon={<GraduationCap className="h-4 w-4" />}
          trend="1 active"
          color="text-purple-600"
        />
        <StatsCard
          title="Skills Tracked"
          value={overview.stats.skillsTracked}
          icon={<Target className="h-4 w-4" />}
          trend="+1 this month"
          color="text-orange-600"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/activity">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {overview.recentActivity.map((activity, index) => (
                  <ActivityItem key={index} activity={activity} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skill Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Skill Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {overview.skillProgress.map((skill, index) => (
                  <SkillProgressItem key={index} skill={skill} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {overview.recommendations.map((rec, index) => (
                <RecommendationItem key={index} recommendation={rec} />
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" asChild>
                <Link to="/translate">
                  <Code2 className="h-4 w-4 mr-2" />
                  New Translation
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link to="/repositories">
                  <GitBranch className="h-4 w-4 mr-2" />
                  Connect Repository
                </Link>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <Link to="/learn">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Start Learning
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Dashboard sub-components
interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  trend?: string;
  color?: string;
}

function StatsCard({
  title,
  value,
  icon,
  trend,
  color = "text-primary",
}: StatsCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {trend && <p className="text-xs text-muted-foreground">{trend}</p>}
          </div>
          <div className={cn("p-2 rounded-full bg-muted", color)}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ActivityItemProps {
  activity: {
    type: "analysis" | "translation" | "learning";
    title: string;
    timestamp: string;
    metadata: Record<string, any>;
  };
}

function ActivityItem({ activity }: ActivityItemProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "analysis":
        return <GitBranch className="h-4 w-4" />;
      case "translation":
        return <Code2 className="h-4 w-4" />;
      case "learning":
        return <GraduationCap className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "analysis":
        return "text-blue-600 bg-blue-100";
      case "translation":
        return "text-green-600 bg-green-100";
      case "learning":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="flex items-start gap-3">
      <div className={cn("p-2 rounded-full", getActivityColor(activity.type))}>
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium">{activity.title}</p>
        <p className="text-xs text-muted-foreground">
          {formatRelativeTime(activity.timestamp)}
        </p>
        {activity.metadata.confidence && (
          <Badge variant="outline" className="text-xs">
            {Math.round(activity.metadata.confidence * 100)}% confidence
          </Badge>
        )}
      </div>
    </div>
  );
}

interface SkillProgressItemProps {
  skill: {
    technology: string;
    previousLevel: number;
    currentLevel: number;
    trend: "improving" | "stable" | "declining";
  };
}

function SkillProgressItem({ skill }: SkillProgressItemProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-3 w-3 text-green-600" />;
      case "declining":
        return <TrendingUp className="h-3 w-3 text-red-600 rotate-180" />;
      default:
        return <div className="h-3 w-3 rounded-full bg-gray-400" />;
    }
  };

  const improvement = skill.currentLevel - skill.previousLevel;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{skill.technology}</span>
          {getTrendIcon(skill.trend)}
        </div>
        <div className="text-xs text-muted-foreground">
          {skill.currentLevel.toFixed(1)}/10
          {improvement !== 0 && (
            <span
              className={cn(
                "ml-2",
                improvement > 0 ? "text-green-600" : "text-red-600"
              )}
            >
              {improvement > 0 ? "+" : ""}
              {improvement.toFixed(1)}
            </span>
          )}
        </div>
      </div>
      <Progress value={skill.currentLevel * 10} className="h-2" />
    </div>
  );
}

interface RecommendationItemProps {
  recommendation: {
    type: "learning" | "translation" | "skill";
    title: string;
    description: string;
    action: string;
    link: string;
  };
}

function RecommendationItem({ recommendation }: RecommendationItemProps) {
  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "learning":
        return <GraduationCap className="h-4 w-4" />;
      case "translation":
        return <Code2 className="h-4 w-4" />;
      case "skill":
        return <Award className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-3 rounded-lg border bg-muted/30 space-y-2">
      <div className="flex items-start gap-2">
        <div className="p-1 rounded bg-primary/10 text-primary">
          {getRecommendationIcon(recommendation.type)}
        </div>
        <div className="flex-1 space-y-1">
          <h4 className="text-sm font-medium">{recommendation.title}</h4>
          <p className="text-xs text-muted-foreground">
            {recommendation.description}
          </p>
        </div>
      </div>
      <Button size="sm" variant="outline" className="w-full" asChild>
        <Link to={recommendation.link}>
          {recommendation.action}
          <ArrowRight className="h-3 w-3 ml-1" />
        </Link>
      </Button>
    </div>
  );
}
