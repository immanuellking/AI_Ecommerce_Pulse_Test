import Image from "next/image";
import { formatDate, formatPrice } from "@/lib/format";
import { DELIVERY_METHODS, lineTotal } from "@/lib/pricing";
import type { Order } from "@/types";

export function OrderDetails({ order }: { order: Order }) {
  const delivery = DELIVERY_METHODS.find((m) => m.id === order.delivery);
  const t = order.totals;
  return (
    <div className="rounded-[20px] border border-line px-5 py-5 lg:px-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-4">
        <p className="font-bold">Order {order.id}</p>
        <p className="text-sm text-muted">{formatDate(order.placedAt)}</p>
      </div>
      <ul className="divide-y divide-line">
        {order.items.map((i) => (
          <li key={i.key} className="flex items-center gap-3 py-3">
            <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-card">
              <Image src={i.image} alt="" fill sizes="56px" className="object-contain p-1" />
            </span>
            <span className="min-w-0 flex-1 text-sm">
              <span className="block truncate font-medium">{i.name}</span>
              <span className="text-muted">Qty {i.quantity}{i.size ? ` · Size ${i.size}` : ""}</span>
            </span>
            <span className="text-sm font-bold">{formatPrice(lineTotal(i))}</span>
          </li>
        ))}
      </ul>
      <dl className="space-y-2 border-t border-line pt-4 text-sm">
        <div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{formatPrice(t.subtotal)}</dd></div>
        {t.discount > 0 && <div className="flex justify-between"><dt className="text-muted">Discount ({order.coupon})</dt><dd className="text-sale">-{formatPrice(t.discount)}</dd></div>}
        <div className="flex justify-between"><dt className="text-muted">{delivery?.label ?? "Delivery"}</dt><dd>{formatPrice(t.shipping)}</dd></div>
        <div className="flex justify-between border-t border-line pt-2 text-base font-bold"><dt>Total</dt><dd>{formatPrice(t.total)}</dd></div>
      </dl>
      <div className="mt-4 grid gap-4 border-t border-line pt-4 text-sm sm:grid-cols-2">
        <div>
          <p className="mb-1 font-bold">Ship to</p>
          <p className="leading-6 text-muted">
            {order.contact.firstName} {order.contact.lastName}<br />
            {order.address.street}{order.address.apartment && `, ${order.address.apartment}`}<br />
            {order.address.city}, {order.address.state} {order.address.postalCode}<br />{order.address.country}
          </p>
        </div>
        <div>
          <p className="mb-1 font-bold">Contact</p>
          <p className="leading-6 text-muted">{order.contact.email}<br />{order.contact.phone}</p>
          <p className="mb-1 mt-3 font-bold">Delivery</p>
          <p className="text-muted">{delivery?.label}, {delivery?.eta}</p>
        </div>
      </div>
    </div>
  );
}
