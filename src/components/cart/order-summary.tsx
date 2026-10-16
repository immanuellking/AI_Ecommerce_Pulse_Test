"use client";

import { useState, type ReactNode } from "react";
import { CloseIcon, TagIcon } from "@/components/ui/icons";
import { formatPrice } from "@/lib/format";
import { computeTotals } from "@/lib/pricing";
import { useCart } from "@/store/cart";
import type { DeliveryMethodId } from "@/types";

/** Order totals shared by the cart and checkout pages (one pricing source, so they always agree). */
export function OrderSummary({ delivery = "standard", editablePromo = true, children, title = "Order Summary" }: {
  delivery?: DeliveryMethodId;
  editablePromo?: boolean;
  children?: ReactNode;
  title?: string;
}) {
  const { items, coupon } = useCart();
  const totals = computeTotals(items, { coupon, delivery });

  return (
    <section aria-labelledby="summary-title" className="rounded-[20px] border border-line px-5 py-5 lg:px-6 lg:py-6">
      <h2 id="summary-title" className="text-xl font-bold lg:text-2xl">{title}</h2>
      <dl className="mt-4 space-y-5 lg:mt-6">
        <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
        {totals.discount > 0 && (
          <Row label={`Discount (-${totals.discountPercent}%)`} value={`-${formatPrice(totals.discount)}`} valueClass="text-sale" />
        )}
        <Row label={delivery === "express" ? "Express Delivery" : "Delivery Fee"} value={formatPrice(totals.shipping)} />
        <div className="flex items-center justify-between border-t border-line pt-5">
          <dt className="text-base text-ink lg:text-xl">Total</dt>
          <dd className="text-xl font-bold lg:text-2xl" aria-live="polite">{formatPrice(totals.total)}</dd>
        </div>
      </dl>
      {editablePromo ? <PromoCode /> : coupon ? <p className="mt-4 text-sm text-muted">Promo code <strong className="text-ink">{coupon}</strong> applied.</p> : null}
      {children && <div className="mt-6">{children}</div>}
    </section>
  );
}

function Row({ label, value, valueClass = "" }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-base text-muted lg:text-xl">{label}</dt>
      <dd className={`text-base font-bold lg:text-xl ${valueClass}`}>{value}</dd>
    </div>
  );
}

function PromoCode() {
  const { coupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<{ text: string; ok: boolean }>();

  if (coupon) {
    return (
      <div className="mt-6 flex items-center justify-between rounded-full bg-surface py-3 pl-4 pr-3 text-sm">
        <span className="flex items-center gap-2"><TagIcon size={18} className="text-muted" /> <strong>{coupon}</strong> applied</span>
        <button type="button" onClick={() => { removeCoupon(); setMessage(undefined); }} aria-label={`Remove promo code ${coupon}`}
          className="rounded-full p-1 text-muted hover:text-ink"><CloseIcon size={16} /></button>
      </div>
    );
  }
  return (
    <form className="mt-6" noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!code.trim()) return setMessage({ text: "Enter a promo code", ok: false });
        const ok = applyCoupon(code);
        setMessage(ok ? undefined : { text: `“${code.trim()}” isn't a valid promo code`, ok: false });
        if (ok) setCode("");
      }}>
      <div className="flex gap-3">
        <div className="relative flex-1">
          <label htmlFor="promo" className="sr-only">Promo code</label>
          <TagIcon size={22} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-subtle" />
          <input id="promo" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Add promo code" autoComplete="off"
            aria-invalid={message && !message.ok} aria-describedby={message ? "promo-msg" : undefined}
            className="h-12 w-full rounded-full bg-surface pl-12 pr-4 text-sm outline-none placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-ink lg:text-base" />
        </div>
        <button type="submit" className="h-12 rounded-full bg-ink px-6 text-sm font-medium text-paper hover:bg-ink/85 lg:px-9 lg:text-base">Apply</button>
      </div>
      {message && <p id="promo-msg" role="alert" className="mt-2 px-4 text-sm text-sale">{message.text}</p>}
      <p className="mt-2 px-4 text-xs text-subtle">Try SHOP20 for 20% off.</p>
    </form>
  );
}
