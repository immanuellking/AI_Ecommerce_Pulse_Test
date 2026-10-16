"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CartIcon, ChevronDown, CloseIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/ui/icons";
import { SearchForm } from "@/components/layout/search-form";
import { itemCount } from "@/lib/pricing";
import { DRESS_STYLES } from "@/lib/store-config";
import { cn } from "@/lib/cn";
import { useCart } from "@/store/cart";
import type { Category } from "@/types";

const NAV = [
  { label: "On Sale", href: "/shop?sale=1" },
  { label: "New Arrivals", href: "/shop?sort=newest" },
  { label: "Brands", href: "/brands" },
];

export function Header({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const shopRef = useRef<HTMLDivElement>(null);
  const { items, hydrated } = useCart();
  const count = hydrated ? itemCount(items) : 0;

  // Close menus on navigation (state adjusted during render, per React's guidance).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setSearchOpen(false);
    setShopOpen(false);
  }

  useEffect(() => {
    if (!shopOpen) return;
    const onClick = (e: MouseEvent) => !shopRef.current?.contains(e.target as Node) && setShopOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShopOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [shopOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-paper">
      <div className="container-page">
        <div className="flex h-16 items-center gap-4 lg:h-24 lg:gap-10">
          <button type="button" className="-ml-1 p-1 lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}>
            <MenuIcon />
          </button>
          <Link href="/" className="font-heading -mt-1 text-[25px] lg:text-[32px]" aria-label="AI.CO home">AI.CO</Link>

          <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
            <div ref={shopRef} className="relative">
              <button type="button" onClick={() => setShopOpen((v) => !v)} aria-expanded={shopOpen} aria-haspopup="true"
                className="flex items-center gap-1 hover:opacity-70">
                Shop <ChevronDown size={18} className={cn("transition-transform", shopOpen && "rotate-180")} />
              </button>
              {shopOpen && (
                <div className="absolute left-0 top-full z-50 mt-4 grid w-[440px] animate-fade-in grid-cols-2 gap-6 rounded-[20px] border border-line bg-paper p-6 shadow-xl">
                  <div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-widest text-subtle">Categories</p>
                    <ul className="space-y-2">
                      <li><Link href="/shop" className="font-medium hover:underline">All products</Link></li>
                      {categories.map((c) => (
                        <li key={c.id}><Link href={`/shop?category=${c.id}`} className="text-muted hover:text-ink">{c.name}</Link></li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-3 text-xs font-medium uppercase tracking-widest text-subtle">Dress style</p>
                    <ul className="space-y-2">
                      {DRESS_STYLES.map((s) => (
                        <li key={s.id}><Link href={`/shop?style=${s.id}`} className="text-muted hover:text-ink">{s.name}</Link></li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="whitespace-nowrap hover:opacity-70">{n.label}</Link>
            ))}
          </nav>

          <SearchForm className="hidden flex-1 lg:block" />

          <div className="ml-auto flex items-center gap-3 lg:ml-0 lg:gap-3.5">
            <button type="button" className="lg:hidden" onClick={() => setSearchOpen((v) => !v)} aria-label="Search" aria-expanded={searchOpen}>
              <SearchIcon />
            </button>
            <Link href="/cart" className="relative hover:opacity-70" aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}>
              <CartIcon />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-ink px-1 text-[10px] font-bold text-paper">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>
            <Link href="/account" className="hover:opacity-70" aria-label="Account"><UserIcon /></Link>
          </div>
        </div>
        {searchOpen && <SearchForm className="pb-4 lg:hidden" autoFocus onSubmitted={() => setSearchOpen(false)} />}
        {pathname !== "/" && <hr className="border-line" />}
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 animate-fade-in bg-ink/40" onClick={() => setMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col overflow-y-auto bg-paper p-5">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-heading text-[25px]">AI.CO</span>
              <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu"><CloseIcon /></button>
            </div>
            <nav aria-label="Mobile" className="space-y-6">
              <ul className="space-y-3 text-lg">
                <li><Link href="/shop" className="font-medium">Shop all</Link></li>
                {NAV.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}
                <li><Link href="/cart">Cart{count > 0 ? ` (${count})` : ""}</Link></li>
                <li><Link href="/account">Account</Link></li>
              </ul>
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-subtle">Categories</p>
                <ul className="space-y-2.5">
                  {categories.map((c) => <li key={c.id}><Link href={`/shop?category=${c.id}`} className="text-muted">{c.name}</Link></li>)}
                </ul>
              </div>
              <div>
                <p className="mb-3 text-xs font-medium uppercase tracking-widest text-subtle">Dress style</p>
                <ul className="space-y-2.5">
                  {DRESS_STYLES.map((s) => <li key={s.id}><Link href={`/shop?style=${s.id}`} className="text-muted">{s.name}</Link></li>)}
                </ul>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
