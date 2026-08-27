import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, type CategorySlug } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Page not found",
  description: "That page doesn't exist. Here's where to find what you were looking for.",
  // A 404 should never be indexed, and without this Next leaves it open to
  // crawling like any other route.
  robots: { index: false, follow: true },
};

// Deliberately reads nothing from disk: this page renders at request time for
// unknown /blog/<slug> URLs, where the MDX source is not on the filesystem.
export default function NotFound() {
  const categories = Object.keys(CATEGORIES) as CategorySlug[];

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-20">
      <p className="text-sm font-medium uppercase tracking-wide text-accent-dark">
        404
      </p>
      <h1 className="font-display mt-2 text-4xl font-semibold tracking-tight">
        That page doesn&apos;t exist
      </h1>
      <p className="mt-4 text-lg text-ink-soft">
        The link may be out of date, or the address may have a typo in it.
        Everything below still works.
      </p>

      <div className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
          The tools
        </h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link
            href="/humanize-text"
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Text Humanizer
          </Link>
          <Link
            href="/humanize-photo"
            className="rounded-full border border-line px-5 py-2 text-sm font-semibold transition-colors hover:border-accent hover:text-accent-dark"
          >
            Photo Humanizer
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
          Browse by topic
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((slug) => (
            <Link
              key={slug}
              href={`/blog/category/${slug}`}
              className="rounded-full border border-line px-4 py-1.5 text-sm text-ink-soft transition-colors hover:border-accent hover:text-accent-dark"
            >
              {CATEGORIES[slug].label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
          Everything else
        </h2>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
          <Link href="/blog" className="hover:text-ink">All articles</Link>
          <Link href="/about" className="hover:text-ink">About</Link>
          <Link href="/about/editorial" className="hover:text-ink">Editorial standards</Link>
          <Link href="/pricing" className="hover:text-ink">Pricing</Link>
          <Link href="/contact" className="hover:text-ink">Contact</Link>
        </div>
      </div>

      <p className="mt-10 text-sm text-ink-soft">
        Still stuck? <Link href="/contact" className="text-accent-dark hover:underline">Tell us</Link>{" "}
        which link sent you here and we&apos;ll fix it.
      </p>
    </div>
  );
}
