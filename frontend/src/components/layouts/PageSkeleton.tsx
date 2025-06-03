// src/components/layouts/PageSkeleton.tsx
import {
  SkeletonCard,
  SkeletonButton,
  SkeletonText,
} from "@/components/ui/Skeleton";

export function PageSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <SkeletonText lines={1} />
          <SkeletonText lines={1} />
        </div>
        <SkeletonButton />
      </div>

      {/* Content Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}
