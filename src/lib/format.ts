const whole = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const cents = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

/** Formats integer cents, dropping ".00" for whole-dollar amounts ($145, $26.99). */
export function formatPrice(amount: number): string {
  return amount % 100 === 0 ? whole.format(amount / 100) : cents.format(amount / 100);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
