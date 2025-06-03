// src/features/translation/TranslationResult.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import {
  CheckCircle,
  AlertTriangle,
  Info,
  ExternalLink,
  Lightbulb,
  Package,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface TranslationResultProps {
  confidence: number;
  warnings: string[];
  suggestions: string[];
  packageChanges?: Array<{
    from: string;
    to: string;
    version: string;
  }>;
  className?: string;
}

export function TranslationResult({
  confidence,
  warnings,
  suggestions,
  packageChanges = [],
  className,
}: TranslationResultProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-success";
    if (confidence >= 0.7) return "text-warning";
    return "text-destructive";
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.9) return "Excellent";
    if (confidence >= 0.8) return "Good";
    if (confidence >= 0.7) return "Fair";
    return "Needs Review";
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Confidence Score */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Translation Quality</CardTitle>
            <Badge
              variant="outline"
              className={cn("font-medium", getConfidenceColor(confidence))}
            >
              {getConfidenceLabel(confidence)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Confidence Score</span>
              <span
                className={cn("font-medium", getConfidenceColor(confidence))}
              >
                {Math.round(confidence * 100)}%
              </span>
            </div>
            <Progress value={confidence * 100} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {confidence >= 0.9
                ? "High confidence - ready to use with minimal review"
                : confidence >= 0.7
                  ? "Good confidence - review suggested changes"
                  : "Lower confidence - manual review recommended"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Package Changes */}
      {packageChanges.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5" />
              Package Changes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {packageChanges.map((change, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="font-mono">
                      {change.from || "New"}
                    </Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    <Badge variant="secondary" className="font-mono">
                      {change.to}@{change.version}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Warnings */}
      {warnings.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {warnings.map((warning, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-warning/10 border border-warning/20"
                >
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{warning}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20"
                >
                  <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{suggestion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" />
            Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button className="w-full">
              <Package className="h-4 w-4 mr-2" />
              Update Package.json
            </Button>
            <Button variant="outline" className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Migration Guide
            </Button>
            <Button variant="outline" className="w-full">
              <Lightbulb className="h-4 w-4 mr-2" />
              Create Learning Path
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
