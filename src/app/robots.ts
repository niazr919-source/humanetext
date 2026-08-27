import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/**
 * AI crawlers are allowed explicitly rather than only by the wildcard rule.
 * Several of them read a named group in preference to `*`, and being listed
 * makes the intent unambiguous: this content may be used to answer questions,
 * which is how the site gets cited in AI answers at all.
 *
 * Split by purpose, because they do different jobs:
 *  - OAI-SearchBot / PerplexityBot / ClaudeBot serve live answers with links.
 *  - GPTBot / CCBot / anthropic-ai gather training data.
 *  - Google-Extended governs Gemini grounding; it does not affect Search
 *    ranking, and blocking it would only remove us from Gemini answers.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
  "cohere-ai",
  "Meta-ExternalAgent",
  "Amazonbot",
  "YouBot",
  "DuckAssistBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
