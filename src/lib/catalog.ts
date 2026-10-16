import { cacheLife } from "next/cache";
import { fetchAllProducts, fetchCategories, fetchProduct, idFromSlug, toProduct, type ApiProduct } from "@/lib/api";
import type {
  Category,
  ColorOption,
  Product,
  ProductFilters,
  ProductPage,
  ProductTag,
  Review,
  SortOption,
} from "@/types";
import { COLOR_SWATCHES, DRESS_STYLES, PAGE_SIZE, STORE_CATEGORIES } from "@/lib/store-config";

/**
 * Data-access layer for the product catalog, backed by the DummyJSON API.
 * Pages only call these functions. The API is fetched once and cached for an
 * hour; filtering, sorting and pagination run here because the API can't
 * filter by price, colour or size.
 */

const NEW_ARRIVAL_COUNT = 12;
const SALE_MIN_DISCOUNT = 10;

const inStore = (p: ApiProduct) => (STORE_CATEGORIES as readonly string[]).includes(p.category);

async function loadCatalog(): Promise<Product[]> {
  "use cache";
  cacheLife("hours");
  const raw = (await fetchAllProducts()).filter(inStore);
  const newest = new Set(
    [...raw]
      .sort((a, b) => (b.meta?.createdAt ?? "").localeCompare(a.meta?.createdAt ?? ""))
      .slice(0, NEW_ARRIVAL_COUNT)
      .map((p) => p.id),
  );
  return raw.map((p) => toProduct(p, deriveTags(p, newest)));
}

function deriveTags(p: ApiProduct, newest: Set<number>): ProductTag[] {
  const tags: ProductTag[] = [];
  if (p.discountPercentage >= SALE_MIN_DISCOUNT) tags.push("sale");
  if (p.rating >= 4.5 && p.stock > 0) tags.push("bestseller");
  if (newest.has(p.id)) tags.push("new");
  return tags;
}

const popularity = (p: Product) => p.rating * Math.log2(2 + p.reviewCount) + (p.stock > 0 ? 1 : 0);

function sortProducts(list: Product[], sort: SortOption = "popular"): Product[] {
  const sorted = [...list];
  switch (sort) {
    case "price-asc": return sorted.sort((a, b) => a.price - b.price);
    case "price-desc": return sorted.sort((a, b) => b.price - a.price);
    case "rating": return sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case "newest": return sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    default: return sorted.sort((a, b) => popularity(b) - popularity(a));
  }
}

/** Friendlier display names than the API provides ("Mens Shirts" -> "Men's Shirts"). */
const CATEGORY_NAMES: Record<string, string> = {
  "mens-shirts": "Men's Shirts",
  "womens-dresses": "Dresses",
  "mens-shoes": "Men's Shoes",
  "womens-shoes": "Women's Shoes",
  "womens-bags": "Bags",
  "mens-watches": "Men's Watches",
  "womens-watches": "Women's Watches",
  "womens-jewellery": "Jewellery",
};

export async function getCategories(): Promise<Category[]> {
  "use cache";
  cacheLife("days");
  const all = await fetchCategories();
  return STORE_CATEGORIES.map((id) => ({ id, name: CATEGORY_NAMES[id] ?? all.find((c) => c.id === id)?.name ?? id }));
}

export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const catalog = await loadCatalog();
  const q = filters.q?.trim().toLowerCase();
  const styleCats = filters.style ? DRESS_STYLES.find((s) => s.id === filters.style)?.categories : undefined;
  const list = catalog.filter((p) => {
    if (filters.category && p.category !== filters.category) return false;
    if (styleCats && !styleCats.includes(p.category)) return false;
    if (filters.brand && p.brand?.toLowerCase() !== filters.brand.toLowerCase()) return false;
    if (filters.color && !p.colors.some((c) => c.name.toLowerCase() === filters.color!.toLowerCase())) return false;
    if (filters.size && !p.sizes?.includes(filters.size)) return false;
    if (filters.minPrice != null && p.price < filters.minPrice) return false;
    if (filters.maxPrice != null && p.price > filters.maxPrice) return false;
    if (filters.sale && !p.tags.includes("sale")) return false;
    if (filters.inStock && p.stock <= 0) return false;
    if (q) {
      const hay = `${p.name} ${p.brand ?? ""} ${p.category.replace(/-/g, " ")} ${p.description}`.toLowerCase();
      if (!q.split(/\s+/).every((term) => hay.includes(term))) return false;
    }
    return true;
  });
  return sortProducts(list, filters.sort);
}

export async function getProductPage(filters: ProductFilters): Promise<ProductPage> {
  const all = await getProducts(filters);
  const pageCount = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  const page = Math.min(Math.max(1, filters.page ?? 1), pageCount);
  return { items: all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), total: all.length, page, pageCount, pageSize: PAGE_SIZE };
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const id = idFromSlug(slug);
  if (!id) return undefined;
  const cached = (await loadCatalog()).find((p) => p.id === id);
  if (cached) return cached;
  const fresh = await fetchProduct(id);
  return fresh && inStore(fresh) ? toProduct(fresh) : undefined;
}

export async function getNewArrivals(limit = 4) {
  return sortProducts((await loadCatalog()).filter((p) => p.tags.includes("new")), "newest").slice(0, limit);
}

export async function getTopSelling(limit = 4) {
  return sortProducts((await loadCatalog()).filter((p) => p.tags.includes("bestseller")), "popular").slice(0, limit);
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const catalog = await loadCatalog();
  const style = DRESS_STYLES.find((s) => s.categories.includes(product.category));
  const score = (p: Product) => (p.category === product.category ? 2 : style?.categories.includes(p.category) ? 1 : 0);
  return sortProducts(catalog.filter((p) => p.id !== product.id && score(p) > 0), "popular")
    .sort((a, b) => score(b) - score(a))
    .slice(0, limit);
}

/** Five-star customer reviews across the catalog, for the homepage testimonials. */
export async function getTestimonials(limit = 8): Promise<(Review & { product: Pick<Product, "name" | "slug"> })[]> {
  const catalog = await loadCatalog();
  return sortProducts(catalog, "popular")
    .flatMap((p) => p.reviews.filter((r) => r.rating >= 5).map((r) => ({ ...r, product: { name: p.name, slug: p.slug } })))
    .slice(0, limit);
}

export async function getBrands(): Promise<{ name: string; count: number }[]> {
  const counts = new Map<string, number>();
  for (const p of await loadCatalog()) if (p.brand) counts.set(p.brand, (counts.get(p.brand) ?? 0) + 1);
  return [...counts].map(([name, count]) => ({ name, count })).sort((a, b) => a.name.localeCompare(b.name));
}

/** Facets for the filter sidebar, computed from the live catalog. */
export async function getFacets(): Promise<{ colors: ColorOption[]; sizes: string[]; minPrice: number; maxPrice: number }> {
  const catalog = await loadCatalog();
  const colorNames = new Set(catalog.flatMap((p) => p.colors.map((c) => c.name)));
  const sizes = [...new Set(catalog.flatMap((p) => p.sizes ?? []))];
  const prices = catalog.map((p) => p.price);
  return {
    colors: COLOR_SWATCHES.filter((c) => colorNames.has(c.name)),
    sizes,
    minPrice: Math.floor(Math.min(...prices) / 100) * 100,
    maxPrice: Math.ceil(Math.max(...prices) / 100) * 100,
  };
}
