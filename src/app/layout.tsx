import type { Metadata } from "next";
import Script from "next/script";
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
    default: "Humanwords — Make AI content sound and look natural",
    template: "%s | Humanwords",
  },
  description:
    "Rewrite robotic AI text so it reads naturally, and add authentic photographic texture to AI images. Free to use.",
  openGraph: {
    title: "Humanwords — Make AI content sound and look natural",
    description:
      "Rewrite robotic AI text so it reads naturally, and add authentic photographic texture to AI images. Free to use.",
    url: SITE_URL,
    siteName: "Humanwords",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Humanwords — Make AI content sound and look natural",
    description:
      "Rewrite robotic AI text so it reads naturally, and add authentic photographic texture to AI images.",
  },
  other: ADSENSE_CLIENT_ID ? { "google-adsense-account": ADSENSE_CLIENT_ID } : undefined,
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
        <Nav />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
        {ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
