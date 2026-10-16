# AI.CO storefront

A responsive fashion storefront built from the AI.CO Figma community template. Product data comes from the free [DummyJSON](https://dummyjson.com/docs/products) API.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## Pages

| Route                           | Purpose                                                                                                                                                |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/`                             | Hero, brand strip, New Arrivals, Top Selling, Browse by Dress Style, customer reviews                                                                  |
| `/shop`                         | Product grid with category, dress style, price, colour, size, brand, sale and search filters, plus sorting and pagination. All state lives in the URL. |
| `/product/[slug]`               | Gallery, size selection, stock-aware quantity, Add to Cart, details / reviews / FAQ tabs, related products                                             |
| `/cart`                         | Line items, quantity, remove, promo codes (`SHOP20`, `SAVE10`), order summary                                                                          |
| `/checkout`                     | Four steps (contact → shipping → delivery → review) with validation, then a **simulated** order                                                        |
| `/checkout/success`, `/account` | Order confirmation and order history (stored in this browser)                                                                                          |
| `/brands`, `/info/[slug]`       | Brand index; footer content pages                                                                                                                      |

## How it fits together

- **`src/lib/api.ts`**: the DummyJSON client. It maps API products to the app's `Product` type: prices in integer cents, discounts, colours taken from product titles, and size options for apparel and shoes. Set `PRODUCTS_API_URL` to point at another compatible host.
- **`src/lib/catalog.ts`**: the only data access that pages use. It fetches the catalog once, caches it for an hour (`'use cache'`), keeps only fashion categories (`STORE_CATEGORIES` in `src/lib/store-config.ts`), and handles filtering, sorting and pagination. To move to a real backend, change these two files.
- **`src/lib/pricing.ts`**: the single source for subtotal, discount, delivery and total. The cart, checkout and saved orders all use it.
- **`src/store/`**: Zustand stores persisted to `localStorage` (cart, orders, reviews you write, banner dismissal). `StoreHydrator` loads them after the first render, so server and client markup match.
- **`src/lib/filters.ts`**: converts between `/shop` URL params and filter objects. Used on both server and client.

## Known limitations

- **No real payments or accounts.** Checkout is clearly labelled as a demo. Orders exist only in this browser.
- **Sample data.** DummyJSON has about 54 fashion products. They have no real colour or size variants: colours are read from product titles, and apparel/shoe sizes are added by the app. Its minimum order quantities are ignored.
- **Fonts.** The design's heading font, Integral CF, is commercial, so **Archivo Expanded** stands in. Body text uses **Satoshi** (`src/fonts/`), licensed under the ITF Free Font License. That license allows self-hosting on your own site but **not redistribution**, so don't publish the font file in a public repository.
- **Reviews you write** are saved only in your browser, because the API is read-only.
- `design-reference/` holds the Figma exports (about 41 MB) and isn't used at runtime.
