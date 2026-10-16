import Link from "next/link";
import { ArrowLeft, ArrowRight } from "@/components/ui/icons";
import { shopHref } from "@/lib/filters";
import { cn } from "@/lib/cn";
import type { ProductFilters } from "@/types";

function pageList(page: number, count: number): (number | "…")[] {
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const set = new Set([1, 2, count - 1, count, page - 1, page, page + 1].filter((p) => p >= 1 && p <= count));
  const sorted = [...set].sort((a, b) => a - b);
  return sorted.flatMap((p, i) => (i > 0 && p - sorted[i - 1] > 1 ? ["…" as const, p] : [p]));
}

export function Pagination({ filters, page, pageCount }: { filters: ProductFilters; page: number; pageCount: number }) {
  if (pageCount <= 1) return null;
  const edge = "flex h-9 items-center gap-2 rounded-lg border border-line px-3 text-sm font-medium hover:bg-surface lg:h-10 lg:px-3.5";
  const disabled = "pointer-events-none opacity-40";
  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-between gap-2 border-t border-line pt-5">
      <Link href={shopHref({ ...filters, page: page - 1 })} className={cn(edge, page <= 1 && disabled)} aria-disabled={page <= 1}>
        <ArrowLeft size={20} /> <span className="hidden sm:inline">Previous</span>
      </Link>
      <ol className="flex items-center gap-0.5">
        {pageList(page, pageCount).map((p, i) => (
          <li key={i}>
            {p === "…" ? (
              <span className="grid size-9 place-items-center text-sm text-muted lg:size-10">…</span>
            ) : (
              <Link href={shopHref({ ...filters, page: p })} aria-current={p === page ? "page" : undefined}
                className={cn("grid size-9 place-items-center rounded-lg text-sm font-medium lg:size-10",
                  p === page ? "bg-surface text-ink" : "text-muted hover:bg-surface")}>
                {p}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <Link href={shopHref({ ...filters, page: page + 1 })} className={cn(edge, page >= pageCount && disabled)} aria-disabled={page >= pageCount}>
        <span className="hidden sm:inline">Next</span> <ArrowRight size={20} />
      </Link>
    </nav>
  );
}
