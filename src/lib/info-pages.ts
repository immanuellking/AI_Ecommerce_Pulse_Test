/** Content for footer links that don't have a dedicated page in this demo store. */
export interface InfoPage {
  title: string;
  body: string[];
  cta?: { label: string; href: string };
}

export const INFO_PAGES: Record<string, InfoPage> = {
  about: {
    title: "About AI.CO",
    body: [
      "AI.CO is a demo fashion storefront built from the AI.CO Figma community template.",
      "Products, prices and reviews come from the free DummyJSON product API, so they are sample data rather than real stock.",
    ],
    cta: { label: "Start shopping", href: "/shop" },
  },
  features: {
    title: "Features",
    body: [
      "Browse by category or dress style, filter by price, colour and size, and keep your cart across visits — it's saved in your browser.",
    ],
    cta: { label: "Browse the shop", href: "/shop" },
  },
  works: {
    title: "Works",
    body: [
      "This section of the template has no content in the demo store yet.",
    ],
  },
  career: {
    title: "Careers",
    body: ["We're not hiring through this demo store. Check back later."],
  },
  support: {
    title: "Customer Support",
    body: [
      "This is a demo store, so no support team is staffed. Orders placed here are simulated and never shipped or charged.",
    ],
  },
  delivery: {
    title: "Delivery Details",
    body: [
      "Standard delivery costs $15 and takes 3–5 business days. Express delivery costs $30 and takes 1–2 business days.",
      "You choose a delivery method at checkout, and the fee is shown in your order summary before you place the order.",
    ],
  },
  terms: {
    title: "Terms & Conditions",
    body: [
      "Orders in this demo store are simulated. No payment is taken and no goods are shipped.",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    body: [
      "Your cart, orders and checkout details are stored only in this browser's local storage. Nothing is sent to a server.",
    ],
  },
  payments: {
    title: "Payments",
    body: [
      "Payments are not enabled in this demo. Checkout simulates an order without charging you.",
    ],
  },
  ebooks: {
    title: "Free eBooks",
    body: ["No eBooks are available in the demo store."],
  },
  tutorial: {
    title: "Development Tutorial",
    body: [
      "Built with Next.js, TypeScript, Tailwind CSS and Zustand. Product data comes from dummyjson.com.",
    ],
  },
  blog: {
    title: "How to - Blog",
    body: ["The blog isn't part of this demo store."],
  },
  youtube: {
    title: "Youtube Playlist",
    body: ["There's no video playlist for this demo store."],
  },
};
