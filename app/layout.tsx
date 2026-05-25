import type { Metadata } from "next";
import { Outfit, Figtree } from "next/font/google";
import Header from "@/components/headers/Header";
import Footer from "@/components/Footer";
import { FilmGrain, Vignette } from "@/components/motion";
import { siteConfig } from "@/content/site-config";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.siteUrl),
  title: {
    default: siteConfig.seo.title,
    template: `%s — ${siteConfig.company.name}`,
  },
  description: siteConfig.seo.description,
  openGraph: {
    type: "website",
    locale: siteConfig.seo.locale,
    siteName: siteConfig.company.name,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.seo.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.seo.twitter,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${figtree.variable}`}
    >
      <body className="bg-bg text-ink">
        <Header />
        <main className="relative">{children}</main>
        <Footer />
        <FilmGrain opacity={0.04} />
        <Vignette color="#7A3826" />
      </body>
    </html>
  );
}
