import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  MIN_WORDS_FOR_ADS,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/posts";
import { AUTHOR, SITE_NAME, SITE_URL } from "@/lib/site";
import AdSlot from "@/components/AdSlot";
import Byline from "@/components/Byline";
import RelatedPosts from "@/components/RelatedPosts";

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
    authors: [{ name: AUTHOR.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date || undefined,
      modifiedTime: post.updated || post.date || undefined,
      authors: [AUTHOR.name],
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

  const related = getRelatedPosts(slug);
  const showAds = post.wordCount >= MIN_WORDS_FOR_ADS;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date || undefined,
    dateModified: post.updated || post.date || undefined,
    url: `${SITE_URL}/blog/${slug}`,
    wordCount: post.wordCount,
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      description: AUTHOR.role,
      url: `${SITE_URL}/about/editorial`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
  };

  return (
    <article className="mx-auto w-full max-w-2xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
        <Link href="/blog" className="hover:text-ink">
          Blog
        </Link>
        <span aria-hidden="true"> / </span>
        <span>{post.title}</span>
      </nav>

      <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight">{post.title}</h1>
      <p className="mt-4 text-lg text-ink-soft">{post.description}</p>

      <div className="mt-6 border-y border-line py-4">
        <Byline
          category={post.category}
          date={post.date}
          updated={post.updated}
          readingMinutes={post.readingMinutes}
        />
      </div>

      <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-a:text-accent-dark">
        <MDXRemote source={post.content} />
      </div>

      <RelatedPosts posts={related} />

      {/* Ads only on substantial articles — see MIN_WORDS_FOR_ADS. */}
      {showAds && (
        <div className="mt-10">
          <AdSlot slot="1111111111" />
        </div>
      )}
    </article>
  );
}
