import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductGrid } from "@/components/product/product-row";
import { ActiveFilters } from "@/components/shop/active-filters";
import { FilterPanel } from "@/components/shop/filter-panel";
import { MobileFilters } from "@/components/shop/mobile-filters";
import { Pagination } from "@/components/shop/pagination";
import { ShopSkeleton } from "@/components/shop/shop-skeleton";
import { SortSelect } from "@/components/shop/sort-select";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { LinkButton } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchIcon } from "@/components/ui/icons";
import { getCategories, getFacets, getProductPage } from "@/lib/catalog";
import { hasActiveFilters, parseFilters, shopHref, type SearchParams } from "@/lib/filters";
import { DRESS_STYLES } from "@/lib/store-config";
import type { Category, ProductFilters } from "@/types";

export const metadata: Metadata = { title: "Shop" };

export default function ShopPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopResults searchParams={searchParams} />
    </Suspense>
  );
}

function pageTitle(f: ProductFilters, categories: Category[]): string {
  if (f.q) return `Results for “${f.q}”`;
  if (f.category) return categories.find((c) => c.id === f.category)?.name ?? "Shop";
  if (f.style) return DRESS_STYLES.find((s) => s.id === f.style)?.name ?? "Shop";
  if (f.brand) return f.brand;
  if (f.sale) return "On Sale";
  if (f.sort === "newest") return "New Arrivals";
  return "All Products";
}

async function ShopResults({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const filters = parseFilters(await searchParams);
  const [result, categories, facets] = await Promise.all([getProductPage(filters), getCategories(), getFacets()]);
  const title = pageTitle(filters, categories);
  const from = result.total ? (result.page - 1) * result.pageSize + 1 : 0;
  const to = Math.min(result.page * result.pageSize, result.total);
  const panelKey = shopHref(filters);
  const effective = { ...filters, page: result.page };

  return (
    <div className="container-page">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, ...(title === "All Products" ? [{ label: "Shop" }] : [{ label: "Shop", href: "/shop" }, { label: title }])]} />
      <div className="flex gap-5">
        <aside className="hidden w-[295px] shrink-0 self-start rounded-[20px] border border-line px-6 py-5 lg:block" aria-label="Product filters">
          <FilterPanel key={panelKey} filters={filters} categories={categories} facets={facets} />
        </aside>

        <section className="min-w-0 flex-1" aria-labelledby="shop-title">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 lg:mb-4">
            <div className="flex min-w-0 flex-1 items-baseline gap-2">
              <h1 id="shop-title" className="truncate text-2xl font-bold lg:text-[32px]">{title}</h1>
              <p className="shrink-0 text-sm text-muted lg:hidden">{result.total ? `Showing ${from}-${to} of ${result.total}` : "No results"}</p>
            </div>
            <MobileFilters key={panelKey} filters={filters} categories={categories} facets={facets} />
            <div className="flex items-center gap-3 max-lg:w-full max-lg:justify-end">
              <p className="hidden text-muted lg:block">
                {result.total ? `Showing ${from}-${to} of ${result.total} Products` : "No products"}
              </p>
              <SortSelect filters={filters} />
            </div>
          </div>

          <ActiveFilters filters={filters} categories={categories} />

          {result.items.length ? (
            <>
              <ProductGrid products={result.items} priorityCount={3} />
              <Pagination filters={effective} page={result.page} pageCount={result.pageCount} />
            </>
          ) : (
            <EmptyState icon={<SearchIcon />} title="No products match"
              description={hasActiveFilters(filters) ? "Try removing a filter or searching for something else." : "There are no products to show right now."}>
              {hasActiveFilters(filters) && <LinkButton href="/shop">Clear filters</LinkButton>}
            </EmptyState>
          )}
        </section>
      </div>
    </div>
  );
}
