import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { LinkButton } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { INFO_PAGES } from "@/lib/info-pages";

export function generateStaticParams() {
  return Object.keys(INFO_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/info/[slug]">): Promise<Metadata> {
  return { title: INFO_PAGES[(await params).slug]?.title ?? "Not found" };
}

export default async function InfoPage({ params }: PageProps<"/info/[slug]">) {
  const page = INFO_PAGES[(await params).slug];
  if (!page) notFound();
  return (
    <div className="container-page">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: page.title }]} />
      <div className="max-w-2xl">
        <SectionTitle as="h1" className="mb-6">{page.title}</SectionTitle>
        <div className="space-y-4 text-lg leading-8 text-muted">
          {page.body.map((p) => <p key={p}>{p}</p>)}
        </div>
        {page.cta && <LinkButton href={page.cta.href} className="mt-8">{page.cta.label}</LinkButton>}
      </div>
    </div>
  );
}
