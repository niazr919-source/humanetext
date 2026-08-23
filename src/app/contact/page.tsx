import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, PRIVACY_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "How to reach Humanetext — support for the Text and Photo Humanizer, corrections to an article, privacy requests, and press enquiries.",
  alternates: { canonical: "/contact" },
};

const ROUTES = [
  {
    heading: "Tool support",
    body: "A rewrite that came back wrong, an upload that failed, a result that lost your meaning. Paste in the text or describe the image and what you expected — it makes the problem far quicker to reproduce.",
    email: CONTACT_EMAIL,
  },
  {
    heading: "Corrections",
    body: "If an article gets something wrong, we want to fix it. Point us at the sentence and, where you can, what the correct version is. Substantive corrections get a dated note on the article rather than a silent edit.",
    email: CONTACT_EMAIL,
  },
  {
    heading: "Privacy and data requests",
    body: "Removal of a waitlist email, questions about what we store, or anything else covered by our privacy policy.",
    email: PRIVACY_EMAIL,
  },
  {
    heading: "Press and everything else",
    body: "Questions about how the tools work, requests to quote our writing, or anything that does not fit the categories above.",
    email: CONTACT_EMAIL,
  },
];

const CONTACT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${SITE_NAME}`,
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CONTACT_JSON_LD) }}
      />

      <h1 className="font-display text-4xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-4 text-lg text-ink-soft">
        We read everything that arrives and reply to most of it within a few
        business days. There is no ticket system and no chatbot — messages go to
        a person.
      </p>

      <div className="mt-10 space-y-4">
        {ROUTES.map((route) => (
          <div key={route.heading} className="rounded-2xl border border-line p-6">
            <h2 className="font-display text-lg font-semibold">{route.heading}</h2>
            <p className="mt-2 text-sm text-ink-soft">{route.body}</p>
            <a
              href={`mailto:${route.email}?subject=${encodeURIComponent(route.heading)}`}
              className="mt-3 inline-block text-sm font-medium text-accent-dark hover:underline"
            >
              {route.email}
            </a>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-line bg-paper-dim/40 p-6">
        <h2 className="font-display text-lg font-semibold">Before you write in</h2>
        <p className="mt-2 text-sm text-ink-soft">
          A few things we get asked often enough that the answer is already
          written down:
        </p>
        <ul className="mt-3 space-y-2 text-sm text-ink-soft">
          <li>
            <strong className="text-ink">Do you store what I submit?</strong> No
            — text and images are processed and discarded, never written to a
            database. Details in the{" "}
            <Link href="/privacy" className="text-accent-dark hover:underline">
              privacy policy
            </Link>
            .
          </li>
          <li>
            <strong className="text-ink">Will this beat an AI detector?</strong>{" "}
            We make no such promise, and we explain why that claim is not one
            anybody can honestly make in{" "}
            <Link
              href="/blog/how-ai-content-detectors-work"
              className="text-accent-dark hover:underline"
            >
              how AI content detectors actually work
            </Link>
            .
          </li>
          <li>
            <strong className="text-ink">Why only three uses a day?</strong>{" "}
            Each rewrite calls a paid model and the site is funded by
            advertising. See{" "}
            <Link href="/pricing" className="text-accent-dark hover:underline">
              pricing
            </Link>
            .
          </li>
          <li>
            <strong className="text-ink">
              Who writes the articles, and how?
            </strong>{" "}
            Set out in full on our{" "}
            <Link
              href="/about/editorial"
              className="text-accent-dark hover:underline"
            >
              editorial standards
            </Link>{" "}
            page.
          </li>
        </ul>
      </div>

      <p className="mt-8 text-sm text-ink-soft">
        We do not accept guest posts, paid links, or sponsored articles, so
        messages offering them will not get a reply.
      </p>
    </div>
  );
}
