"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { PriceRange } from "@/components/shop/price-range";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronDown, ChevronRight, ChevronUp, CloseIcon, SlidersIcon } from "@/components/ui/icons";
import { shopHref } from "@/lib/filters";
import { DRESS_STYLES } from "@/lib/store-config";
import { cn } from "@/lib/cn";
import type { Category, ColorOption, ProductFilters } from "@/types";

export interface Facets {
  colors: ColorOption[];
  sizes: string[];
  minPrice: number; // cents
  maxPrice: number; // cents
}

function Group({ title, children, defaultOpen = true }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-line py-5 lg:py-6">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open}
        className="flex w-full items-center justify-between text-xl font-bold">
        {title} {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {open && <div className="mt-4 lg:mt-5">{children}</div>}
    </div>
  );
}

/**
 * Filters from the design: categories and dress styles navigate immediately;
 * price, colour and size are staged and applied with "Apply Filter".
 */
export function FilterPanel({ filters, categories, facets, onClose, onApplied }: {
  filters: ProductFilters;
  categories: Category[];
  facets: Facets;
  onClose?: () => void;
  onApplied?: () => void;
}) {
  const router = useRouter();
  const minD = facets.minPrice / 100;
  const maxD = facets.maxPrice / 100;
  const [price, setPrice] = useState<[number, number]>([
    filters.minPrice != null ? filters.minPrice / 100 : minD,
    filters.maxPrice != null ? filters.maxPrice / 100 : maxD,
  ]);
  const [color, setColor] = useState(filters.color);
  const [size, setSize] = useState(filters.size);

  const apply = () => {
    router.push(shopHref({
      ...filters,
      minPrice: price[0] > minD ? Math.round(price[0] * 100) : undefined,
      maxPrice: price[1] < maxD ? Math.round(price[1] * 100) : undefined,
      color,
      size,
      page: 1,
    }));
    onApplied?.();
  };

  const linkCls = (active: boolean) =>
    cn("flex items-center justify-between py-1 text-base hover:text-ink", active ? "font-medium text-ink" : "text-muted");

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between pb-6">
        <h2 className="text-xl font-bold">Filters</h2>
        {onClose ? (
          <button type="button" onClick={onClose} aria-label="Close filters" className="text-subtle hover:text-ink"><CloseIcon /></button>
        ) : (
          <SlidersIcon className="text-subtle" />
        )}
      </div>

      <ul className="space-y-1.5 border-t border-line py-5 lg:py-6" aria-label="Categories">
        {categories.map((c) => {
          const active = filters.category === c.id;
          return (
            <li key={c.id}>
              <Link href={shopHref({ ...filters, category: active ? undefined : c.id, page: 1 })} onClick={onApplied}
                className={linkCls(active)} aria-current={active ? "true" : undefined}>
                {c.name} {active ? <CloseIcon size={16} /> : <ChevronRight size={16} />}
              </Link>
            </li>
          );
        })}
      </ul>

      <Group title="Price">
        <PriceRange min={minD} max={maxD} value={price} onChange={setPrice} />
      </Group>

      {facets.colors.length > 0 && (
        <Group title="Colors">
          <ul className="flex flex-wrap gap-3 lg:gap-4" aria-label="Colors">
            {facets.colors.map((c) => {
              const active = color === c.name;
              const light = ["White", "Yellow"].includes(c.name);
              return (
                <li key={c.name}>
                  <button type="button" onClick={() => setColor(active ? undefined : c.name)} aria-pressed={active}
                    aria-label={c.name} title={c.name}
                    className={cn("grid size-[37px] place-items-center rounded-full border-2 border-line transition-transform hover:scale-110",
                      active && "ring-2 ring-ink ring-offset-2")}
                    style={{ background: c.hex }}>
                    {active && <CheckIcon size={16} strokeWidth={3} className={light ? "text-ink" : "text-paper"} />}
                  </button>
                </li>
              );
            })}
          </ul>
        </Group>
      )}

      {facets.sizes.length > 0 && (
        <Group title="Size">
          <ul className="flex flex-wrap gap-2" aria-label="Sizes">
            {facets.sizes.map((s) => {
              const active = size === s;
              return (
                <li key={s}>
                  <button type="button" onClick={() => setSize(active ? undefined : s)} aria-pressed={active}
                    className={cn("rounded-full px-5 py-2.5 text-sm transition-colors",
                      active ? "bg-ink text-paper" : "bg-surface text-muted hover:bg-line")}>
                    {s}
                  </button>
                </li>
              );
            })}
          </ul>
        </Group>
      )}

      <Group title="Dress Style">
        <ul className="space-y-1.5">
          {DRESS_STYLES.map((s) => {
            const active = filters.style === s.id;
            return (
              <li key={s.id}>
                <Link href={shopHref({ ...filters, style: active ? undefined : s.id, page: 1 })} onClick={onApplied}
                  className={linkCls(active)} aria-current={active ? "true" : undefined}>
                  {s.name} {active ? <CloseIcon size={16} /> : <ChevronRight size={16} />}
                </Link>
              </li>
            );
          })}
        </ul>
      </Group>

      <Button type="button" onClick={apply} className="mt-1 w-full">Apply Filter</Button>
    </div>
  );
}
