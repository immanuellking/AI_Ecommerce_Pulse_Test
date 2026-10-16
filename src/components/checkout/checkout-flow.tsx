"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { OrderSummary } from "@/components/cart/order-summary";
import { Button, LinkButton } from "@/components/ui/button";
import { AlertIcon, ArrowLeft, CheckIcon, TruckIcon } from "@/components/ui/icons";
import { FormField } from "@/components/ui/form-field";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { computeTotals, DELIVERY_METHODS, lineTotal } from "@/lib/pricing";
import { hasErrors, validateAddress, validateContact, type FieldErrors } from "@/lib/validation";
import { useCart } from "@/store/cart";
import { generateOrderId, useOrders } from "@/store/orders";
import type { Address, ContactInfo, DeliveryMethodId, Order } from "@/types";

const STEPS = ["Contact", "Shipping", "Delivery", "Review"] as const;
const COUNTRIES = ["United States", "Canada", "United Kingdom", "Nigeria", "Ghana", "Kenya", "South Africa", "Germany", "France", "Australia"];
const DRAFT_KEY = "shopco-checkout-draft";

interface Draft {
  step: number;
  contact: ContactInfo;
  address: Address;
  delivery: DeliveryMethodId;
}

const EMPTY: Draft = {
  step: 0,
  contact: { firstName: "", lastName: "", email: "", phone: "" },
  address: { street: "", apartment: "", city: "", state: "", postalCode: "", country: "United States" },
  delivery: "standard",
};

function loadDraft(): Draft {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function CheckoutFlow() {
  const router = useRouter();
  const { items, coupon, hydrated, clear } = useCart();
  const addOrder = useOrders((s) => s.addOrder);
  // This component renders client-only (see checkout page), so sessionStorage is available here.
  const [draft, setDraft] = useState<Draft>(loadDraft);
  const [contactErrors, setContactErrors] = useState<FieldErrors<ContactInfo>>({});
  const [addressErrors, setAddressErrors] = useState<FieldErrors<Address>>({});
  const [placing, setPlacing] = useState(false);
  const [placeError, setPlaceError] = useState<string>();
  const [placedOrderId, setPlacedOrderId] = useState<string>();
  const stepHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft)); } catch { /* storage unavailable */ }
  }, [draft]);

  const { step, contact, address, delivery } = draft;
  const update = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }));
  const goTo = (s: number) => {
    update({ step: s });
    requestAnimationFrame(() => stepHeading.current?.focus());
  };

  const focusFirstError = (errors: object) => {
    const first = Object.keys(errors)[0];
    if (first) requestAnimationFrame(() => document.getElementById(first)?.focus());
  };

  const next = () => {
    if (step === 0) {
      const e = validateContact(contact);
      setContactErrors(e);
      if (hasErrors(e)) return focusFirstError(e);
    }
    if (step === 1) {
      const e = validateAddress(address);
      setAddressErrors(e);
      if (hasErrors(e)) return focusFirstError(e);
    }
    goTo(Math.min(step + 1, STEPS.length - 1));
  };

  const placeOrder = async () => {
    // Re-validate everything in case the draft was edited elsewhere.
    const ce = validateContact(contact);
    const ae = validateAddress(address);
    if (hasErrors(ce)) { setContactErrors(ce); return goTo(0); }
    if (hasErrors(ae)) { setAddressErrors(ae); return goTo(1); }
    setPlacing(true);
    setPlaceError(undefined);
    try {
      await new Promise((r) => setTimeout(r, 1200)); // simulated order submission
      const order: Order = {
        id: generateOrderId(),
        placedAt: new Date().toISOString(),
        items,
        contact,
        address,
        delivery,
        coupon,
        totals: computeTotals(items, { coupon, delivery }),
      };
      addOrder(order);
      setPlacedOrderId(order.id);
      setDraft(EMPTY);
      setPlacing(false);
      clear();
      router.replace(`/checkout/success?order=${order.id}`);
    } catch {
      setPlaceError("Something went wrong placing your order. Please try again.");
      setPlacing(false);
    }
  };

  if (!hydrated) {
    return (
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_505px]" aria-busy="true" aria-label="Loading checkout">
        <Skeleton className="h-[480px]" />
        <Skeleton className="h-[320px]" />
      </div>
    );
  }

  if (!items.length && placedOrderId) {
    return (
      <div className="rounded-[20px] border border-line px-6 py-14 text-center" role="status">
        <h2 className="text-xl font-bold lg:text-2xl">Order placed</h2>
        <p className="mt-2 text-muted">Your demo order {placedOrderId} has been recorded.</p>
        <LinkButton href={`/checkout/success?order=${placedOrderId}`} className="mt-6">View confirmation</LinkButton>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="rounded-[20px] border border-line px-6 py-14 text-center">
        <h2 className="text-xl font-bold lg:text-2xl">Your cart is empty</h2>
        <p className="mt-2 text-muted">Add something to your cart before checking out.</p>
        <LinkButton href="/shop" className="mt-6">Continue shopping</LinkButton>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_505px]">
      <div className="rounded-[20px] border border-line px-5 py-6 lg:px-8 lg:py-7">
        <ol className="mb-7 grid grid-cols-4 gap-2" aria-label="Checkout steps">
          {STEPS.map((label, i) => (
            <li key={label}>
              <button type="button" disabled={i > step} onClick={() => goTo(i)} aria-current={i === step ? "step" : undefined}
                className="group flex w-full flex-col items-center gap-2 text-xs disabled:cursor-default sm:text-sm">
                <span className={cn("grid size-8 place-items-center rounded-full text-sm font-bold transition-colors",
                  i < step ? "bg-ink text-paper group-hover:bg-ink/80" : i === step ? "bg-ink text-paper ring-4 ring-surface" : "bg-surface text-subtle")}>
                  {i < step ? <CheckIcon size={16} strokeWidth={3} /> : i + 1}
                </span>
                <span className={i <= step ? "font-medium text-ink" : "text-subtle"}>{label}</span>
              </button>
            </li>
          ))}
        </ol>

        <form noValidate onSubmit={(e) => { e.preventDefault(); if (step < 3) next(); else void placeOrder(); }}>
          <h2 ref={stepHeading} tabIndex={-1} className="mb-5 text-xl font-bold outline-none lg:text-2xl">
            {["Contact information", "Shipping address", "Delivery method", "Review your order"][step]}
          </h2>

          {step === 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="First name" name="firstName" required autoComplete="given-name" value={contact.firstName}
                error={contactErrors.firstName} onChange={(e) => update({ contact: { ...contact, firstName: e.target.value } })} />
              <FormField label="Last name" name="lastName" required autoComplete="family-name" value={contact.lastName}
                error={contactErrors.lastName} onChange={(e) => update({ contact: { ...contact, lastName: e.target.value } })} />
              <FormField label="Email" name="email" type="email" required autoComplete="email" inputMode="email" value={contact.email}
                error={contactErrors.email} hint="We'll show your order confirmation here. No email is sent in this demo."
                onChange={(e) => update({ contact: { ...contact, email: e.target.value } })} />
              <FormField label="Phone number" name="phone" type="tel" required autoComplete="tel" value={contact.phone}
                error={contactErrors.phone} onChange={(e) => update({ contact: { ...contact, phone: e.target.value } })} />
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField className="sm:col-span-2" label="Street address" name="street" required autoComplete="address-line1" value={address.street}
                error={addressErrors.street} onChange={(e) => update({ address: { ...address, street: e.target.value } })} />
              <FormField className="sm:col-span-2" label="Apartment, suite, etc." name="apartment" autoComplete="address-line2" value={address.apartment}
                onChange={(e) => update({ address: { ...address, apartment: e.target.value } })} />
              <FormField label="Town / City" name="city" required autoComplete="address-level2" value={address.city}
                error={addressErrors.city} onChange={(e) => update({ address: { ...address, city: e.target.value } })} />
              <FormField label="State / Region" name="state" required autoComplete="address-level1" value={address.state}
                error={addressErrors.state} onChange={(e) => update({ address: { ...address, state: e.target.value } })} />
              <FormField label="Postal code" name="postalCode" required autoComplete="postal-code" value={address.postalCode}
                error={addressErrors.postalCode} onChange={(e) => update({ address: { ...address, postalCode: e.target.value } })} />
              <div>
                <label htmlFor="country" className="mb-2 block text-sm font-medium">Country <span className="text-sale" aria-hidden="true">*</span></label>
                <select id="country" name="country" autoComplete="country-name" value={address.country}
                  onChange={(e) => update({ address: { ...address, country: e.target.value } })}
                  className="h-12 w-full cursor-pointer appearance-none rounded-full bg-surface px-5 outline-none focus-visible:ring-2 focus-visible:ring-ink">
                  {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                </select>
                {addressErrors.country && <p className="mt-1.5 px-5 text-sm text-sale">{addressErrors.country}</p>}
              </div>
            </div>
          )}

          {step === 2 && (
            <fieldset>
              <legend className="sr-only">Delivery method</legend>
              <div className="grid gap-3">
                {DELIVERY_METHODS.map((m) => (
                  <label key={m.id}
                    className={cn("flex cursor-pointer items-center gap-4 rounded-[20px] border px-5 py-4 transition-colors",
                      delivery === m.id ? "border-ink bg-surface" : "border-line hover:bg-surface")}>
                    <input type="radio" name="delivery" value={m.id} checked={delivery === m.id} onChange={() => update({ delivery: m.id })}
                      className="size-5 accent-ink" />
                    <TruckIcon className="shrink-0 text-muted" />
                    <span className="flex-1">
                      <span className="block font-medium">{m.label}</span>
                      <span className="block text-sm text-muted">{m.eta}</span>
                    </span>
                    <span className="font-bold">{formatPrice(m.price)}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="flex gap-3 rounded-[20px] bg-surface p-4 text-sm" role="note">
                <AlertIcon size={20} className="mt-0.5 shrink-0" />
                <p><strong>Demo checkout:</strong> payments aren&apos;t set up for this store. Placing the order only simulates it. Nothing is charged and nothing ships.</p>
              </div>
              <ReviewBlock title="Contact" onEdit={() => goTo(0)}>
                {contact.firstName} {contact.lastName}<br />{contact.email}<br />{contact.phone}
              </ReviewBlock>
              <ReviewBlock title="Ship to" onEdit={() => goTo(1)}>
                {address.street}{address.apartment && `, ${address.apartment}`}<br />
                {address.city}, {address.state} {address.postalCode}<br />{address.country}
              </ReviewBlock>
              <ReviewBlock title="Delivery" onEdit={() => goTo(2)}>
                {DELIVERY_METHODS.find((m) => m.id === delivery)?.label} ({DELIVERY_METHODS.find((m) => m.id === delivery)?.eta})
              </ReviewBlock>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-bold">Items ({items.reduce((n, i) => n + i.quantity, 0)})</h3>
                  <Link href="/cart" className="text-sm font-medium underline underline-offset-4">Edit cart</Link>
                </div>
                <ul className="divide-y divide-line">
                  {items.map((i) => (
                    <li key={i.key} className="flex items-center gap-3 py-3">
                      <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-card">
                        <Image src={i.image} alt="" fill sizes="56px" className="object-contain p-1" />
                      </span>
                      <span className="min-w-0 flex-1 text-sm">
                        <span className="block truncate font-medium">{i.name}</span>
                        <span className="text-muted">Qty {i.quantity}{i.size ? ` · Size ${i.size}` : ""}</span>
                      </span>
                      <span className="text-sm font-bold">{formatPrice(lineTotal(i))}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {placeError && <p role="alert" className="text-sm text-sale">{placeError}</p>}
            </div>
          )}

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            {step > 0 ? (
              <Button type="button" variant="outline" onClick={() => goTo(step - 1)} disabled={placing}><ArrowLeft size={20} /> Back</Button>
            ) : (
              <LinkButton href="/cart" variant="outline"><ArrowLeft size={20} /> Back to cart</LinkButton>
            )}
            <Button type="submit" loading={placing} className="sm:min-w-[220px]">
              {step < 3 ? `Continue to ${STEPS[step + 1].toLowerCase()}` : placing ? "Placing order…" : "Place order (demo)"}
            </Button>
          </div>
        </form>
      </div>

      <div className="lg:sticky lg:top-28">
        <OrderSummary delivery={step >= 2 ? delivery : "standard"} editablePromo={step < 3} />
      </div>
    </div>
  );
}

function ReviewBlock({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line pb-4">
      <div>
        <h3 className="mb-1 font-bold">{title}</h3>
        <p className="text-sm leading-6 text-muted">{children}</p>
      </div>
      <button type="button" onClick={onEdit} className="text-sm font-medium underline underline-offset-4">Edit</button>
    </div>
  );
}
