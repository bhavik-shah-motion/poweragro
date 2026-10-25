import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Power Agro — Bearing Importers & Exporters, Mumbai",
    template: "%s — Power Agro",
  },
  description:
    "Power Agro is a Mumbai-based import & export trade house for genuine agricultural and industrial bearings — FAG, SKF, Timken, NSK, NTN, KOYO, NACHI, Schaeffler.",
  keywords: [
    "bearing importer Mumbai",
    "bearing exporter India",
    "FAG bearings India",
    "SKF bearings supplier",
    "Timken India",
    "agricultural bearings",
    "industrial bearings",
    "NSK NTN KOYO NACHI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${plusJakarta.variable} h-full antialiased scroll-smooth overflow-x-hidden`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col overflow-x-hidden w-full"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
