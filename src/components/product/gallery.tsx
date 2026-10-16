"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

/** Main image with thumbnails (vertical column on desktop, row below on mobile). */
export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const thumbs = images.length > 1 ? images : [];
  return (
    <div className="flex flex-col gap-3 lg:flex-row-reverse lg:gap-3.5">
      <div className="relative aspect-[358/290] w-full overflow-hidden rounded-[20px] bg-card lg:aspect-auto lg:h-[530px] lg:flex-1">
        <Image src={images[active]} alt={`${name}, image ${active + 1} of ${images.length}`} fill priority
          sizes="(min-width: 1024px) 444px, 100vw" className="object-contain p-6" />
      </div>
      {thumbs.length > 0 && (
        <ul className="no-scrollbar flex gap-3 overflow-x-auto lg:max-h-[530px] lg:w-[152px] lg:shrink-0 lg:flex-col lg:overflow-y-auto lg:overflow-x-visible lg:gap-3.5"
          aria-label="Product images">
          {thumbs.map((src, i) => (
            <li key={src} className="shrink-0">
              <button type="button" onClick={() => setActive(i)} aria-label={`Show image ${i + 1}`} aria-current={i === active}
                className={cn("relative block size-[106px] overflow-hidden rounded-[20px] border bg-card transition-colors sm:size-[111px] lg:h-[167px] lg:w-[152px]",
                  i === active ? "border-ink" : "border-transparent hover:border-line")}>
                <Image src={src} alt="" fill sizes="152px" className="object-contain p-2" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
