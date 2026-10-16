import { StarShape } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/** Star rating with half-star precision, plus an optional "4.5/5" label. */
export function Stars({ rating, size = 18, showValue = true, className }: { rating: number; size?: number; showValue?: boolean; className?: string }) {
  const rounded = Math.round(rating * 2) / 2;
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center gap-[3px]" role="img" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <StarShape key={i} size={size} fill={rounded >= i + 1 ? "full" : rounded >= i + 0.5 ? "half" : "empty"} />
        ))}
      </div>
      {showValue && (
        <span className="text-sm text-ink" aria-hidden="true">
          {rating.toFixed(1)}/<span className="text-muted">5</span>
        </span>
      )}
    </div>
  );
}
