"use client";

import { CloseIcon } from "@/components/ui/icons";
import { useUi } from "@/store/ui";

export function TopBanner() {
  const { bannerDismissed, dismissBanner } = useUi();
  if (bannerDismissed) return null;
  return (
    <div className="bg-ink text-paper">
      <div className="container-page relative flex h-[34px] items-center justify-center text-xs lg:h-[38px] lg:text-sm">
        <p>
          Sign up and get 20% off to your first order.{" "}
          <a href="#newsletter" className="font-medium underline underline-offset-2">Sign Up Now</a>
        </p>
        <button type="button" onClick={dismissBanner} aria-label="Dismiss announcement"
          className="absolute right-4 hidden opacity-90 hover:opacity-100 sm:block">
          <CloseIcon size={20} />
        </button>
      </div>
    </div>
  );
}
