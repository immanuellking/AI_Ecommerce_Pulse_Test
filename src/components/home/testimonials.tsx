"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight, VerifiedIcon } from "@/components/ui/icons";
import { SectionTitle } from "@/components/ui/section-title";
import { Stars } from "@/components/ui/stars";
import type { Review } from "@/types";

type Testimonial = Review & { product: { name: string; slug: string } };

export function Testimonials({ reviews }: { reviews: Testimonial[] }) {
  const track = useRef<HTMLUListElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 400) + 20), behavior: "smooth" });
  };
  if (!reviews.length) return null;
  return (
    <section className="py-12 lg:py-20" aria-roledescription="carousel" aria-label="Customer reviews">
      <div className="container-page mb-6 flex items-end justify-between gap-4 lg:mb-10">
        <SectionTitle>Our happy customers</SectionTitle>
        <div className="flex gap-4 pb-1">
          <button type="button" onClick={() => scroll(-1)} aria-label="Previous reviews" className="hover:opacity-60"><ArrowLeft /></button>
          <button type="button" onClick={() => scroll(1)} aria-label="Next reviews" className="hover:opacity-60"><ArrowRight /></button>
        </div>
      </div>
      <ul ref={track}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 lg:gap-5 lg:scroll-px-[max(1rem,calc((100vw-1240px)/2))] lg:px-[max(1rem,calc((100vw-1240px)/2))]">
        {reviews.map((r, i) => (
          <li key={i} className="relative w-[358px] max-w-[88vw] shrink-0 snap-start rounded-[20px] border border-line px-6 py-6 lg:w-[400px] lg:px-8 lg:py-7">
            <Stars rating={r.rating} size={20} showValue={false} />
            <p className="mt-3 flex items-center gap-1 text-base font-bold lg:mt-4 lg:text-xl">
              {r.reviewerName} <VerifiedIcon size={20} /><span className="sr-only">(verified buyer)</span>
            </p>
            <blockquote className="mt-2 text-sm leading-5 text-muted lg:mt-3 lg:text-base lg:leading-[22px]">&ldquo;{r.comment}&rdquo;</blockquote>
            <p className="mt-3 text-xs text-subtle">
              on <Link href={`/product/${r.product.slug}`} className="underline underline-offset-2 hover:text-ink">{r.product.name}</Link>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
