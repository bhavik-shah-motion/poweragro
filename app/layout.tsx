import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Power Agro — Global Trade in Agricultural & Industrial Bearings",
  description: "Power Agro is a Mumbai-based import and export house specialising in agricultural and industrial bearings from the world's leading manufacturers.",
  keywords: [
    "bearings",
    "agricultural bearings",
    "industrial bearings",
    "FAG bearings",
    "SKF bearings",
    "Timken bearings",
    "NSK bearings",
    "bearing importer Mumbai",
    "bearing exporter India",
    "Schaeffler bearings"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${archivo.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col bg-white text-ink dark:bg-primary-dark dark:text-paper"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
