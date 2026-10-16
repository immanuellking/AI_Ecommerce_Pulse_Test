import Link from "next/link";
import { getBrands } from "@/lib/catalog";

/** Brand wordmarks from the live catalog, styled like the design's logo strip. */
const PREFERRED = ["Calvin Klein", "Prada", "Gucci", "Chanel", "Dior", "Nike", "Rolex", "Puma"];
const STYLES = [
  "font-serif tracking-[0.04em] uppercase text-[23px] lg:text-[33px]",
  "font-heading text-[22px] lg:text-[31px]",
  "font-serif tracking-[0.18em] uppercase text-[22px] lg:text-[31px]",
  "font-serif font-bold tracking-[0.1em] uppercase text-[21px] lg:text-[30px]",
  "font-light tracking-tight text-[22px] lg:text-[33px]",
];

export async function BrandBar() {
  const available = new Set((await getBrands()).map((b) => b.name));
  const brands = PREFERRED.filter((b) => available.has(b)).slice(0, 5);
  if (!brands.length) return null;
  return (
    <section aria-label="Featured brands" className="bg-ink text-paper">
      <ul className="container-page flex flex-wrap items-center justify-center gap-x-8 gap-y-5 py-10 lg:justify-between lg:py-11">
        {brands.map((b, i) => (
          <li key={b}>
            <Link href={`/shop?brand=${encodeURIComponent(b)}`} className={`${STYLES[i % STYLES.length]} block leading-none hover:opacity-70`}>
              {b}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
