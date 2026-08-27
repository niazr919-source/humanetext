import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

/** Average adult reading speed, used for the "N min read" label. */
const WORDS_PER_MINUTE = 220;

/**
 * Ads are only rendered on articles long enough to carry them. Placing ads
 * beside a few hundred words of text is what Google's policies describe as
 * advertising on thin content, so short posts render no ad slot at all.
 */
export const MIN_WORDS_FOR_ADS = 900;

export const CATEGORIES = {
  writing: {
    label: "Writing craft",
    description:
      "How natural prose actually works — rhythm, word choice, structure, and the habits that make writing sound like a person.",
  },
  detection: {
    label: "AI detection",
    description:
      "What detectors measure, where they fail, and how to think clearly about false positives and accusations.",
  },
  photography: {
    label: "Photography",
    description:
      "Grain, sensor noise, and the visual details that separate a real photograph from a generated image.",
  },
  guides: {
    label: "Practical guides",
    description:
      "Step-by-step workflows, checklists, and tool comparisons you can apply to your own drafts.",
  },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;

export function isCategorySlug(value: string): value is CategorySlug {
  return Object.prototype.hasOwnProperty.call(CATEGORIES, value);
}

/** A question and its answer, rendered on the page and emitted as FAQPage. */
export interface Faq {
  q: string;
  a: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  /** Set when an article has been revised since publication. */
  updated: string;
  keywords: string[];
  category: CategorySlug;
  readingMinutes: number;
  wordCount: number;
  /**
   * A direct, self-contained answer to the question the article title asks.
   * Articles open with a narrative hook, which reads well but gives answer
   * engines nothing liftable; this gives them a quotable paragraph that still
   * makes sense with no surrounding context.
   */
  answer: string;
  /** Extractable Q&A pairs, also emitted as FAQPage structured data. */
  faqs: Faq[];
}

export interface Post extends PostMeta {
  content: string;
}

function parseKeywords(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === "string") return raw.split(",").map((k) => k.trim()).filter(Boolean);
  return [];
}

function parseFaqs(raw: unknown): Faq[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
    .map((item) => ({ q: String(item.q ?? ""), a: String(item.a ?? "") }))
    .filter((faq) => faq.q && faq.a);
}

function parseCategory(raw: unknown): CategorySlug {
  return typeof raw === "string" && isCategorySlug(raw) ? raw : "guides";
}

function countWords(markdown: string): number {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`|-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function toMeta(file: string, raw: string): PostMeta {
  const { data, content } = matter(raw);
  const wordCount = countWords(content);

  return {
    slug: file.replace(/\.mdx$/, ""),
    title: data.title ?? file,
    description: data.description ?? "",
    date: data.date ?? "",
    updated: data.updated ?? "",
    keywords: parseKeywords(data.keywords),
    category: parseCategory(data.category),
    readingMinutes: Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE)),
    wordCount,
    answer: data.answer ?? "",
    faqs: parseFaqs(data.faqs),
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => toMeta(file, fs.readFileSync(path.join(POSTS_DIR, file), "utf8")))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { content } = matter(raw);

  return { ...toMeta(`${slug}.mdx`, raw), content };
}

export function getPostsByCategory(category: CategorySlug): PostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}

/**
 * Picks articles to surface at the foot of a post. Same-category articles come
 * first, then anything sharing a keyword, so every page has a genuine onward
 * path rather than a random list.
 */
export function getRelatedPosts(slug: string, limit = 3): PostMeta[] {
  const all = getAllPosts();
  const current = all.find((post) => post.slug === slug);
  if (!current) return [];

  const others = all.filter((post) => post.slug !== slug);
  const keywords = new Set(current.keywords.map((k) => k.toLowerCase()));

  const scored = others.map((post) => {
    const sharedKeywords = post.keywords.filter((k) => keywords.has(k.toLowerCase())).length;
    const sameCategory = post.category === current.category ? 1 : 0;
    return { post, score: sameCategory * 10 + sharedKeywords };
  });

  return scored
    .sort((a, b) => b.score - a.score || (a.post.date < b.post.date ? 1 : -1))
    .slice(0, limit)
    .map((entry) => entry.post);
}

/** Human-readable date for display, e.g. "23 August 2026". */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return iso;
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
