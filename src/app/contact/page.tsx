import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach Humanwords with questions, feedback, or a bug report.",
  alternates: { canonical: "/contact" },
};

const CONTACT_EMAIL = "hello@humanetext.com";

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-4 text-ink-soft">
        Questions about the Text or Photo Humanizer, feedback on a result, or a bug
        to report — we&apos;d like to hear about it.
      </p>

      <div className="mt-8 rounded-2xl border border-line bg-paper-dim/40 p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">Email</p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-1 inline-block text-lg font-medium text-accent-dark hover:underline"
        >
          {CONTACT_EMAIL}
        </a>
        <p className="mt-3 text-sm text-ink-soft">
          We read every message and aim to reply within a few business days.
        </p>
      </div>
    </div>
  );
}
