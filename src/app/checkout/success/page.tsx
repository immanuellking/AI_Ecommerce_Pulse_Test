import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderConfirmation } from "@/components/checkout/order-confirmation";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = { title: "Order placed", robots: { index: false } };

export default function SuccessPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  return (
    <div className="container-page py-8 lg:py-12">
      <Suspense fallback={<Skeleton className="h-[420px]" />}>
        <OrderConfirmation searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
