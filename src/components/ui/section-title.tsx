import { cn } from "@/lib/cn";

export function SectionTitle({ children, className, as: Tag = "h2" }: { children: React.ReactNode; className?: string; as?: "h1" | "h2" }) {
  return <Tag className={cn("font-heading text-[32px] lg:text-5xl", className)}>{children}</Tag>;
}
