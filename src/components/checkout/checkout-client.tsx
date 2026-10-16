"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

/** Checkout restores its draft from sessionStorage, so it renders on the client only. */
export const CheckoutClient = dynamic(() => import("@/components/checkout/checkout-flow").then((m) => m.CheckoutFlow), {
  ssr: false,
  loading: () => (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_505px]" aria-busy="true" aria-label="Loading checkout">
      <Skeleton className="h-[480px]" />
      <Skeleton className="h-[320px]" />
    </div>
  ),
});
