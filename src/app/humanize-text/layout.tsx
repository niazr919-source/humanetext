import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://humanetext.com";

export const metadata: Metadata = {
  title: "Text Humanizer",
  description:
    "Paste in AI-generated or robotic text and get a natural, human-sounding rewrite that keeps your original meaning.",
  alternates: { canonical: "/humanize-text" },
};

const APP_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Humanwords Text Humanizer",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (web browser)",
  url: `${SITE_URL}/humanize-text`,
  description:
    "Rewrites AI-generated or robotic text into natural, varied prose while preserving the original meaning.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_JSON_LD) }}
      />
      {children}
    </>
  );
}
