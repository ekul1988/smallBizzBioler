import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/lib/site.config";
import { GA_ID, SITE_URL } from "@/lib/env";
import JsonLd from "@/components/JsonLd";

/**
 * layout.tsx — the shell every page renders inside.
 * Three jobs, all driven by site.config.ts:
 *   1. <head> metadata (title, description, Open Graph) via the Metadata API
 *   2. injecting the per-client theme as CSS variables on <html>
 *   3. site-wide extras: JSON-LD structured data + optional Google Analytics
 */

const { business, seo, theme } = siteConfig;

// The Metadata API: Next.js turns this object into <title>, <meta> and
// Open Graph tags at build time. metadataBase makes relative URLs (like
// the ogImage path) absolute using the real domain from the env.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: seo.metaTitle,
  description: seo.metaDescription,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: business.name,
    title: seo.metaTitle,
    description: seo.metaDescription,
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: business.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.metaTitle,
    description: seo.metaDescription,
    images: [seo.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // THEME INJECTION: the config's colors/font become CSS variables here.
    // globals.css registers them as Tailwind tokens, so every `bg-primary`
    // or `text-accent` class on the page picks them up automatically.
    <html
      lang="en"
      style={
        {
          "--primary": theme.primaryColor,
          "--accent": theme.accentColor,
          "--site-font": theme.fontFamily,
        } as React.CSSProperties
      }
    >
      <body>
        {/* Machine-readable business info for Google (see JsonLd.tsx). */}
        <JsonLd />

        {children}

        {/* Google Analytics 4 — injected ONLY when NEXT_PUBLIC_GA_ID is set
            at build time. No ID → no scripts → nothing to consent to. */}
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
