"use client";

import { useEffect } from "react";
import { useCart } from "@/store/cart";
import { useOrders } from "@/store/orders";
import { useLocalReviews } from "@/store/reviews";
import { useUi } from "@/store/ui";

/** Loads persisted client state from localStorage after the first render. */
export function StoreHydrator() {
  useEffect(() => {
    void useCart.persist.rehydrate();
    void useOrders.persist.rehydrate();
    void useUi.persist.rehydrate();
    void useLocalReviews.persist.rehydrate();
    const sync = (e: StorageEvent) => {
      if (e.key === "shopco-cart") void useCart.persist.rehydrate();
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  return null;
}
