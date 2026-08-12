import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import AdSlot from "@/components/AdSlot";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://humanetext.com";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords.length ? post.keywords : undefined,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date || undefined,
    },
    alternates: { canonical: `/blog/${slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
    url: `${SITE_URL}/blog/${slug}`,
    author: { "@type": "Organization", name: "Humanwords" },
    publisher: { "@type": "Organization", name: "Humanwords" },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  };

  return (
    <article className="mx-auto w-full max-w-2xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">{post.date}</p>
      <h1 className="font-display mt-1 text-4xl font-semibold tracking-tight">{post.title}</h1>
      <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-a:text-accent-dark">
        <MDXRemote source={post.content} />
      </div>
      <div className="mt-10">
        <AdSlot slot="1111111111" />
      </div>
    </article>
  );
}
