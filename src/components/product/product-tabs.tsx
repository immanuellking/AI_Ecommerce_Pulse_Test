"use client";

import { useMemo, useState } from "react";
import { ReviewForm } from "@/components/product/review-form";
import { Button } from "@/components/ui/button";
import { ChevronDown, VerifiedIcon } from "@/components/ui/icons";
import { Stars } from "@/components/ui/stars";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/cn";
import { useLocalReviews } from "@/store/reviews";
import { useToast } from "@/store/toast";
import type { Product, Review } from "@/types";

const TABS = ["Product Details", "Rating & Reviews", "FAQs"] as const;
type Tab = (typeof TABS)[number];
type ReviewSort = "latest" | "highest" | "lowest";
const PAGE = 6;

const EMPTY: Review[] = [];

export function ProductTabs({ product, categoryName }: { product: Product; categoryName: string }) {
  const [tab, setTab] = useState<Tab>("Rating & Reviews");
  return (
    <section className="mt-12 lg:mt-20">
      <div role="tablist" aria-label="Product information" className="grid grid-cols-3 border-b border-line">
        {TABS.map((t) => (
          <button key={t} role="tab" id={`tab-${t}`} aria-selected={tab === t} aria-controls={`panel-${t}`} onClick={() => setTab(t)}
            className={cn("-mb-px border-b-2 pb-3 text-base transition-colors lg:pb-6 lg:text-xl",
              tab === t ? "border-ink font-medium text-ink" : "border-transparent text-muted hover:text-ink")}>
            {t}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="pt-6">
        {tab === "Product Details" && <Details product={product} categoryName={categoryName} />}
        {tab === "Rating & Reviews" && <Reviews product={product} />}
        {tab === "FAQs" && <Faqs product={product} />}
      </div>
    </section>
  );
}

function Details({ product, categoryName }: { product: Product; categoryName: string }) {
  const rows: [string, string | undefined][] = [
    ["Brand", product.brand],
    ["Category", categoryName],
    ["SKU", product.sku],
    ["Colour", product.colors.map((c) => c.name).join(", ") || undefined],
    ["Sizes", product.sizes?.join(", ")],
    ["Warranty", product.warranty],
    ["Shipping", product.shipping],
    ["Returns", product.returnPolicy],
  ];
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
      <p className="leading-7 text-muted">{product.description}</p>
      <dl className="divide-y divide-line rounded-[20px] border border-line px-6">
        {rows.filter(([, v]) => v).map(([k, v]) => (
          <div key={k} className="flex justify-between gap-6 py-3.5 text-sm lg:text-base">
            <dt className="text-muted">{k}</dt>
            <dd className="text-right font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Reviews({ product }: { product: Product }) {
  const local = useLocalReviews((s) => s.byProduct[product.id] ?? EMPTY);
  const addReview = useLocalReviews((s) => s.addReview);
  const show = useToast((s) => s.show);
  const [sort, setSort] = useState<ReviewSort>("latest");
  const [visible, setVisible] = useState(PAGE);
  const [writing, setWriting] = useState(false);

  const reviews = useMemo(() => {
    const all = [...local.map((r) => ({ ...r, mine: true })), ...product.reviews.map((r) => ({ ...r, mine: false }))];
    return all.sort((a, b) =>
      sort === "highest" ? b.rating - a.rating : sort === "lowest" ? a.rating - b.rating : b.date.localeCompare(a.date));
  }, [local, product.reviews, sort]);

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-3 lg:mb-8">
        <h3 className="text-xl font-bold lg:text-2xl">
          All Reviews <span className="text-sm font-normal text-muted lg:text-base">({reviews.length})</span>
        </h3>
        <div className="flex items-center gap-2.5">
          <label className="relative hidden sm:block">
            <span className="sr-only">Sort reviews</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as ReviewSort)}
              className="h-12 cursor-pointer appearance-none rounded-full bg-surface pl-5 pr-11 font-medium outline-none focus-visible:ring-2 focus-visible:ring-ink">
              <option value="latest">Latest</option>
              <option value="highest">Highest rated</option>
              <option value="lowest">Lowest rated</option>
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2" />
          </label>
          <Button type="button" onClick={() => setWriting(true)} size="sm" className="h-10 px-4 lg:h-12 lg:px-5">Write a Review</Button>
        </div>
      </div>
      {reviews.length ? (
        <ul className="grid gap-4 lg:grid-cols-2 lg:gap-5">
          {reviews.slice(0, visible).map((r, i) => (
            <li key={i} className="rounded-[20px] border border-line px-6 py-6 lg:px-8 lg:py-7">
              <Stars rating={r.rating} size={20} showValue={false} />
              <p className="mt-3 flex items-center gap-1 text-base font-bold lg:mt-4 lg:text-xl">
                {r.reviewerName} {r.mine ? <span className="ml-1 rounded-full bg-surface px-2 py-0.5 text-xs font-medium">Your review</span> : <VerifiedIcon size={20} />}
              </p>
              <p className="mt-2 text-sm leading-5 text-muted lg:mt-3 lg:text-base lg:leading-[22px]">&ldquo;{r.comment}&rdquo;</p>
              <p className="mt-4 text-sm font-medium text-muted lg:mt-6 lg:text-base">Posted on {formatDate(r.date)}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">No reviews yet. Be the first to write one.</p>
      )}
      {visible < reviews.length && (
        <div className="mt-5 flex justify-center lg:mt-9">
          <Button type="button" variant="outline" size="lg" onClick={() => setVisible((v) => v + PAGE)} className="w-full sm:w-[230px]">
            Load More Reviews
          </Button>
        </div>
      )}
      {writing && (
        <ReviewForm onClose={() => setWriting(false)}
          onSubmit={(r) => {
            addReview(product.id, r);
            setWriting(false);
            setSort("latest");
            show({ title: "Review posted", description: "It's saved in this browser only." });
          }} />
      )}
    </div>
  );
}

function Faqs({ product }: { product: Product }) {
  const faqs = [
    { q: "How long does delivery take?", a: `${product.shipping ?? "Orders ship within a few business days"}. At checkout you can choose standard ($15, 3–5 business days) or express ($30, 1–2 business days).` },
    { q: "What is the return policy?", a: product.returnPolicy ?? "Contact support for return options." },
    { q: "Is there a warranty?", a: product.warranty ?? "No warranty information is available for this product." },
    { q: "Will I be charged when I place an order?", a: "No. This is a demo store: checkout simulates an order and no payment is taken." },
  ];
  return (
    <div className="divide-y divide-line rounded-[20px] border border-line">
      {faqs.map((f) => (
        <details key={f.q} className="group px-6 py-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium lg:text-lg">
            {f.q} <ChevronDown size={20} className="shrink-0 transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-3 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
