import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types";

/** Four-up row on desktop; swipeable strip on mobile (as in the design). */
export function ProductRow({ products }: { products: Product[] }) {
  return (
    <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 md:grid-cols-4 lg:gap-5">
      {products.map((p) => (
        <li key={p.id} className="w-[198px] shrink-0 snap-start sm:w-auto">
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
}

export function ProductGrid({ products, priorityCount = 0 }: { products: Product[]; priorityCount?: number }) {
  return (
    <ul className="grid grid-cols-2 gap-x-3.5 gap-y-6 md:grid-cols-3 lg:gap-x-5 lg:gap-y-9">
      {products.map((p, i) => (
        <li key={p.id}><ProductCard product={p} priority={i < priorityCount} /></li>
      ))}
    </ul>
  );
}
