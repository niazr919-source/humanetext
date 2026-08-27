import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORIES,
  formatDate,
  getPostsByCategory,
  isCategorySlug,
} from "@/lib/posts";

// The category list is a fixed constant; nothing needs rendering on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  if (!isCategorySlug(category)) return {};
  const meta = CATEGORIES[category];
  return {
    title: meta.label,
    description: meta.description,
    alternates: { canonical: `/blog/category/${category}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  if (!isCategorySlug(category)) notFound();

  const meta = CATEGORIES[category];
  const posts = getPostsByCategory(category);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
        <Link href="/blog" className="hover:text-ink">
          Blog
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{meta.label}</span>
      </nav>

      <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight">{meta.label}</h1>
      <p className="mt-3 text-ink-soft">{meta.description}</p>

      <div className="mt-10 divide-y divide-line">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block py-6">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
              {formatDate(post.date)} · {post.readingMinutes} min read
            </p>
            <h2 className="font-display mt-1 text-xl font-semibold group-hover:text-accent-dark">
              {post.title}
            </h2>
            <p className="mt-2 text-sm text-ink-soft">{post.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
