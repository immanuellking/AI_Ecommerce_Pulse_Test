"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { normalizeCoupon } from "@/lib/pricing";
import type { CartItem, Product } from "@/types";

export const cartKey = (productId: string, size?: string) => `${productId}:${size ?? ""}`;

interface AddInput {
  product: Product;
  quantity: number;
  size?: string;
}

export interface AddResult {
  item: CartItem;
  /** Units actually added (less than requested when stock ran out). */
  added: number;
}

interface CartState {
  items: CartItem[];
  coupon?: string;
  hydrated: boolean;
  add: (input: AddInput) => AddResult;
  updateQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const clamp = (n: number, max: number) => Math.max(1, Math.min(Math.floor(n) || 1, Math.max(max, 1)));

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: undefined,
      hydrated: false,
      add: ({ product, quantity, size }) => {
        const key = cartKey(product.id, size);
        const existing = get().items.find((i) => i.key === key);
        const before = existing?.quantity ?? 0;
        const item: CartItem = {
          key,
          productId: product.id,
          slug: product.slug,
          name: product.name,
          image: product.thumbnail,
          unitPrice: product.price,
          color: product.colors.map((c) => c.name).join(" & ") || undefined,
          size,
          quantity: clamp(before + quantity, product.stock),
          maxQuantity: product.stock,
        };
        set({ items: existing ? get().items.map((i) => (i.key === key ? item : i)) : [...get().items, item] });
        return { item, added: item.quantity - before };
      },
      updateQuantity: (key, quantity) =>
        set({ items: get().items.map((i) => (i.key === key ? { ...i, quantity: clamp(quantity, i.maxQuantity) } : i)) }),
      remove: (key) => set({ items: get().items.filter((i) => i.key !== key) }),
      clear: () => set({ items: [], coupon: undefined }),
      applyCoupon: (code) => {
        const c = normalizeCoupon(code);
        if (c) set({ coupon: c });
        return Boolean(c);
      },
      removeCoupon: () => set({ coupon: undefined }),
    }),
    {
      name: "shopco-cart",
      version: 2,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items, coupon: s.coupon }),
      // Rehydrated after mount by <StoreHydrator /> so server and first client render match.
      skipHydration: true,
      onRehydrateStorage: () => () => useCart.setState({ hydrated: true }),
      migrate: () => ({ items: [], coupon: undefined }),
    },
  ),
);
