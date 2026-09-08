import type { Faq } from "@/lib/posts";

/**
 * Renders a FAQ accordion together with the matching FAQPage structured data.
 * The two are generated from one array on purpose — Google treats schema that
 * does not appear in the visible page as a violation.
 */
export default function FaqSection({
  faqs,
  heading = "Frequently asked questions",
}: {
  faqs: Faq[];
  heading?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <section className="border-t border-line">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-6 py-14">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          {heading}
        </h2>
        <div className="mt-6 divide-y divide-line">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {faq.q}
                <span className="shrink-0 text-ink-soft transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
