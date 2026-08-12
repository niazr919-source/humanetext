import type { Metadata } from "next";
import WaitlistForm from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Humanwords is free to use. See what's included and what's coming next.",
};

const FREE_FEATURES = [
  "3 text rewrites per day",
  "3 photo processes per day",
  "No signup required",
  "Higher daily limit with a free email signup",
];

const PRO_FEATURES = [
  "Unlimited text and photo processing",
  "Priority processing speed",
  "Batch photo uploads",
  "Early access to new tools",
];

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-display text-4xl font-semibold tracking-tight">Pricing</h1>
        <p className="mt-4 text-ink-soft">
          Humanwords is free to use today. A paid tier is on the way for people who
          need more volume — join the waitlist to be first in line.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-line p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">Free</p>
          <p className="font-display mt-2 text-4xl font-semibold">$0</p>
          <ul className="mt-6 space-y-3">
            {FREE_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 text-teal">✓</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-accent/50 bg-accent-soft/30 p-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-dark">
            Pro — Coming soon
          </p>
          <p className="font-display mt-2 text-4xl font-semibold">TBD</p>
          <ul className="mt-6 space-y-3">
            {PRO_FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm">
                <span className="mt-0.5 text-accent-dark">✓</span>
                {feature}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </div>
  );
}
