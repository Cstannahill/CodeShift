// src/features/profile/ProfilePage.tsx
import { useState } from "react";
import { useSkillProfile, useUpdateSkills } from "@/hooks/queries/useSkills";
import { useAuthStore } from "@/lib/stores/authStore";
import { useNotifications } from "@/hooks/common/useNotifications";
import { PageHeader } from "@/components/layouts/PageHeader";
import { LoadingPage } from "@/components/layouts/LoadingPage";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Slider } from "@/components/ui/Slider";
import {
  Settings,
  Trophy,
  TrendingUp,
  Calendar,
  Code,
  Target,
  Edit,
  Save,
  X,
  RefreshCw,
} from "lucide-react";
import { formatDate, formatSkillLevel } from "@/lib/utils/format";
import { getFrameworkColor } from "@/lib/utils/frameworks";
import { cn } from "@/lib/utils/cn";

export default function ProfilePage() {
  const { user, clearStorageAndLogout } = useAuthStore();
  const { data: skillProfile, isLoading } = useSkillProfile();
  const updateSkillsMutation = useUpdateSkills();
  const { showNotification } = useNotifications();
  const [editingSkills, setEditingSkills] = useState(false);
  const [skillUpdates, setSkillUpdates] = useState<Record<string, number>>({});

  if (isLoading) {
    return <LoadingPage message="Loading profile..." />;
  }

  if (!user || !skillProfile) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Profile not found</h2>
        <p className="text-muted-foreground">Unable to load profile data.</p>
      </div>
    );
  }

  const handleSkillUpdate = (technology: string, proficiency: number) => {
    setSkillUpdates((prev) => ({
      ...prev,
      [technology]: proficiency,
    }));
  };

  const handleSaveSkills = () => {
    const updates = Object.entries(skillUpdates).map(
      ([technology, proficiency]) => ({
        technology,
        proficiency,
      })
    );

    updateSkillsMutation.mutate(updates, {
      onSuccess: () => {
        setEditingSkills(false);
        setSkillUpdates({});
        showNotification({
          type: "success",
          title: "Skills updated",
          message: "Your skill levels have been updated successfully",
        });
      },
      onError: (error) => {
        showNotification({
          type: "error",
          title: "Update failed",
          message: error.message || "Failed to update skills",
        });
      },
    });
  };

  const handleCancelEdit = () => {
    setEditingSkills(false);
    setSkillUpdates({});
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        description="Manage your skills and preferences"
      >
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              clearStorageAndLogout();
              window.location.reload();
            }}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Info */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <Avatar size="lg">
                  <AvatarImage src={user.avatarUrl} alt={user.username} />
                  <AvatarFallback className="text-lg">
                    {user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                  <h2 className="text-xl font-bold">{user.username}</h2>
                  <p className="text-muted-foreground">{user.email}</p>
                  <Badge variant="secondary" className="capitalize">
                    {user.plan} Plan
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full text-center">
                  <div>
                    <div className="text-2xl font-bold">
                      {user.repositoriesCount}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Repositories
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">
                      {skillProfile.skills.length}
                    </div>
                    <div className="text-sm text-muted-foreground">Skills</div>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground">
                  Member since {formatDate(user.createdAt)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Trophy className="h-4 w-4 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Skill Explorer</div>
                  <div className="text-xs text-muted-foreground">
                    Tracked 5+ technologies
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Code className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">Code Translator</div>
                  <div className="text-xs text-muted-foreground">
                    Completed first translation
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="skills" className="space-y-6">
            <TabsList>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
            </TabsList>

            <TabsContent value="skills" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Skill Profile
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {editingSkills ? (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancelEdit}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSaveSkills}
                          loading={updateSkillsMutation.isPending}
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingSkills(true)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {skillProfile.skills.map((skill) => (
                      <SkillItem
                        key={skill.technology}
                        skill={skill}
                        isEditing={editingSkills}
                        onUpdate={handleSkillUpdate}
                        currentUpdate={skillUpdates[skill.technology]}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Strengths */}
              <Card>
                <CardHeader>
                  <CardTitle>Strengths</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skillProfile.strengths.map((strength) => (
                      <Badge key={strength} variant="secondary">
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Learning Velocity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Learning Velocity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-green-600">
                      Fast Learners
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillProfile.learningVelocity.fastLearners.map(
                        (tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="border-green-200 text-green-700"
                          >
                            {tech}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2 text-blue-600">
                      Steady Progress
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillProfile.learningVelocity.steadyProgress.map(
                        (tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="border-blue-200 text-blue-700"
                          >
                            {tech}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2 text-purple-600">
                      Recent Focus
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skillProfile.learningVelocity.recentFocus.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-purple-200 text-purple-700"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <ActivityTab />
            </TabsContent>

            <TabsContent value="learning">
              <LearningTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

// Skill Item Component
interface SkillItemProps {
  skill: any;
  isEditing: boolean;
  onUpdate: (technology: string, proficiency: number) => void;
  currentUpdate?: number;
}

function SkillItem({
  skill,
  isEditing,
  onUpdate,
  currentUpdate,
}: SkillItemProps) {
  const proficiency = currentUpdate ?? skill.proficiency;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: getFrameworkColor(skill.technology) }}
          />
          <div>
            <h4 className="font-medium">{skill.technology}</h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="outline" className="text-xs capitalize">
                {skill.category}
              </Badge>
              <span>•</span>
              <span>{skill.experience.projectCount} projects</span>
              <span>•</span>
              <span>{Math.round(skill.confidence * 100)}% confidence</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="font-medium">{proficiency.toFixed(1)}/10</div>
          <div className="text-xs text-muted-foreground">
            {formatSkillLevel(proficiency)}
          </div>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <Slider
            value={[proficiency]}
            onValueChange={([value]) => onUpdate(skill.technology, value)}
            max={10}
            min={1}
            step={0.5}
            className="w-full"
          />
          <div className="text-xs text-muted-foreground">
            Adjust your proficiency level for {skill.technology}
          </div>
        </div>
      ) : (
        <Progress value={proficiency * 10} className="h-2" />
      )}
    </div>
  );
}

function ActivityTab() {
  // Mock activity data
  const activities = [
    {
      type: "translation",
      title: "Translated React component to TypeScript",
      timestamp: "2024-01-22T15:30:00Z",
      confidence: 0.94,
    },
    {
      type: "learning",
      title: "Completed lesson: React Router setup",
      timestamp: "2024-01-21T14:15:00Z",
      progress: 67,
    },
    {
      type: "analysis",
      title: "Analyzed nextjs-dashboard repository",
      timestamp: "2024-01-20T10:30:00Z",
      technologies: ["Next.js", "TypeScript"],
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg border"
            >
              <div
                className={cn(
                  "p-2 rounded-full",
                  activity.type === "translation" &&
                    "bg-green-100 text-green-600",
                  activity.type === "learning" && "bg-blue-100 text-blue-600",
                  activity.type === "analysis" &&
                    "bg-purple-100 text-purple-600"
                )}
              >
                {activity.type === "translation" && (
                  <Code className="h-4 w-4" />
                )}
                {activity.type === "learning" && <Trophy className="h-4 w-4" />}
                {activity.type === "analysis" && (
                  <TrendingUp className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{activity.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {formatDate(activity.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function LearningTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No learning paths yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first learning path to track your progress.
          </p>
          <Button>Start Learning</Button>
        </div>
      </CardContent>
    </Card>
  );
}
