"use client";

import { useRouter } from "next/navigation";
import { ChevronDown } from "@/components/ui/icons";
import { shopHref } from "@/lib/filters";
import { SORT_OPTIONS } from "@/lib/store-config";
import type { ProductFilters, SortOption } from "@/types";

export function SortSelect({ filters }: { filters: ProductFilters }) {
  const router = useRouter();
  return (
    <label className="relative flex items-center gap-1 whitespace-nowrap text-sm text-muted lg:text-base">
      Sort by:
      <select value={filters.sort ?? "popular"}
        onChange={(e) => router.push(shopHref({ ...filters, sort: e.target.value as SortOption, page: 1 }))}
        className="cursor-pointer appearance-none bg-transparent pr-6 font-medium text-ink outline-none focus-visible:underline">
        {SORT_OPTIONS.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
      </select>
      <ChevronDown size={16} className="pointer-events-none absolute right-0 text-ink" />
    </label>
  );
}
