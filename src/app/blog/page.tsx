import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES, formatDate, getAllPosts, type CategorySlug } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "In-depth guides on natural writing, AI content detection, and authentic-looking photography — researched and updated by the Humanetext editorial team.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  const byCategory = (Object.keys(CATEGORIES) as CategorySlug[]).map((slug) => ({
    slug,
    ...CATEGORIES[slug],
    count: posts.filter((post) => post.category === slug).length,
  }));

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-3 max-w-2xl text-ink-soft">
        Long-form guides on what makes writing sound human, how AI detectors
        really work, and why generated images look off. Every article is written
        and maintained in-house — see our{" "}
        <Link href="/about/editorial" className="text-accent-dark hover:underline">
          editorial standards
        </Link>
        .
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {byCategory.map((category) => (
          <Link
            key={category.slug}
            href={`/blog/category/${category.slug}`}
            className="rounded-full border border-line px-4 py-1.5 text-sm font-medium text-ink-soft transition-colors hover:border-accent hover:text-accent-dark"
          >
            {category.label}
            <span className="ml-1.5 text-xs text-ink-soft">{category.count}</span>
          </Link>
        ))}
      </div>

      {featured && (
        <Link
          href={`/blog/${featured.slug}`}
          className="group mt-12 block rounded-2xl border border-line p-8 transition-colors hover:border-accent/60"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-dark">
            Latest · {CATEGORIES[featured.category].label}
          </p>
          <h2 className="font-display mt-2 text-2xl font-semibold group-hover:text-accent-dark">
            {featured.title}
          </h2>
          <p className="mt-3 text-ink-soft">{featured.description}</p>
          <p className="mt-4 text-xs uppercase tracking-wide text-ink-soft">
            {formatDate(featured.date)} · {featured.readingMinutes} min read
          </p>
        </Link>
      )}

      <div className="mt-4 divide-y divide-line">
        {rest.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block py-6">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
              {CATEGORIES[post.category].label} · {formatDate(post.date)} ·{" "}
              {post.readingMinutes} min read
            </p>
            <h2 className="font-display mt-1 text-xl font-semibold group-hover:text-accent-dark">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-ink-soft">{post.description}</p>
          </Link>
        ))}
      </div>

      {posts.length === 0 && <p className="py-8 text-ink-soft">No posts yet — check back soon.</p>}
    </div>
  );
}
