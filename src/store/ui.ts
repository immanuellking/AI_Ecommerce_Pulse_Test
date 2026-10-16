"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UiState {
  bannerDismissed: boolean;
  dismissBanner: () => void;
}

export const useUi = create<UiState>()(
  persist(
    (set) => ({
      bannerDismissed: false,
      dismissBanner: () => set({ bannerDismissed: true }),
    }),
    { name: "shopco-ui", storage: createJSONStorage(() => localStorage), skipHydration: true },
  ),
);
