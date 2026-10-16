"use client";

import Link from "next/link";
import { CheckIcon, AlertIcon, CloseIcon } from "@/components/ui/icons";
import { useToast } from "@/store/toast";
import { cn } from "@/lib/cn";

export function Toaster() {
  const { toasts, dismiss } = useToast();
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-4 bottom-4 z-[60] flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:items-end">
      {toasts.map((t) => (
        <div key={t.id} role="status"
          className="pointer-events-auto flex w-full max-w-sm animate-toast-in items-start gap-3 rounded-[20px] bg-ink p-4 text-paper shadow-xl">
          <span className={cn("mt-0.5 grid size-6 shrink-0 place-items-center rounded-full", t.tone === "error" ? "bg-sale" : "bg-verified")}>
            {t.tone === "error" ? <AlertIcon size={14} /> : <CheckIcon size={14} strokeWidth={3} />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-medium">{t.title}</p>
            {t.description && <p className="mt-0.5 text-sm text-paper/70">{t.description}</p>}
            {t.action && (
              <Link href={t.action.href} onClick={() => dismiss(t.id)} className="mt-2 inline-block text-sm font-medium underline underline-offset-4">
                {t.action.label}
              </Link>
            )}
          </div>
          <button type="button" onClick={() => dismiss(t.id)} aria-label="Dismiss notification" className="text-paper/60 hover:text-paper">
            <CloseIcon size={18} />
          </button>
        </div>
      ))}
    </div>
  );
}
