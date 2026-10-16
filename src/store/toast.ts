"use client";

import { create } from "zustand";

export interface Toast {
  id: number;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  tone?: "default" | "error";
}

interface ToastState {
  toasts: Toast[];
  show: (toast: Omit<Toast, "id">) => void;
  dismiss: (id: number) => void;
}

let nextId = 1;

export const useToast = create<ToastState>()((set, get) => ({
  toasts: [],
  show: (toast) => {
    const id = nextId++;
    set({ toasts: [...get().toasts.slice(-2), { ...toast, id }] });
    setTimeout(() => get().dismiss(id), 4500);
  },
  dismiss: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
}));
