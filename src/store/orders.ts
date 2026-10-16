"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Order } from "@/types";

/** Demo orders placed on this device (no backend). */
interface OrdersState {
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useOrders = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => set({ orders: [order, ...get().orders].slice(0, 20) }),
    }),
    { name: "shopco-orders", version: 1, storage: createJSONStorage(() => localStorage), skipHydration: true },
  ),
);

export function generateOrderId(): string {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `SC-${Date.now().toString(36).toUpperCase().slice(-5)}${rand}`;
}
