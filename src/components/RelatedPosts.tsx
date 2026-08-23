import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

export default function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-14 border-t border-line pt-8">
      <h2 className="font-display text-xl font-semibold tracking-tight">Keep reading</h2>
      <ul className="mt-4 space-y-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <p className="font-medium group-hover:text-accent-dark">{post.title}</p>
              <p className="mt-1 text-sm text-ink-soft">{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
