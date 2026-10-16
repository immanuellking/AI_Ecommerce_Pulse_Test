import type { Metadata } from "next";
import { CheckoutClient } from "@/components/checkout/checkout-client";
import { SectionTitle } from "@/components/ui/section-title";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <div className="container-page">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <SectionTitle as="h1" className="mb-5 lg:mb-6">Checkout</SectionTitle>
      <CheckoutClient />
    </div>
  );
}
