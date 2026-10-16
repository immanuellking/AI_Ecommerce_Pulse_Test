import Link from "next/link";
import { CloseIcon } from "@/components/ui/icons";
import { hasActiveFilters, shopHref } from "@/lib/filters";
import { formatPrice } from "@/lib/format";
import { DRESS_STYLES } from "@/lib/store-config";
import type { Category, ProductFilters } from "@/types";

export function ActiveFilters({ filters, categories }: { filters: ProductFilters; categories: Category[] }) {
  if (!hasActiveFilters(filters)) return null;
  const base = { ...filters, page: 1 };
  const chips: { label: string; href: string }[] = [];
  if (filters.q) chips.push({ label: `“${filters.q}”`, href: shopHref({ ...base, q: undefined }) });
  if (filters.category) chips.push({ label: categories.find((c) => c.id === filters.category)?.name ?? filters.category, href: shopHref({ ...base, category: undefined }) });
  if (filters.style) chips.push({ label: DRESS_STYLES.find((s) => s.id === filters.style)?.name ?? filters.style, href: shopHref({ ...base, style: undefined }) });
  if (filters.brand) chips.push({ label: filters.brand, href: shopHref({ ...base, brand: undefined }) });
  if (filters.color) chips.push({ label: filters.color, href: shopHref({ ...base, color: undefined }) });
  if (filters.size) chips.push({ label: `Size ${filters.size}`, href: shopHref({ ...base, size: undefined }) });
  if (filters.minPrice != null || filters.maxPrice != null)
    chips.push({
      label: `${filters.minPrice != null ? formatPrice(filters.minPrice) : "Any"} – ${filters.maxPrice != null ? formatPrice(filters.maxPrice) : "Any"}`,
      href: shopHref({ ...base, minPrice: undefined, maxPrice: undefined }),
    });
  if (filters.sale) chips.push({ label: "On sale", href: shopHref({ ...base, sale: undefined }) });
  if (filters.inStock) chips.push({ label: "In stock", href: shopHref({ ...base, inStock: undefined }) });

  return (
    <ul className="mb-5 flex flex-wrap items-center gap-2" aria-label="Active filters">
      {chips.map((c) => (
        <li key={c.label}>
          <Link href={c.href} className="flex items-center gap-1.5 rounded-full bg-surface py-1.5 pl-3.5 pr-2.5 text-sm hover:bg-line" aria-label={`Remove filter ${c.label}`}>
            {c.label} <CloseIcon size={14} />
          </Link>
        </li>
      ))}
      <li><Link href={shopHref({ sort: filters.sort })} className="px-2 text-sm font-medium underline underline-offset-4">Clear all</Link></li>
    </ul>
  );
}
