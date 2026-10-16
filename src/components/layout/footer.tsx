import Link from "next/link";
import { Newsletter } from "@/components/layout/newsletter";
import { SocialIcons } from "@/components/ui/icons";

const COLUMNS = [
  {
    title: "Company",
    links: [
      ["About", "about"],
      ["Features", "features"],
      ["Works", "works"],
      ["Career", "career"],
    ],
  },
  {
    title: "Help",
    links: [
      ["Customer Support", "support"],
      ["Delivery Details", "delivery"],
      ["Terms & Conditions", "terms"],
      ["Privacy Policy", "privacy"],
    ],
  },
  {
    title: "FAQ",
    links: [
      ["Account", "/account"],
      ["Manage Deliveries", "delivery"],
      ["Orders", "/account"],
      ["Payments", "payments"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["Free eBooks", "ebooks"],
      ["Development Tutorial", "tutorial"],
      ["How to - Blog", "blog"],
      ["Youtube Playlist", "youtube"],
    ],
  },
];

const SOCIAL = [
  { label: "Twitter", href: "https://twitter.com", icon: SocialIcons.twitter },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: SocialIcons.facebook,
    filled: true,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: SocialIcons.instagram,
  },
  { label: "GitHub", href: "https://github.com", icon: SocialIcons.github },
];

const PAYMENTS = ["Visa", "Mastercard", "PayPal", "Apple Pay", "Google Pay"];

export function Footer() {
  return (
    <footer className="mt-12 lg:mt-20">
      <div className="bg-[linear-gradient(to_bottom,var(--color-paper)_50%,var(--color-surface)_50%)]">
        <div className="container-page">
          <Newsletter />
        </div>
      </div>
      <div className="bg-surface pb-20 pt-12 lg:pb-[88px] lg:pt-[50px]">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 border-b border-line pb-10 lg:grid-cols-[1.6fr_repeat(4,1fr)] lg:gap-10 lg:pb-[50px]">
            <div className="col-span-2 lg:col-span-1">
              <Link
                href="/"
                className="font-heading text-[28px] lg:text-[33px]"
              >
                AI.CO
              </Link>
              <p className="mt-4 max-w-[248px] text-sm leading-[22px] text-muted lg:mt-6">
                We have clothes that suits your style and which you&apos;re
                proud to wear. From women to men.
              </p>
              <ul className="mt-5 flex gap-3 lg:mt-9">
                {SOCIAL.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className={
                        s.filled
                          ? "grid size-7 place-items-center rounded-full border border-ink bg-ink text-paper hover:opacity-80"
                          : "grid size-7 place-items-center rounded-full border border-line bg-paper hover:bg-ink hover:text-paper"
                      }
                    >
                      {s.icon}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="mb-4 text-sm font-medium uppercase tracking-[3px] lg:mb-6 lg:text-base">
                  {col.title}
                </h3>
                <ul className="space-y-3 text-sm text-muted lg:space-y-4 lg:text-base">
                  {col.links.map(([label, target]) => (
                    <li key={label}>
                      <Link
                        href={
                          target.startsWith("/") ? target : `/info/${target}`
                        }
                        className="hover:text-ink"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-4 pt-4 lg:flex-row lg:justify-between lg:pt-6">
            <p className="text-sm text-muted">
              AI.CO © 2000-2023, All Rights Reserved
            </p>
            <ul
              className="flex gap-2.5"
              aria-label="Accepted payment methods (display only)"
            >
              {PAYMENTS.map((p) => (
                <li
                  key={p}
                  className="grid h-[30px] min-w-[46px] place-items-center rounded-md border border-line bg-paper px-2 text-[10px] font-bold italic text-[#1a1f71]"
                >
                  {p === "Mastercard" ? (
                    <span className="flex" aria-label="Mastercard">
                      <span className="size-4 rounded-full bg-[#eb001b]" />
                      <span className="-ml-1.5 size-4 rounded-full bg-[#f79e1b]/90" />
                    </span>
                  ) : p === "Apple Pay" ? (
                    <span className="not-italic text-ink">Apple Pay</span>
                  ) : p === "Google Pay" ? (
                    <span className="font-medium not-italic text-muted">
                      G Pay
                    </span>
                  ) : (
                    <span className={p === "PayPal" ? "text-[#003087]" : ""}>
                      {p.toUpperCase() === "VISA" ? "VISA" : p}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
