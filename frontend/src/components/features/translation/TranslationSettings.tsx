// src/features/translation/TranslationSettings.tsx
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Switch } from "@/components/ui/Switch";
import { Slider } from "@/components/ui/Slider";
import { Separator } from "@/components/ui/Separator";
import { Settings, Zap, Shield, Code, FileText } from "lucide-react";

interface TranslationOptions {
  preserveStructure: boolean;
  modernSyntax: boolean;
  includeTypes: boolean;
  generateComments: boolean;
  optimizePerformance: boolean;
  confidenceThreshold: number;
}

interface TranslationSettingsProps {
  options: TranslationOptions;
  onChange: (options: TranslationOptions) => void;
  className?: string;
}

export function TranslationSettings({
  options,
  onChange,
  className,
}: TranslationSettingsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateOption = <K extends keyof TranslationOptions>(
    key: K,
    value: TranslationOptions[K]
  ) => {
    onChange({ ...options, [key]: value });
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Translation Settings
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-6">
          {/* Code Quality */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <h4 className="font-medium">Code Quality</h4>
            </div>

            <div className="space-y-3 pl-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">
                    Preserve Structure
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Maintain original code organization and patterns
                  </p>
                </div>
                <Switch
                  checked={options.preserveStructure}
                  onCheckedChange={(checked) =>
                    updateOption("preserveStructure", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Modern Syntax</label>
                  <p className="text-xs text-muted-foreground">
                    Use latest language features and patterns
                  </p>
                </div>
                <Switch
                  checked={options.modernSyntax}
                  onCheckedChange={(checked) =>
                    updateOption("modernSyntax", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Include Types</label>
                  <p className="text-xs text-muted-foreground">
                    Add TypeScript type annotations
                  </p>
                </div>
                <Switch
                  checked={options.includeTypes}
                  onCheckedChange={(checked) =>
                    updateOption("includeTypes", checked)
                  }
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Performance */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <h4 className="font-medium">Performance</h4>
            </div>

            <div className="space-y-3 pl-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">
                    Optimize Performance
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Apply performance optimizations automatically
                  </p>
                </div>
                <Switch
                  checked={options.optimizePerformance}
                  onCheckedChange={(checked) =>
                    updateOption("optimizePerformance", checked)
                  }
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">
                    Confidence Threshold
                  </label>
                  <Badge variant="outline" className="text-xs">
                    {Math.round(options.confidenceThreshold * 100)}%
                  </Badge>
                </div>
                <Slider
                  value={[options.confidenceThreshold]}
                  onValueChange={([value]) =>
                    updateOption("confidenceThreshold", value)
                  }
                  max={1}
                  min={0.5}
                  step={0.05}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Minimum confidence required for automatic translation
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Documentation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <h4 className="font-medium">Documentation</h4>
            </div>

            <div className="pl-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">
                    Generate Comments
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Add explanatory comments for complex translations
                  </p>
                </div>
                <Switch
                  checked={options.generateComments}
                  onCheckedChange={(checked) =>
                    updateOption("generateComments", checked)
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
