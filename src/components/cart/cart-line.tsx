"use client";

import Image from "next/image";
import Link from "next/link";
import { TrashIcon } from "@/components/ui/icons";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { formatPrice } from "@/lib/format";
import { lineTotal } from "@/lib/pricing";
import { useCart } from "@/store/cart";
import { useToast } from "@/store/toast";
import type { CartItem } from "@/types";

export function CartLine({ item }: { item: CartItem }) {
  const { updateQuantity, remove } = useCart();
  const show = useToast((s) => s.show);
  return (
    <li className="flex gap-3.5 py-4 first:pt-0 last:pb-0 lg:gap-4 lg:py-6">
      <Link href={`/product/${item.slug}`} className="relative size-[99px] shrink-0 overflow-hidden rounded-lg bg-card lg:size-[124px]">
        <Image src={item.image} alt={item.name} fill sizes="124px" className="object-contain p-2" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold lg:text-xl">
            <Link href={`/product/${item.slug}`} className="hover:underline">{item.name}</Link>
          </h3>
          <button type="button" aria-label={`Remove ${item.name} from cart`}
            onClick={() => { remove(item.key); show({ title: "Removed from cart", description: item.name }); }}
            className="shrink-0 text-sale hover:opacity-70">
            <TrashIcon size={22} />
          </button>
        </div>
        {item.size && <p className="text-xs text-ink lg:text-sm">Size: <span className="text-muted">{item.size}</span></p>}
        {item.color && <p className="text-xs text-ink lg:text-sm">Color: <span className="text-muted">{item.color}</span></p>}
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            <p className="text-xl font-bold lg:text-2xl">{formatPrice(lineTotal(item))}</p>
            {item.quantity > 1 && <p className="text-xs text-muted">{formatPrice(item.unitPrice)} each</p>}
          </div>
          <div className="text-right">
            <QuantitySelector size="sm" value={item.quantity} max={item.maxQuantity} label={`Quantity of ${item.name}`}
              onChange={(q) => updateQuantity(item.key, q)} />
            {item.quantity >= item.maxQuantity && <p className="mt-1 text-xs text-muted">Max available</p>}
          </div>
        </div>
      </div>
    </li>
  );
}
