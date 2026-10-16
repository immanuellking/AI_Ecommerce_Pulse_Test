import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container-page" aria-busy="true" aria-label="Loading product">
      <Skeleton className="my-6 h-5 w-64 rounded-full" />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,610px)_minmax(0,1fr)] lg:gap-10">
        <Skeleton className="aspect-[358/290] lg:aspect-auto lg:h-[530px]" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4 rounded-full" />
          <Skeleton className="h-5 w-40 rounded-full" />
          <Skeleton className="h-8 w-48 rounded-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-12 w-full rounded-full" />
        </div>
      </div>
    </div>
  );
}
