"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Review } from "@/types";

/** Reviews written on this device. The demo API is read-only, so they are never sent anywhere. */
interface ReviewsState {
  byProduct: Record<string, Review[]>;
  addReview: (productId: string, review: Review) => void;
}

export const useLocalReviews = create<ReviewsState>()(
  persist(
    (set, get) => ({
      byProduct: {},
      addReview: (productId, review) =>
        set({ byProduct: { ...get().byProduct, [productId]: [review, ...(get().byProduct[productId] ?? [])] } }),
    }),
    { name: "shopco-reviews", storage: createJSONStorage(() => localStorage), skipHydration: true },
  ),
);
