import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Humanetext — Make AI content sound and look natural",
    description:
      "Rewrite robotic AI text so it reads naturally, and add authentic photographic texture to AI images.",
  },
  other: ADSENSE_CLIENT_ID ? { "google-adsense-account": ADSENSE_CLIENT_ID } : undefined,
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
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
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
