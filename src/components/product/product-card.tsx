import Image from "next/image";
import Link from "next/link";
import { Price } from "@/components/ui/price";
import { Stars } from "@/components/ui/stars";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";

export function ProductCard({ product, className, priority }: { product: Product; className?: string; priority?: boolean }) {
  const soldOut = product.stock <= 0;
  return (
    <article className={cn("group relative", className)}>
      <div className="relative aspect-square overflow-hidden rounded-[13px] bg-card lg:rounded-[20px]">
        <Image src={product.thumbnail} alt={product.name} fill priority={priority}
          sizes="(min-width: 1024px) 295px, (min-width: 640px) 33vw, 50vw"
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105" />
        {soldOut && (
          <span className="absolute left-3 top-3 rounded-full bg-ink px-3 py-1 text-xs font-medium text-paper">Sold out</span>
        )}
      </div>
      <h3 className="mt-2.5 truncate text-base font-bold lg:mt-4 lg:text-xl">
        <Link href={`/product/${product.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {product.name}
        </Link>
      </h3>
      <Stars rating={product.rating} size={16} className="mt-1 lg:mt-2" />
      <Price price={product.price} compareAt={product.compareAtPrice} discountPercent={product.discountPercent} className="mt-1 lg:mt-2" />
    </article>
  );
}
