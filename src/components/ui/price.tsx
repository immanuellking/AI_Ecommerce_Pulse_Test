import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

const SIZES = { sm: "text-xl lg:text-2xl", md: "text-2xl lg:text-[32px]", lg: "text-2xl lg:text-[32px]" } as const;

export function Price({ price, compareAt, discountPercent, size = "sm", className }: {
  price: number;
  compareAt?: number;
  discountPercent?: number;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-2.5 gap-y-1 font-bold", SIZES[size], className)}>
      <span>{formatPrice(price)}</span>
      {compareAt && compareAt > price && (
        <>
          <span className="text-subtle line-through" aria-label={`was ${formatPrice(compareAt)}`}>{formatPrice(compareAt)}</span>
          {!!discountPercent && <DiscountBadge percent={discountPercent} size={size} />}
        </>
      )}
    </div>
  );
}

export function DiscountBadge({ percent, size = "sm" }: { percent: number; size?: keyof typeof SIZES }) {
  return (
    <span className={cn("rounded-full bg-sale/10 font-medium text-sale", size === "sm" ? "px-2.5 py-1 text-[10px] lg:px-3.5 lg:py-1.5 lg:text-xs" : "px-3.5 py-1.5 text-xs lg:text-base")}>
      -{percent}%
    </span>
  );
}
