import type { Metadata } from "next";
import { CartView } from "@/components/cart/cart-view";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = { title: "Cart" };

export default function CartPage() {
  return (
    <div className="container-page">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <CartView />
    </div>
  );
}
