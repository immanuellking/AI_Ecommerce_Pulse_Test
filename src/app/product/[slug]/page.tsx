import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { Gallery } from "@/components/product/gallery";
import { ProductTabs } from "@/components/product/product-tabs";
import { ProductRow } from "@/components/product/product-row";
import { PurchasePanel } from "@/components/product/purchase-panel";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Price } from "@/components/ui/price";
import { SectionTitle } from "@/components/ui/section-title";
import { Stars } from "@/components/ui/stars";
import { getCategories, getProductBySlug, getProducts, getRelatedProducts } from "@/lib/catalog";

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug);
  return product ? { title: product.name, description: product.description } : { title: "Product not found" };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  if (slug !== product.slug) permanentRedirect(`/product/${product.slug}`);
  const [related, categories] = await Promise.all([getRelatedProducts(product, 4), getCategories()]);
  const categoryName = categories.find((c) => c.id === product.category)?.name ?? product.category;

  return (
    <div className="container-page">
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        { label: categoryName, href: `/shop?category=${product.category}` },
        { label: product.name },
      ]} />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,610px)_minmax(0,1fr)] lg:gap-10">
        <Gallery images={product.images} name={product.name} />
        <div>
          <h1 className="font-heading text-2xl lg:text-[40px] lg:leading-[48px]">{product.name}</h1>
          {product.brand && <p className="mt-2 text-sm text-muted">by {product.brand}</p>}
          <Stars rating={product.rating} size={22} className="mt-3 lg:mt-3.5" />
          <Price price={product.price} compareAt={product.compareAtPrice} discountPercent={product.discountPercent} size="lg" className="mt-3 lg:mt-3.5" />
          <p className="mb-6 mt-5 text-sm leading-5 text-muted lg:text-base lg:leading-[22px]">{product.description}</p>
          <PurchasePanel product={product} />
        </div>
      </div>

      <ProductTabs product={product} categoryName={categoryName} />

      {related.length > 0 && (
        <section className="py-12 lg:py-16">
          <SectionTitle className="mb-8 text-center lg:mb-14">You might also like</SectionTitle>
          <ProductRow products={related} />
        </section>
      )}
    </div>
  );
}
