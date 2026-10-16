import { Archivo } from "next/font/google";
import localFont from "next/font/local";

/** Body text: Satoshi (self-hosted, ITF Free Font License). */
export const satoshi = localFont({
  src: "../fonts/Satoshi-Variable.woff2",
  weight: "300 900",
  variable: "--font-satoshi",
  display: "swap",
});

/** Headings: the design uses Integral CF (commercial); Archivo Expanded is the closest free match. */
export const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display-face",
  display: "swap",
});
