/** Category slug as provided by the product API (e.g. "smartphones"). */
export type CategoryId = string;

export interface Category {
  id: CategoryId;
  name: string;
}

export type ProductTag = "sale" | "bestseller" | "new";

export interface ColorOption {
  name: string;
  hex: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

export type AvailabilityStatus = "In Stock" | "Low Stock" | "Out of Stock";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand?: string;
  sku?: string;
  category: CategoryId;
  /** Selling price in integer cents (after discount). */
  price: number;
  /** Original price in integer cents, when discounted. */
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  thumbnail: string;
  images: string[];
  description: string;
  /** Colours named in the product title (descriptive, not selectable variants). */
  colors: ColorOption[];
  /** Selectable sizes, when the product comes in sizes. */
  sizes?: string[];
  discountPercent: number;
  stock: number;
  availability: AvailabilityStatus;
  warranty?: string;
  shipping?: string;
  returnPolicy?: string;
  tags: ProductTag[];
  createdAt: string;
}

export type SortOption = "popular" | "newest" | "price-asc" | "price-desc" | "rating";

export type DressStyleId = "casual" | "formal" | "party" | "gym";

export interface ProductFilters {
  q?: string;
  category?: CategoryId;
  style?: DressStyleId;
  brand?: string;
  color?: string;
  size?: string;
  minPrice?: number; // cents
  maxPrice?: number; // cents
  sale?: boolean;
  inStock?: boolean;
  sort?: SortOption;
  page?: number;
}

export interface ProductPage {
  items: Product[];
  total: number;
  page: number;
  pageCount: number;
  pageSize: number;
}

export interface CartItem {
  /** `${productId}:${color}:${size}` */
  key: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  unitPrice: number; // cents
  color?: string;
  size?: string;
  quantity: number;
  maxQuantity: number;
}

export interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Address {
  street: string;
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export type DeliveryMethodId = "standard" | "express";

export interface DeliveryMethod {
  id: DeliveryMethodId;
  label: string;
  eta: string;
  /** Cents. Standard may be waived by the free-shipping threshold. */
  price: number;
}

export interface OrderTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface Order {
  id: string;
  placedAt: string;
  items: CartItem[];
  contact: ContactInfo;
  address: Address;
  delivery: DeliveryMethodId;
  coupon?: string;
  totals: OrderTotals;
}
