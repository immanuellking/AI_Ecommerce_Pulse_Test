"use client";

import Link from "next/link";
import { Button, buttonClasses } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { AlertIcon } from "@/components/ui/icons";

/** Shared body for route error boundaries (e.g. the product API is unreachable). */
export function ErrorView({ reset, title = "We couldn't load the products" }: { reset: () => void; title?: string }) {
  return (
    <div className="container-page py-12">
      <EmptyState icon={<AlertIcon />} title={title}
        description="The product service didn't respond. Check your connection and try again.">
        <Button onClick={reset}>Try again</Button>
        <Link href="/" className={buttonClasses({ variant: "outline" })}>Go home</Link>
      </EmptyState>
    </div>
  );
}
