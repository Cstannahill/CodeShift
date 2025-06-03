// src/features/learning/LearningPathsPage.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useLearningPaths,
  useCreateLearningPath,
} from "@/hooks/queries/useLearning";
import { useNotifications } from "@/hooks/common/useNotifications";
import { PageHeader } from "@/components/layouts/PageHeader";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { EmptyState } from "@/components/layouts/EmptyState";

import {
  GraduationCap,
  Plus,
  Clock,
  Target,
  TrendingUp,
  Book,
  PlayCircle,
  CheckCircle,
  Pause,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/utils/format";
import type { LearningPath } from "@/types";
import { CreateLearningPathDialog } from "@/components/features/learning/CreateLearningPathDialog";

export default function LearningPathsPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { data: learningPaths, isLoading, error } = useLearningPaths();
  const createMutation = useCreateLearningPath();
  const { showNotification } = useNotifications();

  const handleCreatePath = async (request: any) => {
    createMutation.mutate(request, {
      onSuccess: (data) => {
        setCreateDialogOpen(false);
        showNotification({
          type: "success",
          title: "Learning path created",
          message: `Your personalized learning path "${data.title}" is ready!`,
        });
      },
      onError: (error) => {
        showNotification({
          type: "error",
          title: "Creation failed",
          message: error.message || "Failed to create learning path",
        });
      },
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Learning Paths"
          description="Personalized learning journeys"
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">
          Error loading learning paths
        </h2>
        <p className="text-muted-foreground mb-4">
          Unable to load your learning paths. Please try again.
        </p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Learning Paths"
        description="Accelerate your learning with AI-powered personalized curricula"
      >
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Learning Path
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Learning Path</DialogTitle>
            </DialogHeader>
            <CreateLearningPathDialog
              onSubmit={handleCreatePath}
              isLoading={createMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </PageHeader>

      {!learningPaths || learningPaths.length === 0 ? (
        <EmptyState
          icon={<GraduationCap className="h-8 w-8 text-muted-foreground" />}
          title="No learning paths yet"
          description="Create your first personalized learning path to start your journey from one technology to another."
          action={
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Learning Path
            </Button>
          }
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {learningPaths.map((path) => (
            <LearningPathCard key={path.id} path={path} />
          ))}
        </div>
      )}
    </div>
  );
}

// Learning Path Card Component
interface LearningPathCardProps {
  path: LearningPath;
}

function LearningPathCard({ path }: LearningPathCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <PlayCircle className="h-4 w-4 text-blue-600" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "paused":
        return <Pause className="h-4 w-4 text-yellow-600" />;
      default:
        return <Book className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "paused":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const completedLessons = path.lessons.filter(
    (lesson) => lesson.completed
  ).length;
  const totalLessons = path.lessons.length;

  return (
    <Card className="group hover:shadow-lg transition-all duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg leading-tight">
              <Link
                to={`/learn/${path.id}`}
                className="hover:text-primary transition-colors"
              >
                {path.title}
              </Link>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {path.from.technology}
              </Badge>
              <span className="text-muted-foreground">→</span>
              <Badge variant="outline" className="text-xs">
                {path.to.technology}
              </Badge>
            </div>
          </div>
          <Badge
            className={`${getStatusColor(path.status)} flex items-center gap-1`}
          >
            {getStatusIcon(path.status)}
            {path.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {path.estimatedDuration}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">{path.difficulty}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {completedLessons}/{totalLessons} lessons
            </span>
          </div>
          <Progress value={path.progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-muted-foreground">
            Updated {formatRelativeTime(path.updatedAt)}
          </div>
          <Button size="sm" asChild>
            <Link to={`/learn/${path.id}`}>
              {path.status === "completed" ? "Review" : "Continue"}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
