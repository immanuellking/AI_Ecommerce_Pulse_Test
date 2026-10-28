import type { Metadata, Viewport } from "next";
import { display, satoshi } from "@/app/fonts";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { TopBanner } from "@/components/layout/top-banner";
import { Toaster } from "@/components/ui/toaster";
import { getCategories } from "@/lib/catalog";
import { StoreHydrator } from "@/store/hydrator";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "AI.CO — Find clothes that match your style",
    template: "%s | AI.CO",
  },
  description:
    "Browse a diverse range of clothing, shoes and accessories designed to bring out your individuality.",
};

export const viewport: Viewport = { themeColor: "#000000" };

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories().catch(() => []);
  return (
    <html lang="en" className={`${satoshi.variable} ${display.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[70] rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <TopBanner />
        <Header categories={categories} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
        <StoreHydrator />
        <Script
          src="https://pulse-ai-dynamic-script-generator.s3.eu-north-1.amazonaws.com/generated/C7MNpr6iTiPXC8kg.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
