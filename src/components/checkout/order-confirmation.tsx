"use client";

import { use } from "react";
import { OrderDetails } from "@/components/checkout/order-details";
import { LinkButton } from "@/components/ui/button";
import { CheckIcon } from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrders } from "@/store/orders";
import { useCart } from "@/store/cart";

export function OrderConfirmation({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const raw = use(searchParams).order;
  const id = Array.isArray(raw) ? raw[0] : raw;
  const order = useOrders((s) => s.orders.find((o) => o.id === id));
  const hydrated = useCart((s) => s.hydrated); // stores hydrate together

  if (!hydrated) return <Skeleton className="h-[420px]" />;
  if (!order) {
    return (
      <div className="rounded-[20px] border border-line px-6 py-14 text-center">
        <h1 className="text-2xl font-bold">Order not found</h1>
        <p className="mt-2 text-muted">We couldn&apos;t find that order on this device.</p>
        <LinkButton href="/account" className="mt-6">View your orders</LinkButton>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 text-center">
        <span className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-verified text-paper"><CheckIcon size={28} strokeWidth={3} /></span>
        <h1 className="font-heading text-[28px] lg:text-4xl">Order placed</h1>
        <p className="mt-3 text-muted">
          Thanks, {order.contact.firstName}! Your demo order <strong className="text-ink">{order.id}</strong> was recorded on this device.
        </p>
        <p className="mt-1 text-sm text-muted">This was a simulated checkout. No payment was taken and nothing will ship.</p>
      </div>
      <OrderDetails order={order} />
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <LinkButton href="/shop">Continue shopping</LinkButton>
        <LinkButton href="/account" variant="outline">View all orders</LinkButton>
      </div>
    </div>
  );
}
