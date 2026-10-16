"use client";

import { useState } from "react";
import { MailIcon } from "@/components/ui/icons";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [done, setDone] = useState(false);

  return (
    <section id="newsletter" aria-labelledby="newsletter-title" className="scroll-mt-28 rounded-[20px] bg-ink px-6 py-8 text-paper lg:flex lg:items-center lg:justify-between lg:gap-10 lg:px-16 lg:py-9">
      <h2 id="newsletter-title" className="font-heading text-[32px] lg:max-w-[551px] lg:text-[40px] lg:leading-[1.12]">
        Stay upto date about our latest offers
      </h2>
      {done ? (
        <div className="mt-8 lg:mt-0 lg:w-[349px]" role="status">
          <p className="font-medium">You&apos;re on the list.</p>
          <p className="mt-1 text-sm text-paper/70">
            Use code <strong className="text-paper">SHOP20</strong> at checkout for 20% off. (Demo store, so no email is actually sent.)
          </p>
        </div>
      ) : (
        <form noValidate className="mt-8 flex w-full flex-col gap-3.5 lg:mt-0 lg:w-[349px]"
          onSubmit={(e) => {
            e.preventDefault();
            if (!EMAIL.test(email.trim())) return setError("Enter a valid email address");
            setError(undefined);
            setDone(true);
          }}>
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <div className="relative">
            <MailIcon size={22} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-subtle" />
            <input id="newsletter-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address" autoComplete="email" aria-invalid={!!error} aria-describedby={error ? "newsletter-error" : undefined}
              className="h-12 w-full rounded-full bg-paper pl-[52px] pr-4 text-sm text-ink outline-none placeholder:text-subtle lg:text-base" />
          </div>
          {error && <p id="newsletter-error" className="-mt-1.5 px-4 text-sm text-sale">{error}</p>}
          <button type="submit" className="h-12 rounded-full bg-paper text-sm font-medium text-ink hover:bg-surface lg:text-base">
            Subscribe to Newsletter
          </button>
        </form>
      )}
    </section>
  );
}
