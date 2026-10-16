"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { cn } from "@/lib/cn";
import { cartKey, useCart } from "@/store/cart";
import { useToast } from "@/store/toast";
import type { Product } from "@/types";

export function PurchasePanel({ product }: { product: Product }) {
  const [size, setSize] = useState<string>();
  const [qty, setQty] = useState(1);
  const [sizeError, setSizeError] = useState(false);
  const add = useCart((s) => s.add);
  const inCart = useCart((s) => s.items.find((i) => i.key === cartKey(product.id, size))?.quantity ?? 0);
  const show = useToast((s) => s.show);

  const needsSize = !!product.sizes?.length;
  const remaining = Math.max(0, product.stock - inCart);
  const soldOut = product.stock <= 0;
  const maxedOut = !soldOut && remaining === 0;
  const quantity = Math.min(qty, Math.max(1, remaining));

  const onAdd = () => {
    if (needsSize && !size) {
      setSizeError(true);
      document.getElementById("size-options")?.querySelector("button")?.focus();
      return;
    }
    const { item, added } = add({ product, quantity, size });
    setQty(1);
    show({
      title: added < quantity ? `Added ${added} — that's all we have` : "Added to cart",
      description: `${added} × ${product.name}${size ? ` (${size})` : ""} · ${item.quantity} in cart`,
      action: { label: "View cart", href: "/cart" },
    });
  };

  return (
    <div>
      {product.colors.length > 0 && (
        <div className="border-t border-line py-5">
          <p className="mb-3 text-sm text-muted lg:text-base">Colour</p>
          <ul className="flex flex-wrap gap-3">
            {product.colors.map((c) => (
              <li key={c.name} className="flex items-center gap-2 text-sm">
                <span className="size-[37px] rounded-full border border-line" style={{ background: c.hex }} aria-hidden="true" />
                {c.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {needsSize && (
        <fieldset className="border-t border-line py-5" aria-describedby={sizeError ? "size-error" : undefined}>
          <legend className="sr-only">Choose size</legend>
          <p className="mb-3 text-sm text-muted lg:mb-4 lg:text-base" aria-hidden="true">Choose Size</p>
          <div id="size-options" className="flex flex-wrap gap-2 lg:gap-3">
            {product.sizes!.map((s) => (
              <button key={s} type="button" aria-pressed={size === s}
                onClick={() => { setSize(s); setSizeError(false); }}
                className={cn("rounded-full px-5 py-2.5 text-sm transition-colors lg:px-6 lg:py-3 lg:text-base",
                  size === s ? "bg-ink text-paper" : "bg-surface text-muted hover:bg-line")}>
                {s}
              </button>
            ))}
          </div>
          {sizeError && <p id="size-error" role="alert" className="mt-3 text-sm text-sale">Please choose a size.</p>}
        </fieldset>
      )}

      <div className="border-t border-line pt-5">
        <p className={cn("mb-4 flex items-center gap-2 text-sm font-medium",
          soldOut ? "text-sale" : product.availability === "Low Stock" ? "text-[#b26b00]" : "text-verified")}>
          {!soldOut && <CheckIcon size={16} strokeWidth={2.5} />}
          {soldOut ? "Out of stock" : product.availability === "Low Stock" ? `Low stock — only ${product.stock} left` : `In stock (${product.stock} available)`}
          {inCart > 0 && <span className="font-normal text-muted">· {inCart} in your cart</span>}
        </p>
        <div className="flex gap-3 lg:gap-5">
          <QuantitySelector value={quantity} onChange={setQty} max={Math.max(1, remaining)} className={cn((soldOut || maxedOut) && "pointer-events-none opacity-50")} />
          <Button type="button" onClick={onAdd} disabled={soldOut || maxedOut} className="h-11 flex-1 lg:h-[52px]">
            {soldOut ? "Out of Stock" : maxedOut ? "All stock in cart" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}
