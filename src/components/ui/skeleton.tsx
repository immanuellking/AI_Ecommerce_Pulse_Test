import { cn } from "@/lib/cn";

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse rounded-[20px] bg-surface", className)} aria-hidden="true" />
);

export function ProductCardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-square w-full" />
      <Skeleton className="mt-4 h-5 w-3/4 rounded-full" />
      <Skeleton className="mt-2 h-4 w-1/2 rounded-full" />
      <Skeleton className="mt-2 h-6 w-1/3 rounded-full" />
    </div>
  );
}
