import type { CartItem, DeliveryMethod, DeliveryMethodId, OrderTotals } from "@/types";

export const DELIVERY_METHODS: DeliveryMethod[] = [
  { id: "standard", label: "Standard delivery", eta: "3–5 business days", price: 1500 },
  { id: "express", label: "Express delivery", eta: "1–2 business days", price: 3000 },
];

/** Demo promo codes: code -> percent off the subtotal. */
export const COUPONS: Record<string, number> = { SHOP20: 20, SAVE10: 10 };

export function normalizeCoupon(code: string | undefined): string | undefined {
  const c = code?.trim().toUpperCase();
  return c && c in COUPONS ? c : undefined;
}

export const lineTotal = (item: Pick<CartItem, "unitPrice" | "quantity">) => item.unitPrice * item.quantity;

export const subtotal = (items: CartItem[]) => items.reduce((sum, i) => sum + lineTotal(i), 0);

export const itemCount = (items: CartItem[]) => items.reduce((sum, i) => sum + i.quantity, 0);

export function deliveryFee(sub: number, delivery: DeliveryMethodId = "standard"): number {
  if (sub === 0) return 0;
  return (DELIVERY_METHODS.find((m) => m.id === delivery) ?? DELIVERY_METHODS[0]).price;
}

/** Single source of truth for cart, checkout and order totals. */
export function computeTotals(
  items: CartItem[],
  opts: { coupon?: string; delivery?: DeliveryMethodId } = {},
): OrderTotals & { discountPercent: number } {
  const sub = subtotal(items);
  const code = normalizeCoupon(opts.coupon);
  const discountPercent = code ? COUPONS[code] : 0;
  const discount = Math.round((sub * discountPercent) / 100);
  const shipping = deliveryFee(sub, opts.delivery);
  return { subtotal: sub, discount, discountPercent, shipping, tax: 0, total: sub - discount + shipping };
}
