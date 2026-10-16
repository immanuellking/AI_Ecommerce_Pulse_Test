import { DRESS_STYLES, SORT_OPTIONS } from "@/lib/store-config";
import type { DressStyleId, ProductFilters, SortOption } from "@/types";

/** Converts between product filters and /shop URL search params (shared by server and client). */

export type SearchParams = Record<string, string | string[] | undefined>;

const SLUG = /^[a-z0-9-]{1,40}$/;

export function parseFilters(sp: SearchParams): ProductFilters {
  const one = (k: string) => {
    const v = sp[k];
    return (Array.isArray(v) ? v[0] : v)?.slice(0, 100);
  };
  const num = (k: string) => {
    const raw = one(k);
    const v = Number(raw);
    return raw != null && raw !== "" && Number.isFinite(v) && v >= 0 ? v : undefined;
  };
  const sort = one("sort") as SortOption | undefined;
  const category = one("category");
  const style = one("style") as DressStyleId | undefined;
  const min = num("min");
  const max = num("max");
  return {
    q: one("q")?.trim() || undefined,
    category: category && SLUG.test(category) ? category : undefined,
    style: style && DRESS_STYLES.some((s) => s.id === style) ? style : undefined,
    brand: one("brand") || undefined,
    color: one("color") || undefined,
    size: one("size") || undefined,
    minPrice: min != null ? Math.round(min * 100) : undefined,
    maxPrice: max != null ? Math.round(max * 100) : undefined,
    sale: one("sale") === "1" || undefined,
    inStock: one("stock") === "1" || undefined,
    sort: sort && SORT_OPTIONS.some((o) => o.id === sort) ? sort : undefined,
    page: Math.max(1, Math.floor(num("page") ?? 1) || 1),
  };
}

/** Builds a /shop URL. Page resets to 1 unless set explicitly. */
export function shopHref(filters: ProductFilters): string {
  const p = new URLSearchParams();
  const set = (k: string, v: string | number | boolean | undefined) => {
    if (v !== undefined && v !== "" && v !== false) p.set(k, String(v === true ? 1 : v));
  };
  set("q", filters.q);
  set("category", filters.category);
  set("style", filters.style);
  set("brand", filters.brand);
  set("color", filters.color);
  set("size", filters.size);
  set("min", filters.minPrice != null ? filters.minPrice / 100 : undefined);
  set("max", filters.maxPrice != null ? filters.maxPrice / 100 : undefined);
  set("sale", filters.sale);
  set("stock", filters.inStock);
  set("sort", filters.sort && filters.sort !== "popular" ? filters.sort : undefined);
  set("page", filters.page && filters.page > 1 ? filters.page : undefined);
  const qs = p.toString();
  return qs ? `/shop?${qs}` : "/shop";
}

export function hasActiveFilters(f: ProductFilters): boolean {
  return Boolean(f.q || f.category || f.style || f.brand || f.color || f.size || f.minPrice != null || f.maxPrice != null || f.sale || f.inStock);
}
