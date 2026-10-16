"use client";

import { MinusIcon, PlusIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export function QuantitySelector({ value, onChange, min = 1, max, size = "md", label = "Quantity", className }: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max: number;
  size?: "sm" | "md";
  label?: string;
  className?: string;
}) {
  const btn = "grid place-items-center rounded-full transition-opacity disabled:opacity-30 hover:opacity-70";
  return (
    <div role="group" aria-label={label}
      className={cn("inline-flex items-center justify-between rounded-full bg-surface", size === "sm" ? "h-8 w-[105px] px-3 lg:h-11 lg:w-[126px] lg:px-5" : "h-11 w-[110px] px-4 lg:h-[52px] lg:w-[170px] lg:px-5", className)}>
      <button type="button" className={btn} onClick={() => onChange(value - 1)} disabled={value <= min} aria-label="Decrease quantity">
        <MinusIcon size={size === "sm" ? 16 : 20} />
      </button>
      <output className="min-w-6 text-center text-sm font-medium lg:text-base" aria-live="polite">{value}</output>
      <button type="button" className={btn} onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="Increase quantity">
        <PlusIcon size={size === "sm" ? 16 : 20} />
      </button>
    </div>
  );
}
