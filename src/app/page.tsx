import { BrandBar } from "@/components/home/brand-bar";
import { DressStyles } from "@/components/home/dress-styles";
import { Hero } from "@/components/home/hero";
import { ProductSection } from "@/components/home/product-section";
import { Testimonials } from "@/components/home/testimonials";
import { getNewArrivals, getTestimonials, getTopSelling } from "@/lib/catalog";

export default async function HomePage() {
  const [newArrivals, topSelling, testimonials] = await Promise.all([getNewArrivals(4), getTopSelling(4), getTestimonials(8)]);
  return (
    <>
      <Hero />
      <BrandBar />
      <ProductSection title="New arrivals" products={newArrivals} viewAllHref="/shop?sort=newest" />
      <div className="container-page"><hr className="border-line" /></div>
      <ProductSection title="Top selling" products={topSelling} viewAllHref="/shop?sort=popular" />
      <DressStyles />
      <Testimonials reviews={testimonials} />
    </>
  );
}
