/**
 * Single source of truth for brand, contact, and authorship details.
 *
 * These values appear in page copy, metadata, JSON-LD, and the legal pages,
 * so changing a name or email here updates it everywhere it is shown.
 */

export const SITE_NAME = "Humanetext";
export const SITE_TAGLINE = "Make AI content sound and look natural";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://humanetext.com";

export const CONTACT_EMAIL = "hello@humanetext.com";
export const PRIVACY_EMAIL = "privacy@humanetext.com";

/**
 * Byline shown on every article, on the author page, and in BlogPosting
 * JSON-LD as the `author` entity.
 *
 * Search raters and ad reviewers weigh a named, accountable human far more
 * heavily than a faceless brand. To switch from the editorial byline to a
 * real person, replace `name`, `role`, and `bio` below — nothing else in the
 * codebase needs to change.
 */
export const AUTHOR = {
  name: "Humanetext Editorial",
  role: "Editorial team",
  /** Shown under the byline on the author page. Keep it factual. */
  bio:
    "Humanetext Editorial writes and maintains the guides on this site. We test every tool we mention with our own sample text and images, publish the prompts and settings we used, and revisit each article when the underlying tools change.",
  /** Optional public profile. Leave empty to hide the link. */
  url: "",
} as const;

/**
 * AdSense ad unit slot ID for the in-article placement.
 *
 * Create the unit in AdSense under Ads > By ad unit > Display ads, then paste
 * the `data-ad-slot` value from the snippet it gives you. Until a real ID is
 * set, no ad markup is rendered at all — an <ins> tag pointing at a
 * non-existent unit serves nothing and reports as not found.
 */
export const ADSENSE_ARTICLE_SLOT = "7117143463";

/**
 * Second ad network, loaded sitewide alongside AdSense.
 *
 * Set to "" to remove the network entirely — nothing else needs changing.
 * If you do remove it, also drop it from the Advertising and Third-party
 * services sections of the privacy policy, which names it.
 */
export const SECONDARY_AD_SCRIPT =
  "https://pl31100036.profitableratecpmnetwork.com/65/e1/d3/65e1d3cfb82fb4f9a1fda1622c2bd458.js";

/**
 * Date the legal pages were last substantively revised. Update whenever the
 * Privacy Policy or Terms are changed in a way that affects users.
 */
export const LEGAL_LAST_UPDATED = "August 30, 2026";
