import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/ui/section-title";
import { DRESS_STYLES } from "@/lib/store-config";

// Desktop layout from the design: narrow/wide on the first row, wide/narrow on the second.
const SPANS = ["lg:col-span-2", "lg:col-span-3", "lg:col-span-3", "lg:col-span-2"];

export function DressStyles() {
  return (
    <section className="container-page">
      <div className="rounded-[20px] bg-surface px-6 pb-7 pt-10 lg:rounded-[40px] lg:px-16 lg:pb-[76px] lg:pt-[70px]">
        <SectionTitle className="mb-7 text-center lg:mb-16">Browse by dress style</SectionTitle>
        <ul className="grid gap-4 lg:grid-cols-5 lg:gap-5">
          {DRESS_STYLES.map((s, i) => (
            <li key={s.id} className={SPANS[i]}>
              <Link href={`/shop?style=${s.id}`}
                className="group relative block h-[190px] overflow-hidden rounded-[20px] bg-paper lg:h-[289px]">
                <Image src={s.image} alt="" fill sizes="(min-width: 1024px) 684px, 100vw"
                  className="object-cover object-right transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute left-6 top-4 text-2xl font-bold lg:left-9 lg:top-6 lg:text-4xl">{s.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
