import Image from "next/image";
import { LinkButton } from "@/components/ui/button";
import { SparkleIcon } from "@/components/ui/icons";

const STATS = [
  { value: "200+", label: "International Brands" },
  { value: "2,000+", label: "High-Quality Products" },
  { value: "30,000+", label: "Happy Customers" },
];

export function Hero() {
  return (
    <section className="overflow-hidden bg-hero">
      <div className="container-page grid lg:min-h-[663px] lg:grid-cols-2">
        <div className="pt-10 lg:pb-[116px] lg:pt-[103px]">
          <h1 className="font-heading text-[36px] leading-[34px] lg:text-[64px] lg:leading-[64px]">
            Find clothes that matches your style
          </h1>
          <p className="mt-5 text-sm leading-5 text-muted lg:mt-8 lg:max-w-[545px] lg:text-base lg:leading-[22px]">
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
          </p>
          <LinkButton href="/shop" size="lg" className="mt-6 w-full sm:w-auto lg:mt-8 lg:w-[210px]">Shop Now</LinkButton>
          <dl className="relative mt-5 flex flex-wrap justify-center gap-x-8 gap-y-3 lg:mt-12 lg:justify-start lg:gap-0">
            {STATS.map((s, i) => (
              <div key={s.label}
                className={i === 1 ? "border-l border-line pl-8 lg:mx-8 lg:border-r lg:px-8" : i === 2 ? "w-full text-center lg:w-auto lg:text-left" : ""}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-2xl font-bold lg:text-[40px] lg:leading-[54px]">{s.value}</dd>
                <dd className="text-xs text-muted lg:text-base">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative -mx-4 mt-6 h-[448px] sm:mx-0 lg:mt-0 lg:h-auto">
          <Image src="/images/hero-image.webp" alt="Two models wearing denim jackets over white hoodies" fill priority
            sizes="(min-width: 1024px) 620px, 100vw" className="object-cover object-top lg:object-contain lg:object-bottom" />
          <SparkleIcon className="absolute right-4 top-9 size-[76px] lg:right-0 lg:top-[86px] lg:size-[104px]" />
          <SparkleIcon className="absolute left-7 top-[140px] size-11 lg:left-0 lg:top-[300px] lg:size-14" />
        </div>
      </div>
    </section>
  );
}
