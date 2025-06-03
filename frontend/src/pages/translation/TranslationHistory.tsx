// src/features/translation/TranslationHistory.tsx
import { useTranslationStore } from "@/lib/stores/translationStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/layouts/EmptyState";
import { History, Play, Trash2 } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils/format";

export function TranslationHistory() {
  const { history, setFrameworks, setSourceCode } = useTranslationStore();

  const handleReplay = (item: any) => {
    setFrameworks(item.sourceFramework, item.targetFramework);
    // In a real app, you'd load the original source code too
  };

  if (history.length === 0) {
    return (
      <EmptyState
        icon={<History className="h-8 w-8 text-muted-foreground" />}
        title="No translation history"
        description="Your recent translations will appear here for easy access and replay."
      />
    );
  }

  return (
    <div className="space-y-4">
      {history.map((item) => (
        <Card key={item.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{item.sourceFramework}</Badge>
                  <span className="text-muted-foreground">→</span>
                  <Badge variant="outline">{item.targetFramework}</Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{formatRelativeTime(item.timestamp)}</span>
                  <Badge
                    variant={item.confidence > 0.8 ? "success" : "warning"}
                    className="text-xs"
                  >
                    {Math.round(item.confidence * 100)}% confidence
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReplay(item)}
                >
                  <Play className="h-4 w-4 mr-1" />
                  Replay
                </Button>
                <Button size="sm" variant="ghost">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
