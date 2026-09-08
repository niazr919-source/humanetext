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

/** Newest article, shown full-width at the top. */
const LEAD_COUNT = 1;
/** Cards shown under the lead before the full topic index. */
const RECENT_COUNT = 6;

function ArticleCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl border border-line p-6 transition-colors hover:border-accent/60 hover:bg-paper-dim/30"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-accent-dark">
        {CATEGORIES[post.category].label}
      </p>
      <h3 className="font-display mt-2 text-lg font-semibold leading-snug group-hover:text-accent-dark">
        {post.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
        {post.description}
      </p>
      <p className="mt-4 text-xs uppercase tracking-wide text-ink-soft">
        {formatDate(post.date)} · {post.readingMinutes} min read
      </p>
    </Link>
  );
}

export default function Home() {
  const posts = getAllPosts();
  const lead = posts.slice(0, LEAD_COUNT);
  const recent = posts.slice(LEAD_COUNT, LEAD_COUNT + RECENT_COUNT);

  const categorySlugs = Object.keys(CATEGORIES) as CategorySlug[];
  const byCategory = categorySlugs
    .map((slug) => ({
      slug,
      ...CATEGORIES[slug],
      posts: posts.filter((post) => post.category === slug),
    }))
    .filter((group) => group.posts.length > 0);

  // Describes the homepage as what it now is — an index of the whole archive.
  // Every published article is linked below, so the list is complete rather
  // than a sample, which is what ItemList is meant to represent.
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

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <h1 className="font-display max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Writing that sounds like a person wrote it
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            {posts.length} researched guides on what makes prose read as human,
            how AI detectors actually work and where they fail, and why
            generated images still look off. Written and maintained in-house —
            see our{" "}
            <Link
              href="/about/editorial"
              className="text-accent-dark underline-offset-4 hover:underline"
            >
              editorial standards
            </Link>
            .
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {byCategory.map((group) => (
              <Link
                key={group.slug}
                href={`/blog/category/${group.slug}`}
                className="rounded-full border border-line px-4 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:border-accent hover:text-accent-dark"
              >
                {group.label}
                <span className="ml-1.5 text-xs text-ink-soft">
                  {group.posts.length}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {lead.map((post) => (
        <section key={post.slug} className="border-b border-line">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-2xl border border-line bg-paper-dim/30 p-8 transition-colors hover:border-accent/60 sm:p-10"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-dark">
                Latest · {CATEGORIES[post.category].label}
              </p>
              <h2 className="font-display mt-3 max-w-3xl text-2xl font-semibold leading-tight group-hover:text-accent-dark sm:text-3xl">
                {post.title}
              </h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                {post.answer || post.description}
              </p>
              <p className="mt-5 text-xs uppercase tracking-wide text-ink-soft">
                {formatDate(post.date)} · {post.readingMinutes} min read
              </p>
            </Link>
          </div>
        </section>
      ))}

      {recent.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Recent articles
            </h2>
            <Link
              href="/blog"
              className="text-sm font-semibold text-accent-dark hover:underline"
            >
              All {posts.length} →
            </Link>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-line bg-paper-dim/20">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Everything we&rsquo;ve published
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-soft">
            The full archive, grouped by subject.
          </p>

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            {byCategory.map((group) => (
              <div key={group.slug}>
                <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
                  <h3 className="font-display text-lg font-semibold">
                    <Link
                      href={`/blog/category/${group.slug}`}
                      className="hover:text-accent-dark"
                    >
                      {group.label}
                    </Link>
                  </h3>
                  <span className="shrink-0 text-xs uppercase tracking-wide text-ink-soft">
                    {group.posts.length} articles
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {group.description}
                </p>
                <ul className="mt-4 divide-y divide-line/70">
                  {group.posts.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group flex items-baseline justify-between gap-4 py-2.5"
                      >
                        <span className="text-[15px] leading-snug group-hover:text-accent-dark">
                          {post.title}
                        </span>
                        <span className="shrink-0 text-xs text-ink-soft">
                          {post.readingMinutes} min
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            Two free tools
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-soft">
            Both run in the browser, need no signup, and are available from the
            menu on every page.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Link
              href="/humanize-text"
              className="group rounded-2xl border border-line p-6 transition-colors hover:border-accent/60 hover:bg-paper-dim/30"
            >
              <h3 className="font-display text-lg font-semibold group-hover:text-accent-dark">
                Text Humanizer
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Rewrites stiff, repetitive prose with varied sentence rhythm
                while keeping every fact and idea intact.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent-dark">
                Open the tool →
              </span>
            </Link>
            <Link
              href="/humanize-photo"
              className="group rounded-2xl border border-line p-6 transition-colors hover:border-accent/60 hover:bg-paper-dim/30"
            >
              <h3 className="font-display text-lg font-semibold group-hover:text-accent-dark">
                Photo Humanizer
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Adds luminance-aware grain and micro-detail so generated or
                over-smoothed images read as real photography.
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-accent-dark">
                Open the tool →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
