import { ProductRow } from "@/components/product/product-row";
import { LinkButton } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import type { Product } from "@/types";

export function ProductSection({ title, products, viewAllHref }: { title: string; products: Product[]; viewAllHref: string }) {
  return (
    <section className="container-page py-12 lg:py-[72px]">
      <SectionTitle className="mb-8 text-center lg:mb-14">{title}</SectionTitle>
      {products.length ? <ProductRow products={products} /> : <p className="text-center text-muted">No products to show right now.</p>}
      <div className="mt-6 flex justify-center lg:mt-9">
        <LinkButton href={viewAllHref} variant="outline" size="lg" className="w-full sm:w-[218px]">View All</LinkButton>
      </div>
    </section>
  );
}
