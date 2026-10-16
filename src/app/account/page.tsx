import type { Metadata } from "next";
import { OrderHistory } from "@/components/checkout/order-history";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { SectionTitle } from "@/components/ui/section-title";

export const metadata: Metadata = { title: "Your orders" };

export default function AccountPage() {
  return (
    <div className="container-page">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Account" }]} />
      <SectionTitle as="h1" className="mb-3">Your orders</SectionTitle>
      <p className="mb-6 max-w-2xl text-muted">
        Accounts aren&apos;t available in this demo store. Orders you place are saved in this browser and listed below.
      </p>
      <OrderHistory />
    </div>
  );
}
