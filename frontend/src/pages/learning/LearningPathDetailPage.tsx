// src/features/learning/LearningPathDetailPage.tsx
import { useParams, Link } from "react-router-dom";
import {
  useLearningPath,
  useCompleteLesson,
} from "@/hooks/queries/useLearning";
import { LoadingPage } from "@/components/layouts/LoadingPage";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import {
  ArrowLeft,
  PlayCircle,
  CheckCircle,
  Clock,
  Target,
  Book,
  Code,
  Trophy,
  ChevronRight,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";

export default function LearningPathDetailPage() {
  const { pathId } = useParams<{ pathId: string }>();
  const { data: learningPath, isLoading, error } = useLearningPath(pathId!);
  const completeMutation = useCompleteLesson();

  const handleCompleteLesson = (lessonId: string) => {
    if (!pathId) return;

    completeMutation.mutate({ pathId, lessonId });
  };

  if (isLoading) {
    return <LoadingPage message="Loading learning path..." />;
  }

  if (error || !learningPath) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Learning path not found</h2>
        <p className="text-muted-foreground mb-4">
          The learning path you're looking for doesn't exist or has been
          removed.
        </p>
        <Button asChild>
          <Link to="/learn">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Learning Paths
          </Link>
        </Button>
      </div>
    );
  }

  const completedLessons = learningPath.lessons.filter(
    (lesson) => lesson.completed
  ).length;
  const totalLessons = learningPath.lessons.length;
  const nextLesson = learningPath.lessons.find((lesson) => !lesson.completed);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/learn">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Learning Paths
              </Link>
            </Button>
            <span className="text-muted-foreground">/</span>
            <h1 className="text-2xl font-bold">{learningPath.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{learningPath.from.technology}</Badge>
            <span className="text-muted-foreground">→</span>
            <Badge variant="outline">{learningPath.to.technology}</Badge>
            <Badge variant="secondary">{learningPath.difficulty}</Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {nextLesson && (
            <Button>
              <PlayCircle className="h-4 w-4 mr-2" />
              Continue Learning
            </Button>
          )}
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Progress</div>
              <div className="text-2xl font-bold">{learningPath.progress}%</div>
              <Progress value={learningPath.progress} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                Lessons Completed
              </div>
              <div className="text-2xl font-bold">
                {completedLessons}/{totalLessons}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Duration</div>
              <div className="text-2xl font-bold">
                {learningPath.estimatedDuration}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Last Updated</div>
              <div className="text-lg font-medium">
                {formatRelativeTime(learningPath.updatedAt)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="lessons" className="space-y-6">
        <TabsList>
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="lessons">
          <div className="space-y-4">
            {learningPath.lessons.map((lesson, index) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                index={index}
                onComplete={() => handleCompleteLesson(lesson.id)}
                isCompleting={completeMutation.isPending}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="overview">
          <OverviewTab learningPath={learningPath} />
        </TabsContent>

        <TabsContent value="progress">
          <ProgressTab learningPath={learningPath} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Lesson Card Component
interface LessonCardProps {
  lesson: any;
  index: number;
  onComplete: () => void;
  isCompleting: boolean;
}

function LessonCard({
  lesson,
  index,
  onComplete,
  isCompleting,
}: LessonCardProps) {
  const getLessonIcon = (type: string) => {
    switch (type) {
      case "concept":
        return <Book className="h-4 w-4" />;
      case "practice":
        return <Code className="h-4 w-4" />;
      case "project":
        return <Trophy className="h-4 w-4" />;
      default:
        return <PlayCircle className="h-4 w-4" />;
    }
  };

  return (
    <Card
      className={cn(
        "transition-all duration-200",
        lesson.completed ? "bg-green-50 border-green-200" : "hover:shadow-md"
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
              lesson.completed
                ? "bg-green-600 text-white"
                : "bg-muted text-muted-foreground"
            )}
          >
            {lesson.completed ? <CheckCircle className="h-4 w-4" /> : index + 1}
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{lesson.title}</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  {getLessonIcon(lesson.type)}
                  {lesson.type}
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {lesson.estimatedTime}m
                </Badge>
              </div>
            </div>

            <p className="text-muted-foreground">{lesson.description}</p>

            {lesson.objectives.length > 0 && (
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Learning Objectives:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {lesson.objectives.slice(0, 3).map((objective, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Target className="h-3 w-3 mt-1 flex-shrink-0" />
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              {lesson.completed && lesson.completedAt && (
                <div className="text-xs text-muted-foreground">
                  Completed {formatRelativeTime(lesson.completedAt)}
                </div>
              )}
              <div className="flex items-center gap-2 ml-auto">
                {!lesson.completed && (
                  <Button size="sm" onClick={onComplete} loading={isCompleting}>
                    Mark Complete
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  View Lesson
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function OverviewTab({ learningPath }: { learningPath: any }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Learning Goals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">
              From: {learningPath.from.technology}
            </h4>
            <p className="text-sm text-muted-foreground">
              Current proficiency: {learningPath.from.currentProficiency}/10
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">
              To: {learningPath.to.technology}
            </h4>
            <p className="text-sm text-muted-foreground">
              Target proficiency: {learningPath.to.targetProficiency}/10
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prerequisites</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {learningPath.prerequisites.map((prereq: string) => (
              <Badge key={prereq} variant="outline">
                {prereq}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ProgressTab({ learningPath }: { learningPath: any }) {
  const lessonsByType = learningPath.lessons.reduce((acc: any, lesson: any) => {
    acc[lesson.type] = (acc[lesson.type] || 0) + 1;
    return acc;
  }, {});

  const completedByType = learningPath.lessons.reduce(
    (acc: any, lesson: any) => {
      if (lesson.completed) {
        acc[lesson.type] = (acc[lesson.type] || 0) + 1;
      }
      return acc;
    },
    {}
  );

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Lesson Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(lessonsByType).map(([type, count]: [string, any]) => (
            <div key={type} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="capitalize">{type}</span>
                <span>
                  {completedByType[type] || 0}/{count}
                </span>
              </div>
              <Progress
                value={((completedByType[type] || 0) / count) * 100}
                className="h-2"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Time Investment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold">
                {learningPath.lessons.reduce(
                  (acc: number, lesson: any) => acc + lesson.estimatedTime,
                  0
                )}
              </div>
              <div className="text-sm text-muted-foreground">Total minutes</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-medium">
                {learningPath.lessons
                  .filter((l: any) => l.completed)
                  .reduce(
                    (acc: number, lesson: any) => acc + lesson.estimatedTime,
                    0
                  )}
              </div>
              <div className="text-sm text-muted-foreground">
                Minutes completed
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
