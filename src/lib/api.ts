import { COLOR_SWATCHES } from "@/lib/store-config";
import type { AvailabilityStatus, Category, ColorOption, Product, ProductTag } from "@/types";

/**
 * Client for the DummyJSON product API (https://dummyjson.com/docs/products).
 * Converts API responses into the app's own Product model so nothing outside
 * this file and catalog.ts depends on the API's shape.
 */

export const API_BASE = process.env.PRODUCTS_API_URL ?? "https://dummyjson.com";

interface ApiReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

export interface ApiProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  sku?: string;
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  returnPolicy?: string;
  reviews?: ApiReview[];
  meta?: { createdAt?: string };
  images: string[];
  thumbnail: string;
}

interface ApiCategory {
  slug: string;
  name: string;
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new ApiError(res.status, `Product API ${res.status} for ${path}`);
  return res.json() as Promise<T>;
}

export const fetchAllProducts = () =>
  apiGet<{ products: ApiProduct[] }>("/products?limit=0").then((r) => r.products);

export async function fetchProduct(id: string): Promise<ApiProduct | undefined> {
  try {
    return await apiGet<ApiProduct>(`/products/${encodeURIComponent(id)}`);
  } catch (e) {
    if (e instanceof ApiError && (e.status === 404 || e.status === 400)) return undefined;
    throw e;
  }
}

export const fetchCategories = () =>
  apiGet<ApiCategory[]>("/products/categories").then((list) =>
    list.map<Category>((c) => ({ id: c.slug, name: c.name })),
  );

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_-]+/g, "-");

/** Product URLs are `<title-slug>-<id>`, so the id can always be recovered from the slug. */
export const productSlug = (p: Pick<ApiProduct, "id" | "title">) => `${slugify(p.title)}-${p.id}`;
export const idFromSlug = (slug: string) => /-(\d+)$/.exec(slug)?.[1] ?? (/^\d+$/.test(slug) ? slug : undefined);

/** The API has no size variants; apparel and shoe categories get a standard size run. */
const APPAREL_SIZES = ["Small", "Medium", "Large", "X-Large"];
const SIZE_RUNS: Record<string, string[]> = {
  "mens-shirts": APPAREL_SIZES,
  tops: APPAREL_SIZES,
  "womens-dresses": APPAREL_SIZES,
  "mens-shoes": ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
  "womens-shoes": ["US 5", "US 6", "US 7", "US 8", "US 9", "US 10"],
};

function colorsFromTitle(title: string): ColorOption[] {
  const t = title.toLowerCase().replace(/\bgrey\b/g, "gray").replace(/\bgolden\b/g, "gold");
  return COLOR_SWATCHES.filter((c) => new RegExp(`\\b${c.name.toLowerCase()}\\b`).test(t));
}

const AVAILABILITY: AvailabilityStatus[] = ["In Stock", "Low Stock", "Out of Stock"];

export function toProduct(p: ApiProduct, tags: ProductTag[] = []): Product {
  const compareAt = Math.round(p.price * 100);
  const discountPercent = Math.round(p.discountPercentage ?? 0);
  const price = discountPercent > 0 ? Math.round(compareAt * (1 - (p.discountPercentage ?? 0) / 100)) : compareAt;
  const availability =
    p.stock <= 0
      ? "Out of Stock"
      : AVAILABILITY.includes(p.availabilityStatus as AvailabilityStatus)
        ? (p.availabilityStatus as AvailabilityStatus)
        : "In Stock";
  return {
    id: String(p.id),
    slug: productSlug(p),
    name: p.title,
    brand: p.brand,
    sku: p.sku,
    category: p.category,
    price,
    compareAtPrice: price < compareAt ? compareAt : undefined,
    discountPercent: price < compareAt ? discountPercent : 0,
    rating: Math.round(p.rating * 10) / 10,
    reviewCount: p.reviews?.length ?? 0,
    reviews: (p.reviews ?? []).map(({ rating, comment, date, reviewerName }) => ({ rating, comment, date, reviewerName })),
    thumbnail: p.thumbnail || p.images[0],
    images: p.images.length ? p.images : [p.thumbnail],
    description: p.description,
    colors: colorsFromTitle(p.title),
    sizes: SIZE_RUNS[p.category],
    stock: Math.max(0, p.stock),
    availability,
    warranty: p.warrantyInformation,
    shipping: p.shippingInformation,
    returnPolicy: p.returnPolicy,
    tags,
    createdAt: p.meta?.createdAt ?? "",
  };
}
