import { ProductCardSkeleton, Skeleton } from "@/components/ui/skeleton";

export function ShopSkeleton() {
  return (
    <div className="container-page" aria-busy="true" aria-label="Loading products">
      <Skeleton className="my-6 h-5 w-40 rounded-full" />
      <div className="flex gap-5">
        <Skeleton className="hidden h-[900px] w-[295px] shrink-0 lg:block" />
        <div className="flex-1">
          <Skeleton className="mb-6 h-9 w-56 rounded-full" />
          <div className="grid grid-cols-2 gap-x-3.5 gap-y-6 md:grid-cols-3 lg:gap-x-5 lg:gap-y-9">
            {Array.from({ length: 6 }, (_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
