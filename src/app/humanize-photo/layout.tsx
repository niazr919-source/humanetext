import type { Metadata } from "next";
import FaqSection from "@/components/FaqSection";

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

const FAQS = [
  {
    q: "What kinds of photos work best?",
    a: "AI-generated images and over-smoothed or heavily denoised photos benefit most, because both lack the texture a real sensor produces. Images that already carry visible high-ISO noise are the wrong candidate — adding grain on top of grain produces a muddy double texture.",
  },
  {
    q: "What does the photo humanizer actually do?",
    a: "It builds a softened monochromatic noise field and composites it with an overlay blend, so the grain lands hardest in the midtones and is compressed in shadows and highlights. A light sharpening pass and a JPEG encode follow, so the texture passes through something resembling a real capture pipeline.",
  },
  {
    q: "Is the photo humanizer free?",
    a: "Yes, with a daily quota per visitor and no signup needed. Adding your email raises the limit. Downloads are full resolution and carry no watermark.",
  },
  {
    q: "Do you keep the images I upload?",
    a: "Your image is processed to generate the result and is not retained for any other purpose. Do not use the tool on photojournalism, evidence, insurance, or scientific imaging — our terms rule that out, because texture implying a capture condition that did not occur crosses a real line.",
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_JSON_LD) }}
      />
      {children}
      <FaqSection faqs={FAQS} />
    </>
  );
}
