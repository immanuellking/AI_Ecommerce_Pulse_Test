import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "secondary" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-3 rounded-full font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 select-none";
const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ink/85",
  outline: "border border-line bg-paper text-ink hover:bg-surface",
  secondary: "bg-surface text-muted hover:bg-line hover:text-ink",
  inverse: "bg-paper text-ink hover:bg-surface",
};
const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-8 text-base",
  lg: "h-[52px] px-14 text-base",
};

export function buttonClasses({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; size?: Size; loading?: boolean };

export function Button({ variant, size, className, loading, children, disabled, ...props }: ButtonProps) {
  return (
    <button className={buttonClasses({ variant, size, className })} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
      {loading && <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />}
      {children}
    </button>
  );
}

type LinkButtonProps = ComponentProps<typeof Link> & { variant?: Variant; size?: Size; children: ReactNode };

export function LinkButton({ variant, size, className, ...props }: LinkButtonProps) {
  return <Link className={buttonClasses({ variant, size, className })} {...props} />;
}
