import Link from "next/link";
import { ChevronRight } from "@/components/ui/icons";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-5 lg:py-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted lg:gap-3 lg:text-base">
        {items.map((item, i) => (
          <li key={item.label + i} className="flex items-center gap-1.5 lg:gap-3">
            {item.href ? (
              <Link href={item.href} className="hover:text-ink">{item.label}</Link>
            ) : (
              <span className="text-ink" aria-current="page">{item.label}</span>
            )}
            {i < items.length - 1 && <ChevronRight size={16} />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
