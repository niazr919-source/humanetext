import type { Metadata } from "next";
import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Humanetext is free with a daily limit and no account. What the free tier includes, why the limit exists, and what a paid tier would add.",
  alternates: { canonical: "/pricing" },
};

const FREE_FEATURES = [
  "3 text rewrites per day, renewed daily",
  "3 photo processes per day, renewed daily",
  "No account, no password, no email required",
  "Identical output quality — there is no better version",
  "Submitted text and images are never stored",
  "A higher daily limit if you leave an email (optional)",
];

const PLANNED_FEATURES = [
  "Higher or unlimited daily volume",
  "Longer documents in a single pass",
  "Batch photo uploads",
  "Control over rewriting strength",
];

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight">Pricing</h1>
        <p className="mt-4 text-lg text-ink-soft">
          {SITE_NAME} is free. There is nothing to buy, no trial to expire, and
          no account to create. The catch is a daily limit, and this page
          explains exactly what it is and why.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-line p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
            Free — everything we currently offer
          </p>
          <p className="font-display mt-2 text-4xl font-semibold">$0</p>
          <ul className="mt-6 space-y-3">
            {FREE_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 text-teal" aria-hidden="true">
                  ✓
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <Link
            href="/humanize-text"
            className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Use it now
          </Link>
        </div>

        <div className="rounded-2xl border border-accent/50 bg-accent-soft/30 p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-dark">
            A paid tier, if enough people want one
          </p>
          <p className="font-display mt-2 text-4xl font-semibold">Not yet</p>
          <p className="mt-3 text-sm text-ink-soft">
            Nothing is built and no price is set. If we do build it, this is
            what it would be for:
          </p>
          <ul className="mt-4 space-y-3">
            {PLANNED_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 text-accent-dark" aria-hidden="true">
                  ·
                </span>
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <WaitlistForm />
          </div>
          <p className="mt-3 text-xs text-ink-soft">
            One email if it launches. Nothing else, ever.
          </p>
        </div>
      </div>

      <div className="prose prose-neutral mx-auto mt-16 max-w-2xl prose-headings:font-display prose-a:text-accent-dark">
        <h2>Why the limit is three</h2>
        <p>
          Every text rewrite calls a paid language model, and that call costs us
          real money whether or not you ever click an advert. The site is funded
          entirely by advertising, which does not stretch very far. Three a day
          is roughly where the arithmetic works.
        </p>
        <p>
          The <Link href="/humanize-photo">Photo Humanizer</Link> is cheaper to
          run — grain and texture processing happens on our own server using
          open-source image libraries rather than a paid image API — so its
          limit is about protecting the server rather than a bill.
        </p>
        <p>
          Three a day is genuinely restrictive, and we would rather say that
          plainly than dress it up. It is enough to rework a few paragraphs or
          to find out whether the tool does what you need. It is not enough to
          process a long document in one sitting, and if that is your situation
          we would point you at a paid tool built for volume — our{" "}
          <Link href="/blog/best-ai-humanizer-tools-2026">
            guide to choosing one
          </Link>{" "}
          covers what to look for.
        </p>

        <h2>What the limit is not</h2>
        <p>
          There is no reduced free version of the rewrite. Free output is the
          same processing you would get on any tier, because there is no other
          tier. Some tools in this category degrade free-tier quality
          deliberately, which makes it impossible to judge whether paying is
          worth it — we go into that and the other ways free tiers hide their
          limits in{" "}
          <Link href="/blog/free-ai-humanizer-no-signup">
            what &quot;free&quot; actually means
          </Link>
          .
        </p>

        <h2>How the limit is counted</h2>
        <p>
          A random identifier stored in your browser, plus your IP address. No
          account, no cookie for tracking, nothing tied to your identity.
          Clearing your browser storage resets it, which we are aware of and
          have not tried hard to prevent — the limit is there to keep costs
          survivable, not to police anyone. Details are in the{" "}
          <Link href="/privacy">privacy policy</Link>.
        </p>

        <h2>Advertising</h2>
        <p>
          Ads are what pay for this. They are served by Google AdSense, they
          never receive the text or images you submit, and advertisers have no
          input into what we publish — no sponsored posts, no paid links, no
          advance sight of articles. That commitment is written down on our{" "}
          <Link href="/about/editorial">editorial standards</Link> page.
        </p>
      </div>
    </div>
  );
}
