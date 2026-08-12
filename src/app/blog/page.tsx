import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides and notes on natural writing and authentic-looking photography.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Blog</h1>
      <p className="mt-3 text-ink-soft">
        Notes on natural writing and authentic-looking photography.
      </p>

      <div className="mt-10 divide-y divide-line">
        {posts.length === 0 && (
          <p className="py-8 text-ink-soft">No posts yet — check back soon.</p>
        )}
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block py-6 group">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
              {post.date}
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
