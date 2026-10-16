import { forwardRef, type ComponentProps } from "react";
import { cn } from "@/lib/cn";

type FieldProps = ComponentProps<"input"> & { label: string; error?: string; hint?: string };

export const FormField = forwardRef<HTMLInputElement, FieldProps>(function FormField({ label, error, hint, id, className, required, ...props }, ref) {
  const inputId = id ?? props.name;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;
  return (
    <div className={className}>
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium">
        {label} {required ? <span className="text-sale" aria-hidden="true">*</span> : <span className="font-normal text-subtle">(optional)</span>}
      </label>
      <input ref={ref} id={inputId} required={required} aria-invalid={!!error} aria-describedby={describedBy}
        className={cn("h-12 w-full rounded-full bg-surface px-5 text-base outline-none placeholder:text-subtle focus-visible:ring-2 focus-visible:ring-ink",
          error && "bg-sale/5 ring-1 ring-sale")}
        {...props} />
      {error ? <p id={`${inputId}-error`} className="mt-1.5 px-5 text-sm text-sale">{error}</p>
        : hint ? <p id={`${inputId}-hint`} className="mt-1.5 px-5 text-xs text-muted">{hint}</p> : null}
    </div>
  );
});
