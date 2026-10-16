import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionTitle } from "@/components/ui/section-title";
import { getBrands } from "@/lib/catalog";

export const metadata: Metadata = { title: "Brands" };

export default async function BrandsPage() {
  const brands = await getBrands();
  return (
    <div className="container-page pb-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Brands" }]} />
      <SectionTitle as="h1" className="mb-8">Brands</SectionTitle>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">
        {brands.map((b) => (
          <li key={b.name}>
            <Link href={`/shop?brand=${encodeURIComponent(b.name)}`}
              className="flex h-24 flex-col justify-center rounded-[20px] border border-line px-5 transition-colors hover:bg-surface lg:h-28 lg:px-6">
              <span className="text-lg font-bold lg:text-xl">{b.name}</span>
              <span className="text-sm text-muted">{b.count} product{b.count === 1 ? "" : "s"}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
