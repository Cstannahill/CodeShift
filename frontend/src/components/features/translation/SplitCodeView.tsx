// src/features/translation/SplitCodeView.tsx
import { CodeEditor } from "@/components/CodeEditor/CodeEditor";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Copy, Download, Share } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface SplitCodeViewProps {
  sourceCode: string;
  targetCode: string;
  sourceLanguage: string;
  targetLanguage: string;
  sourceFramework?: string;
  targetFramework?: string;
  onSourceChange?: (code: string) => void;
  readOnly?: boolean;
  className?: string;
}

export function SplitCodeView({
  sourceCode,
  targetCode,
  sourceLanguage,
  targetLanguage,
  sourceFramework,
  targetFramework,
  onSourceChange,
  readOnly = false,
  className,
}: SplitCodeViewProps) {
  const handleCopyTarget = async () => {
    try {
      await navigator.clipboard.writeText(targetCode);
      // Could show a toast notification here
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([targetCode], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `translated.${targetLanguage === "typescript" ? "ts" : "js"}`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-4 h-[600px]",
        className
      )}
    >
      {/* Source Code */}
      <Card className="flex flex-col">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <h3 className="font-semibold">Source Code</h3>
            <div className="flex items-center gap-2 mt-1">
              {sourceFramework && (
                <Badge variant="secondary" className="text-xs">
                  {sourceFramework}
                </Badge>
              )}
              <Badge variant="outline" className="text-xs">
                {sourceLanguage}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <CodeEditor
            value={sourceCode}
            onChange={onSourceChange}
            language={sourceLanguage}
            readOnly={readOnly}
            height="100%"
          />
        </CardContent>
      </Card>

      {/* Target Code */}
      <Card className="flex flex-col">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
          <div>
            <h3 className="font-semibold">Translated Code</h3>
            <div className="flex items-center gap-2 mt-1">
              {targetFramework && (
                <Badge variant="secondary" className="text-xs">
                  {targetFramework}
                </Badge>
              )}
              <Badge variant="outline" className="text-xs">
                {targetLanguage}
              </Badge>
            </div>
          </div>

          {targetCode && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyTarget}
                title="Copy to clipboard"
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDownload}
                title="Download file"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" title="Share translation">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="flex-1 p-0">
          <CodeEditor
            value={targetCode}
            language={targetLanguage}
            readOnly
            height="100%"
          />
        </CardContent>
      </Card>
    </div>
  );
}
