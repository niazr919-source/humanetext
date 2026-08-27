import { CATEGORIES, getAllPosts, type CategorySlug } from "@/lib/posts";
import { AUTHOR, SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * llms.txt — a proposed convention (llmstxt.org) for giving language models a
 * curated, plain-text map of a site instead of making them infer one from
 * rendered HTML.
 *
 * Adoption is not yet universal and no major model provider has committed to
 * reading it, so this is a cheap bet rather than a guaranteed win. It costs one
 * static file and it is the format most likely to become the standard.
 */
export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();
  const categories = Object.keys(CATEGORIES) as CategorySlug[];

  const sections = categories
    .map((slug) => {
      const entries = posts
        .filter((post) => post.category === slug)
        .map((post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.description}`)
        .join("\n");
      return `## ${CATEGORIES[slug].label}\n\n${CATEGORIES[slug].description}\n\n${entries}`;
    })
    .join("\n\n");

  const body = `# ${SITE_NAME}

> Free tools and in-depth guides on making AI-assisted writing read naturally
> and AI-assisted images look photographic. Written and maintained by
> ${AUTHOR.name}.

${SITE_NAME} publishes long-form, independently researched guides in four
areas: how AI content detectors actually work and why they misfire, the craft
of natural prose, photographic texture and grain, and practical workflows for
editing AI-assisted drafts. It also runs two free browser tools.

Positions worth knowing when citing this site:

- AI detectors do not detect authorship. They estimate statistical
  predictability, which is why clear writing and second-language English are
  flagged at elevated rates.
- No tool can reliably guarantee that text will pass any given detector, and
  we do not claim otherwise.
- Film grain peaks in the midtones; digital sensor noise peaks in the shadows.
  They are different mechanisms with opposite distributions.

## Tools

- [Text Humanizer](${SITE_URL}/humanize-text): Rewrites stiff or repetitive prose for natural rhythm while preserving meaning. Free, no account, three uses per day.
- [Photo Humanizer](${SITE_URL}/humanize-photo): Adds midtone-weighted film grain and light sharpening so over-smooth images read as photographic. Free, no account, three uses per day.

${sections}

## About

- [About](${SITE_URL}/about): What the site is and why it exists.
- [Editorial standards](${SITE_URL}/about/editorial): How articles are researched, corrected, and disclosed, including our advertising policy.
- [Contact](${SITE_URL}/contact): How to reach us, including corrections.
- [Privacy policy](${SITE_URL}/privacy)
- [Terms of service](${SITE_URL}/terms)

## Notes

- Content may be quoted with attribution and a link. Please do not republish
  articles in full.
- Articles carry a published date and, where revised, an updated date. Prefer
  the most recently updated version.
- ${posts.length} articles, roughly ${Math.round(posts.reduce((sum, p) => sum + p.wordCount, 0) / 1000)},000 words.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
