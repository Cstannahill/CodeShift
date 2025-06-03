// src/pages/analytics/AnalyticsPage.tsx
import { useState } from "react";
import { PageHeader } from "@/components/layouts/PageHeader";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  BarChart3,
  TrendingUp,
  Users,
  Code2,
  GitBranch,
  Calendar,
  Target,
  Award,
  Download,
  Clock,
  Zap,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");
  const [isLoading, setIsLoading] = useState(false);

  // Mock analytics data - in a real app, this would come from an API
  const analyticsData = {
    overview: {
      totalTranslations: 42,
      totalRepositories: 8,
      learningPathsCompleted: 3,
      skillsImproved: 12,
      totalLinesTranslated: 15420,
      averageConfidence: 0.87,
    },
    translationMetrics: {
      byLanguage: [
        { from: "JavaScript", to: "TypeScript", count: 18, confidence: 0.92 },
        { from: "React", to: "Vue", count: 12, confidence: 0.85 },
        { from: "Python", to: "JavaScript", count: 8, confidence: 0.89 },
        { from: "Java", to: "TypeScript", count: 4, confidence: 0.81 },
      ],
      successRate: 0.94,
      averageTime: "2.3 minutes",
    },
    learningProgress: [
      { skill: "TypeScript", current: 7.5, target: 9, progress: 83 },
      { skill: "Vue.js", current: 6.2, target: 8, progress: 78 },
      { skill: "React Hooks", current: 8.1, target: 9, progress: 90 },
      { skill: "Node.js", current: 5.8, target: 8, progress: 73 },
    ],
    recentActivity: [
      {
        type: "translation" as const,
        title: "Translated React component to Vue.js",
        timestamp: "2024-01-22T15:30:00Z",
        confidence: 0.94,
      },
      {
        type: "learning" as const,
        title: "Completed TypeScript Advanced Patterns lesson",
        timestamp: "2024-01-22T10:15:00Z",
        progress: 85,
      },
      {
        type: "analysis" as const,
        title: "Analyzed e-commerce-app repository",
        timestamp: "2024-01-21T16:45:00Z",
        technologies: ["React", "Node.js", "MongoDB"],
      },
    ],
  };

  const handleExportData = () => {
    setIsLoading(true);
    // Simulate export delay
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, this would trigger a download
      console.log("Exporting analytics data...");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Track your coding journey and learning progress"
      >
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-700 border-purple-200"
          >
            <Zap className="h-3 w-3 mr-1" />
            Pro Feature
          </Badge>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            onClick={handleExportData}
            loading={isLoading}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </PageHeader>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Translations"
          value={analyticsData.overview.totalTranslations}
          icon={<Code2 className="h-4 w-4" />}
          trend="+12 this month"
          color="text-green-600"
        />
        <StatsCard
          title="Repositories Analyzed"
          value={analyticsData.overview.totalRepositories}
          icon={<GitBranch className="h-4 w-4" />}
          trend="+2 this week"
          color="text-blue-600"
        />
        <StatsCard
          title="Learning Paths"
          value={analyticsData.overview.learningPathsCompleted}
          icon={<Target className="h-4 w-4" />}
          trend="1 active"
          color="text-purple-600"
        />
        <StatsCard
          title="Skills Improved"
          value={analyticsData.overview.skillsImproved}
          icon={<TrendingUp className="h-4 w-4" />}
          trend="+3 this month"
          color="text-orange-600"
        />
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="translations" className="space-y-6">
            <TabsList>
              <TabsTrigger value="translations">
                Translation Analytics
              </TabsTrigger>
              <TabsTrigger value="learning">Learning Progress</TabsTrigger>
              <TabsTrigger value="activity">Activity Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="translations" className="space-y-6">
              {/* Translation Success Rate */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Translation Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        Success Rate
                      </div>
                      <div className="text-2xl font-bold text-green-600">
                        {Math.round(
                          analyticsData.translationMetrics.successRate * 100
                        )}
                        %
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">
                        Avg. Confidence
                      </div>
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.round(
                          analyticsData.overview.averageConfidence * 100
                        )}
                        %
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      Average Time per Translation
                    </div>
                    <div className="text-lg font-medium">
                      {analyticsData.translationMetrics.averageTime}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Translation Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Translation Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.translationMetrics.byLanguage.map(
                      (translation, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {translation.from}
                              </span>
                              <span className="text-muted-foreground">→</span>
                              <span className="font-medium">
                                {translation.to}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-muted-foreground">
                                {translation.count} translations
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {Math.round(translation.confidence * 100)}%
                                confidence
                              </Badge>
                            </div>
                          </div>
                          <Progress
                            value={translation.confidence * 100}
                            className="h-2"
                          />
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="learning" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Skill Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {analyticsData.learningProgress.map((skill, index) => (
                      <div key={index} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="space-y-1">
                            <div className="font-medium">{skill.skill}</div>
                            <div className="text-sm text-muted-foreground">
                              Level {skill.current}/10 → Target {skill.target}
                              /10
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={cn(
                              skill.progress >= 80
                                ? "border-green-200 text-green-700"
                                : skill.progress >= 60
                                  ? "border-yellow-200 text-yellow-700"
                                  : "border-red-200 text-red-700"
                            )}
                          >
                            {skill.progress}% complete
                          </Badge>
                        </div>
                        <Progress value={skill.progress} className="h-3" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.recentActivity.map((activity, index) => (
                      <ActivityItem key={index} activity={activity} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="p-2 rounded-full bg-yellow-100 text-yellow-600">
                  <Award className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Translation Master</div>
                  <div className="text-sm text-muted-foreground">
                    50+ successful translations
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border">
                <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                  <Target className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Quick Learner</div>
                  <div className="text-sm text-muted-foreground">
                    3 learning paths completed
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border border-dashed">
                <div className="p-2 rounded-full bg-gray-100 text-gray-600">
                  <Users className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-muted-foreground">
                    Team Player
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Share 5 translations
                  </div>
                  <Progress value={60} className="h-1 mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pro Features */}
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-700">
                <Zap className="h-5 w-5" />
                Pro Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-purple-600">
                Unlock advanced analytics features:
              </div>
              <ul className="text-sm space-y-1 text-purple-600">
                <li>• Custom date ranges</li>
                <li>• Export analytics data</li>
                <li>• Team collaboration insights</li>
                <li>• Advanced skill tracking</li>
              </ul>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper Components
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
    type: "translation" | "learning" | "analysis";
    title: string;
    timestamp: string;
    confidence?: number;
    progress?: number;
    technologies?: string[];
  };
}

function ActivityItem({ activity }: ActivityItemProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "translation":
        return <Code2 className="h-4 w-4" />;
      case "learning":
        return <Target className="h-4 w-4" />;
      case "analysis":
        return <GitBranch className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "translation":
        return "text-green-600 bg-green-100";
      case "learning":
        return "text-purple-600 bg-purple-100";
      case "analysis":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border">
      <div className={cn("p-2 rounded-full", getActivityColor(activity.type))}>
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1 space-y-1">
        <p className="font-medium">{activity.title}</p>
        <p className="text-sm text-muted-foreground">
          {formatRelativeTime(activity.timestamp)}
        </p>
        <div className="flex gap-2">
          {activity.confidence && (
            <Badge variant="outline" className="text-xs">
              {Math.round(activity.confidence * 100)}% confidence
            </Badge>
          )}
          {activity.progress && (
            <Badge variant="outline" className="text-xs">
              {activity.progress}% complete
            </Badge>
          )}
          {activity.technologies && (
            <div className="flex gap-1">
              {activity.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
