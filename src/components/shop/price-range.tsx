"use client";

import { formatPrice } from "@/lib/format";

const STEPS = 1000;

/**
 * Two-thumb price slider (values in whole dollars). Uses a quadratic scale so
 * the common low price range stays precise even when a few items cost thousands.
 */
export function PriceRange({ min, max, value, onChange }: {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}) {
  const span = Math.max(1, max - min);
  const toPos = (v: number) => Math.round(Math.sqrt(Math.min(1, Math.max(0, (v - min) / span))) * STEPS);
  const toValue = (pos: number) => {
    const raw = min + span * (pos / STEPS) ** 2;
    const nice = raw < 100 ? 1 : raw < 1000 ? 5 : 50;
    return Math.min(max, Math.max(min, Math.round(raw / nice) * nice));
  };
  const [lo, hi] = value;
  const loPos = toPos(lo);
  const hiPos = toPos(hi);
  const pct = (pos: number) => (pos / STEPS) * 100;

  return (
    <div className="px-1 pb-1 pt-4">
      <div className="relative h-5">
        <div className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-surface" />
        <div className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-ink" style={{ left: `${pct(loPos)}%`, right: `${100 - pct(hiPos)}%` }} />
        <input type="range" min={0} max={STEPS} value={loPos} aria-label="Minimum price" aria-valuetext={formatPrice(lo * 100)}
          onChange={(e) => onChange([Math.min(toValue(Number(e.target.value)), hi), hi])}
          className="range-thumb absolute inset-0 w-full" />
        <input type="range" min={0} max={STEPS} value={hiPos} aria-label="Maximum price" aria-valuetext={formatPrice(hi * 100)}
          onChange={(e) => onChange([lo, Math.max(toValue(Number(e.target.value)), lo)])}
          className="range-thumb absolute inset-0 w-full" />
      </div>
      <div className="mt-2 flex justify-between text-sm font-medium">
        <span>{formatPrice(lo * 100)}</span>
        <span>{formatPrice(hi * 100)}</span>
      </div>
    </div>
  );
}
