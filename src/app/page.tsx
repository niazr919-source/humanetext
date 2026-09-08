import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import {
  CATEGORIES,
  formatDate,
  getAllPosts,
  type CategorySlug,
  type PostMeta,
} from "@/lib/posts";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/** Front page: one lead plus three stacked secondaries beside it. */
const LEAD_COUNT = 1;
const SECONDARY_COUNT = 3;
/** Cards below the fold, before the full archive list. */
const RECENT_COUNT = 6;

function ArticleCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col border-t-2 border-ink/80 pt-4 transition-colors hover:border-accent"
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-dark">
        {CATEGORIES[post.category].label}
      </p>
      <h3 className="font-display mt-2 text-[19px] font-semibold leading-snug group-hover:text-accent-dark">
        {post.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
        {post.description}
      </p>
      <p className="mt-3 text-[11px] uppercase tracking-[0.08em] text-ink-soft">
        {formatDate(post.date)} · {post.readingMinutes} min
      </p>
    </Link>
  );
}

export default function Home() {
  const posts = getAllPosts();
  const lead = posts[0];
  const secondary = posts.slice(LEAD_COUNT, LEAD_COUNT + SECONDARY_COUNT);
  const recent = posts.slice(
    LEAD_COUNT + SECONDARY_COUNT,
    LEAD_COUNT + SECONDARY_COUNT + RECENT_COUNT,
  );

  const categorySlugs = Object.keys(CATEGORIES) as CategorySlug[];
  const chips = categorySlugs
    .map((slug) => ({
      slug,
      ...CATEGORIES[slug],
      count: posts.filter((post) => post.category === slug).length,
    }))
    .filter((chip) => chip.count > 0);

  // Every published article is linked below, so the list is the complete
  // archive rather than a sample — which is what ItemList should represent.
  const ITEM_LIST_JSON_LD = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Humanetext",
    url: SITE_URL,
    description:
      "Guides on writing that sounds human, how AI detection works, and what makes a photograph read as real.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ITEM_LIST_JSON_LD) }}
      />

      {/* Masthead */}
      <section className="border-b border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 lg:flex-row lg:items-end lg:justify-between lg:py-10">
          <div className="max-w-2xl">
            <h1 className="font-display text-[28px] font-semibold leading-[1.15] tracking-tight sm:text-4xl">
              Writing that sounds like a person wrote it
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
              {posts.length} researched guides on what makes prose read as
              human, how AI detectors work and where they fail, and why
              generated images still look off.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {chips.map((chip) => (
              <Link
                key={chip.slug}
                href={`/blog/category/${chip.slug}`}
                className="rounded-full border border-line px-3.5 py-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:border-accent hover:text-accent-dark"
              >
                {chip.label}
                <span className="ml-1.5 text-[11px] tabular-nums text-ink-soft">
                  {chip.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Front page: lead beside three stacked secondaries */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-x-10 gap-y-8 lg:grid-cols-3">
          {lead && (
            <Link
              href={`/blog/${lead.slug}`}
              className="group flex flex-col border-t-2 border-ink pt-5 lg:col-span-2"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-dark">
                Latest · {CATEGORIES[lead.category].label}
              </p>
              <h2 className="font-display mt-2 text-3xl font-semibold leading-[1.15] group-hover:text-accent-dark sm:text-[40px]">
                {lead.title}
              </h2>
              {/* The answer paragraph is written for the article page, so it
                  runs long on a phone — clamp it to a teaser there. */}
              <p className="mt-4 line-clamp-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:line-clamp-none">
                {lead.answer || lead.description}
              </p>
              <p className="mt-4 text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                {formatDate(lead.date)} · {lead.readingMinutes} min read
              </p>
            </Link>
          )}

          <div className="flex flex-col divide-y divide-line border-t-2 border-ink/80 lg:border-t-2">
            {secondary.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex-1 py-4 first:pt-5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent-dark">
                  {CATEGORIES[post.category].label}
                </p>
                <h3 className="font-display mt-1.5 text-[17px] font-semibold leading-snug group-hover:text-accent-dark">
                  {post.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-soft">
                  {post.description}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.08em] text-ink-soft">
                  {post.readingMinutes} min
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* More recent */}
      {recent.length > 0 && (
        <section className="border-t border-line bg-paper-dim/25">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <h2 className="font-display text-xl font-semibold tracking-tight">
              More recent
            </h2>
            <div className="mt-6 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {recent.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Full archive — one flat list so the columns stay even */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-3">
            <h2 className="font-display text-xl font-semibold tracking-tight">
              The full archive
            </h2>
            <span className="shrink-0 text-[11px] uppercase tracking-[0.08em] text-ink-soft">
              {posts.length} articles
            </span>
          </div>

          <ul className="mt-2 gap-x-12 lg:columns-2">
            {posts.map((post) => (
              <li key={post.slug} className="break-inside-avoid">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-baseline gap-4 border-b border-line/70 py-2.5"
                >
                  <span className="hidden w-[86px] shrink-0 text-[10px] uppercase tracking-[0.06em] text-ink-soft sm:block">
                    {CATEGORIES[post.category].label}
                  </span>
                  <span className="flex-1 text-[15px] leading-snug group-hover:text-accent-dark">
                    {post.title}
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-ink-soft">
                    {post.readingMinutes} min
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tools */}
      <section className="border-t border-line bg-paper-dim/25">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_2fr] lg:items-center">
            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Two free tools
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Both run in the browser, need no signup, and are in the menu on
                every page.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Link
                href="/humanize-text"
                className="group rounded-xl border border-line bg-paper p-5 transition-colors hover:border-accent/60"
              >
                <h3 className="font-display text-base font-semibold group-hover:text-accent-dark">
                  Text Humanizer
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  Rewrites stiff prose with varied rhythm, keeping every fact
                  intact.
                </p>
                <span className="mt-3 inline-block text-[13px] font-semibold text-accent-dark">
                  Open the tool →
                </span>
              </Link>
              <Link
                href="/humanize-photo"
                className="group rounded-xl border border-line bg-paper p-5 transition-colors hover:border-accent/60"
              >
                <h3 className="font-display text-base font-semibold group-hover:text-accent-dark">
                  Photo Humanizer
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  Adds luminance-aware grain so generated images read as real
                  photography.
                </p>
                <span className="mt-3 inline-block text-[13px] font-semibold text-accent-dark">
                  Open the tool →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
