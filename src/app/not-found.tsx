import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-page py-16 text-center lg:py-24">
      <p className="font-heading text-[80px] lg:text-[120px]">404</p>
      <h1 className="mt-2 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <LinkButton href="/">Go home</LinkButton>
        <LinkButton href="/shop" variant="outline">Browse the shop</LinkButton>
      </div>
    </div>
  );
}
