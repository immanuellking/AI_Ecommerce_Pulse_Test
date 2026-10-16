"use client";

import { CartLine } from "@/components/cart/cart-line";
import { OrderSummary } from "@/components/cart/order-summary";
import { LinkButton } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ArrowRight, CartIcon } from "@/components/ui/icons";
import { SectionTitle } from "@/components/ui/section-title";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/store/cart";

export function CartView() {
  const { items, hydrated } = useCart();

  return (
    <>
      <SectionTitle as="h1" className="mb-5 lg:mb-6">Your cart</SectionTitle>
      {!hydrated ? (
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_505px]" aria-busy="true" aria-label="Loading cart">
          <Skeleton className="h-[390px]" />
          <Skeleton className="h-[390px]" />
        </div>
      ) : items.length === 0 ? (
        <EmptyState icon={<CartIcon />} title="Your cart is empty" description="Looks like you haven't added anything yet. Find something you love.">
          <LinkButton href="/shop">Continue shopping</LinkButton>
        </EmptyState>
      ) : (
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_505px]">
          <ul className="divide-y divide-line rounded-[20px] border border-line px-3.5 py-3.5 lg:px-6 lg:py-5" aria-label="Cart items">
            {items.map((item) => <CartLine key={item.key} item={item} />)}
          </ul>
          <OrderSummary>
            <LinkButton href="/checkout" size="lg" className="w-full px-6">Go to Checkout <ArrowRight size={22} /></LinkButton>
            <LinkButton href="/shop" variant="outline" className="mt-3 w-full">Continue shopping</LinkButton>
          </OrderSummary>
        </div>
      )}
    </>
  );
}
