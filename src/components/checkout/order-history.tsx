"use client";

import { OrderDetails } from "@/components/checkout/order-details";
import { LinkButton } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { BagIcon } from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/store/cart";
import { useOrders } from "@/store/orders";

export function OrderHistory() {
  const orders = useOrders((s) => s.orders);
  const hydrated = useCart((s) => s.hydrated);
  if (!hydrated) return <Skeleton className="h-[300px]" />;
  if (!orders.length) {
    return (
      <EmptyState icon={<BagIcon />} title="No orders yet" description="Orders you place in this demo store will appear here.">
        <LinkButton href="/shop">Start shopping</LinkButton>
      </EmptyState>
    );
  }
  return (
    <ul className="space-y-5">
      {orders.map((o) => <li key={o.id}><OrderDetails order={o} /></li>)}
    </ul>
  );
}
