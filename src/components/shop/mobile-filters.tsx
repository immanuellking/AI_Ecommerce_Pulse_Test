"use client";

import { useEffect, useState } from "react";
import { FilterPanel, type Facets } from "@/components/shop/filter-panel";
import { SlidersIcon } from "@/components/ui/icons";
import type { Category, ProductFilters } from "@/types";

/** Bottom sheet holding the filter panel on small screens. */
export function MobileFilters(props: { filters: ProductFilters; categories: Category[]; facets: Facets }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label="Open filters" aria-expanded={open}
        className="grid size-8 shrink-0 place-items-center rounded-full bg-surface lg:hidden">
        <SlidersIcon size={16} />
      </button>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 animate-fade-in bg-ink/30" onClick={() => setOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 max-h-[90dvh] animate-sheet-in overflow-y-auto rounded-t-[20px] bg-paper px-5 pb-8 pt-5">
            <FilterPanel {...props} onClose={() => setOpen(false)} onApplied={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
