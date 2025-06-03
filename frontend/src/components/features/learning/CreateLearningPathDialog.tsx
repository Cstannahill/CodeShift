// src/features/learning/CreateLearningPathDialog.tsx
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Card, CardContent } from "@/components/ui/Card";
import { Slider } from "@/components/ui/Slider";
import { Badge } from "@/components/ui/Badge";
import {
  FRAMEWORK_OPTIONS,
  TIME_COMMITMENTS,
  LEARNING_STYLES,
} from "@/lib/utils/constants";
import type { CreateLearningPathRequest } from "@/types";

interface CreateLearningPathDialogProps {
  onSubmit: (request: CreateLearningPathRequest) => void;
  isLoading?: boolean;
}

export function CreateLearningPathDialog({
  onSubmit,
  isLoading,
}: CreateLearningPathDialogProps) {
  const [fromTechnology, setFromTechnology] = useState("");
  const [toTechnology, setToTechnology] = useState("");
  const [proficiencyTarget, setProficiencyTarget] = useState([8]);
  const [timeCommitment, setTimeCommitment] = useState("moderate");
  const [learningStyle, setLearningStyle] = useState("practical");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fromTechnology || !toTechnology) return;

    onSubmit({
      fromTechnology,
      toTechnology,
      proficiencyTarget: proficiencyTarget[0],
      timeCommitment: timeCommitment as any,
      learningStyle: learningStyle as any,
    });
  };

  const canSubmit =
    fromTechnology && toTechnology && fromTechnology !== toTechnology;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">From Technology</label>
          <Select value={fromTechnology} onValueChange={setFromTechnology}>
            <SelectTrigger>
              <SelectValue placeholder="What do you know?" />
            </SelectTrigger>
            <SelectContent>
              {FRAMEWORK_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">To Technology</label>
          <Select value={toTechnology} onValueChange={setToTechnology}>
            <SelectTrigger>
              <SelectValue placeholder="What do you want to learn?" />
            </SelectTrigger>
            <SelectContent>
              {FRAMEWORK_OPTIONS.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.value === fromTechnology}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">
            Target Proficiency Level
          </label>
          <Badge variant="outline">{proficiencyTarget[0]}/10</Badge>
        </div>
        <Slider
          value={proficiencyTarget}
          onValueChange={setProficiencyTarget}
          max={10}
          min={1}
          step={1}
          className="w-full"
        />
        <div className="text-xs text-muted-foreground">
          How proficient do you want to become in{" "}
          {toTechnology || "the target technology"}?
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Time Commitment</label>
          <Select value={timeCommitment} onValueChange={setTimeCommitment}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIME_COMMITMENTS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Learning Style</label>
          <Select value={learningStyle} onValueChange={setLearningStyle}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LEARNING_STYLES.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {fromTechnology && toTechnology && (
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-2">Learning Path Preview</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              <p>
                • Personalized curriculum based on your {fromTechnology}{" "}
                knowledge
              </p>
              <p>• Step-by-step progression to {toTechnology}</p>
              <p>• Interactive examples and exercises</p>
              <p>• Real-world project applications</p>
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={!canSubmit || isLoading}
        loading={isLoading}
      >
        Create Learning Path
      </Button>
    </form>
  );
}
