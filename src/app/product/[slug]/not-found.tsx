import { LinkButton } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { BagIcon } from "@/components/ui/icons";

export default function ProductNotFound() {
  return (
    <div className="container-page py-12">
      <EmptyState icon={<BagIcon />} title="Product not found" description="This product doesn't exist or is no longer available.">
        <LinkButton href="/shop">Browse the shop</LinkButton>
      </EmptyState>
    </div>
  );
}
