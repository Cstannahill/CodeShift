// src/components/layouts/LoadingPage.tsx
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { cn } from "@/lib/utils/cn";

interface LoadingPageProps {
  message?: string;
  className?: string;
}

export function LoadingPage({
  message = "Loading...",
  className,
}: LoadingPageProps) {
  return (
    <div
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-center gap-4",
        className
      )}
    >
      <LoadingSpinner size="lg" />
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
