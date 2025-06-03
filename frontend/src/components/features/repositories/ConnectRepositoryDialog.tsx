// src/features/repositories/ConnectRepositoryDialog.tsx
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { GitBranch, Github, Link as LinkIcon } from "lucide-react";
import { isValidGithubUrl } from "@/lib/utils/validation";
import { cn } from "@/lib/utils/cn";

interface ConnectRepositoryDialogProps {
  onConnect: (githubUrl: string, branch?: string) => void;
  isConnecting?: boolean;
}

export function ConnectRepositoryDialog({
  onConnect,
  isConnecting,
}: ConnectRepositoryDialogProps) {
  const [githubUrl, setGithubUrl] = useState("");
  const [branch, setBranch] = useState("main");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!githubUrl.trim()) {
      setError("GitHub URL is required");
      return;
    }

    if (!isValidGithubUrl(githubUrl)) {
      setError("Please enter a valid GitHub repository URL");
      return;
    }

    onConnect(githubUrl.trim(), branch.trim() || "main");
  };

  const isValid = githubUrl.trim() && isValidGithubUrl(githubUrl);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Github className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>Connect Repository</CardTitle>
        <CardDescription>
          Connect a GitHub repository to analyze your code and track skills
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="github-url" className="text-sm font-medium">
              GitHub Repository URL
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="github-url"
                type="url"
                placeholder="https://github.com/username/repository"
                value={githubUrl}
                onChange={(e) => {
                  setGithubUrl(e.target.value);
                  setError("");
                }}
                className={cn(
                  "pl-10",
                  error && "border-destructive focus-visible:ring-destructive"
                )}
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="branch" className="text-sm font-medium">
              Branch
            </label>
            <div className="relative">
              <GitBranch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="branch"
                placeholder="main"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-lg border p-3 bg-muted/50">
            <h4 className="text-sm font-medium mb-2">What happens next?</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Repository will be cloned and analyzed</li>
              <li>• Technologies and frameworks will be detected</li>
              <li>• Code quality metrics will be calculated</li>
              <li>• Your skill profile will be updated</li>
            </ul>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!isValid || isConnecting}
            loading={isConnecting}
          >
            {isConnecting ? "Connecting..." : "Connect Repository"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Only public repositories are supported.{" "}
            <Badge variant="outline" className="text-xs">
              Private repos coming soon
            </Badge>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
