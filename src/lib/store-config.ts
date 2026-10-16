import type { ColorOption, DressStyleId, SortOption } from "@/types";

/** Store-wide configuration shared by server and client code. */

/** The store sells fashion, so only these product-API categories are shown. */
export const STORE_CATEGORIES = [
  "mens-shirts",
  "tops",
  "womens-dresses",
  "mens-shoes",
  "womens-shoes",
  "womens-bags",
  "mens-watches",
  "womens-watches",
  "womens-jewellery",
  "sunglasses",
  "fragrances",
] as const;

export const DRESS_STYLES: { id: DressStyleId; name: string; image: string; categories: string[] }[] = [
  { id: "casual", name: "Casual", image: "/images/casual.webp", categories: ["mens-shirts", "tops", "sunglasses"] },
  { id: "formal", name: "Formal", image: "/images/formal.webp", categories: ["womens-dresses", "mens-watches", "womens-watches", "womens-bags"] },
  { id: "party", name: "Party", image: "/images/party.webp", categories: ["womens-jewellery", "fragrances", "womens-shoes"] },
  { id: "gym", name: "Gym", image: "/images/gym.webp", categories: ["mens-shoes"] },
];

export const SORT_OPTIONS: { id: SortOption; label: string }[] = [
  { id: "popular", label: "Most Popular" },
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Top Rated" },
];

/** Colour swatches (design palette). Products are tagged only with colours named in their title. */
export const COLOR_SWATCHES: ColorOption[] = [
  { name: "Green", hex: "#00C12B" },
  { name: "Red", hex: "#F50606" },
  { name: "Yellow", hex: "#F5DD06" },
  { name: "Orange", hex: "#F57906" },
  { name: "Blue", hex: "#063AF5" },
  { name: "Purple", hex: "#7D06F5" },
  { name: "Pink", hex: "#F506A4" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#000000" },
  { name: "Gray", hex: "#8C8C8C" },
  { name: "Brown", hex: "#7A5134" },
  { name: "Gold", hex: "#D4AF37" },
];

export const PAGE_SIZE = 9;
