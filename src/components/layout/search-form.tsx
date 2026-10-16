"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";
import { SearchIcon } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

export function SearchForm({ className, autoFocus, onSubmitted }: { className?: string; autoFocus?: boolean; onSubmitted?: () => void }) {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  return (
    <form role="search" className={cn("relative", className)}
      onSubmit={(e) => {
        e.preventDefault();
        const q = ref.current?.value.trim() ?? "";
        router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
        onSubmitted?.();
      }}>
      <label htmlFor={autoFocus ? "search-mobile" : "search"} className="sr-only">Search for products</label>
      <SearchIcon size={22} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-subtle" />
      <input ref={ref} id={autoFocus ? "search-mobile" : "search"} type="search" name="q" autoFocus={autoFocus}
        placeholder="Search for products..." autoComplete="off" maxLength={100}
        className="h-12 w-full rounded-full bg-surface pl-[52px] pr-4 text-base outline-none placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-ink" />
    </form>
  );
}
