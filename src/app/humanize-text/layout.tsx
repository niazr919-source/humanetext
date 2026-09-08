import type { Metadata } from "next";
import FaqSection from "@/components/FaqSection";

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
  name: "Humanetext Text Humanizer",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any (web browser)",
  url: `${SITE_URL}/humanize-text`,
  description:
    "Rewrites AI-generated or robotic text into natural, varied prose while preserving the original meaning.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const FAQS = [
  {
    q: "Will humanizing change the meaning of my text?",
    a: "No. The rewrite preserves your facts, claims, and intent — it changes phrasing, sentence rhythm, and structure so the prose reads naturally. Always reread the result before you use it, because you are the one accountable for what it says.",
  },
  {
    q: "Is the text humanizer free?",
    a: "Yes. Every visitor gets a daily free quota with no signup, and adding your email raises the daily limit. There is no trial that expires and no card required to use the tool.",
  },
  {
    q: "Will this get past an AI detector?",
    a: "We do not promise that, and no tool honestly can. Detectors estimate how statistically predictable text is, and results vary between tools and between runs. If you are trying to satisfy an academic or client requirement, the reliable route is writing and editing the piece yourself.",
  },
  {
    q: "Do you store the text I paste in?",
    a: "We process your text to produce the rewrite and do not use it for anything beyond that request. Our privacy policy sets out exactly what is handled and by whom.",
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
