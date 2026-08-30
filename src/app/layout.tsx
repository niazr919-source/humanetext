import type { Metadata } from "next";
import { Geist, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SECONDARY_AD_SCRIPTS } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://humanetext.com";
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Humanetext — Make AI content sound and look natural",
    template: "%s | Humanetext",
  },
  description:
    "Rewrite robotic AI text so it reads naturally, and add authentic photographic texture to AI images. Free to use.",
  openGraph: {
    title: "Humanetext — Make AI content sound and look natural",
    description:
      "Rewrite robotic AI text so it reads naturally, and add authentic photographic texture to AI images. Free to use.",
    url: SITE_URL,
    siteName: "Humanetext",
    type: "website",
    images: [{ url: "/og/default.png", width: 1200, height: 630, alt: "Humanetext" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Humanetext — Make AI content sound and look natural",
    description:
      "Rewrite robotic AI text so it reads naturally, and add authentic photographic texture to AI images.",
    images: ["/og/default.png"],
  },
  other: ADSENSE_CLIENT_ID ? { "google-adsense-account": ADSENSE_CLIENT_ID } : undefined,
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${SITE_URL}/feed.xml` },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Humanetext",
  url: SITE_URL,
  description:
    "Free tools that rewrite AI-generated text to sound natural and add authentic camera-like texture to photos.",
};

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Humanetext",
  url: SITE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        {/* Second ad network. The vendor asks for this immediately before
            </head>; the App Router does not expose a literal head element, so
            it loads as the first thing in the document body, which is the
            earliest equivalent position. Loaded async — the vendor's snippet is
            synchronous, which would block first paint and cost Core Web Vitals
            on every page. Ad scripts are built to load this way; the AdSense
            tag below does the same. */}
        {SECONDARY_AD_SCRIPTS.map((src) => (
          <script key={src} async src={src} />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
        <Nav />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        {ADSENSE_CLIENT_ID && (
          // Plain, unprocessed <script> tag on purpose — Next.js's <Script>
          // component rewrites this into a <link rel="preload"> instead of a
          // literal <script> element, which fails AdSense's site-verification
          // check (it does a simple text match on the raw HTML for the exact
          // tag it gave you to paste).
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </body>
    </html>
  );
}
