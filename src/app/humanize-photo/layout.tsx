import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://humanetext.com";

export const metadata: Metadata = {
  title: "Photo Humanizer",
  description:
    "Add realistic camera-like grain and micro-detail to a photo so it reads as authentic photography.",
  alternates: { canonical: "/humanize-photo" },
};

const APP_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Humanetext Photo Humanizer",
  applicationCategory: "PhotoEditingApplication",
  operatingSystem: "Any (web browser)",
  url: `${SITE_URL}/humanize-photo`,
  description:
    "Adds realistic camera-like grain and micro-detail to AI-generated or low-quality photos so they read as authentic photography.",
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
