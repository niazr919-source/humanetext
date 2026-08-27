import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import {
  CATEGORIES,
  MIN_WORDS_FOR_ADS,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/posts";
import { AUTHOR, SITE_NAME, SITE_URL } from "@/lib/site";
import AdSlot from "@/components/AdSlot";
import Byline from "@/components/Byline";
import RelatedPosts from "@/components/RelatedPosts";

// Every post is known at build time, so there is nothing to render on demand.
// `dynamicParams = false` makes an unknown slug return the prerendered 404
// instead of invoking the dynamic renderer — which is returning a 500 rather
// than a 404 on the production host, and could not be reproduced locally.
export const dynamicParams = false;

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
    // `absolute` drops the " | Humanetext" suffix. Google truncates titles
    // near 60 characters and the brand was pushing every headline over.
    title: { absolute: post.title },
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
      images: [
        { url: `/og/${slug}.png`, width: 1200, height: 630, alt: post.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/og/${slug}.png`],
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
    image: `${SITE_URL}/og/${slug}.png`,
    articleSection: CATEGORIES[post.category].label,
    keywords: post.keywords.length ? post.keywords.join(", ") : undefined,
    isAccessibleForFree: true,
  };

  // Lets Google render the Blog › Category › Article trail in search results
  // instead of a bare URL.
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
      {
        "@type": "ListItem",
        position: 2,
        name: CATEGORIES[post.category].label,
        item: `${SITE_URL}/blog/category/${post.category}`,
      },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  // Only emitted when the questions are visibly on the page — schema that does
  // not match rendered content is a structured-data violation.
  const faqJsonLd = post.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      }
    : null;

  return (
    <article className="mx-auto w-full max-w-2xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <nav aria-label="Breadcrumb" className="text-sm text-ink-soft">
        <Link href="/blog" className="hover:text-ink">
          Blog
        </Link>
        <span aria-hidden="true"> / </span>
        <Link href={`/blog/category/${post.category}`} className="hover:text-ink">
          {CATEGORIES[post.category].label}
        </Link>
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

      {post.answer && (
        <div className="mt-8 rounded-2xl border border-line bg-paper-dim/50 p-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-accent-dark">
            The short answer
          </p>
          <p className="mt-2">{post.answer}</p>
        </div>
      )}

      <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-a:text-accent-dark">
        <MDXRemote source={post.content} />
      </div>

      {post.faqs.length > 0 && (
        <section className="mt-14 border-t border-line pt-8">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Common questions
          </h2>
          <dl className="mt-4 divide-y divide-line">
            {post.faqs.map((faq) => (
              <div key={faq.q} className="py-4">
                <dt className="font-medium">{faq.q}</dt>
                <dd className="mt-1.5 text-ink-soft">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

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
