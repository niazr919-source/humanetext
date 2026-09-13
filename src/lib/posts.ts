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
    intro: [
      "Writing that sounds human is not a style you put on. It is a set of specific, describable habits: varying how long your sentences run, committing to a claim instead of hedging it, reaching for the concrete noun rather than the abstract one, and cutting the material that delays your point without adding to it.",
      "Those habits are learnable, and they are the same ones that make any prose better. They happen to be the habits language models suppress, because a system trained to produce inoffensive, evenly weighted text converges on the statistical middle of everything it read. That is why generated prose feels flat even when every sentence is correct.",
      "These articles cover each habit on its own terms — what it is, why it matters, and how to practise it — with before-and-after examples throughout.",
    ],
  },
  detection: {
    label: "AI detection",
    description:
      "What detectors measure, where they fail, and how to think clearly about false positives and accusations.",
    intro: [
      "AI detectors do not detect AI. They estimate how statistically predictable a passage is, and report that estimate as a percentage that looks far more authoritative than it is. There is no source document behind the number, nothing to inspect, and no way to audit how it was reached.",
      "That distinction matters enormously if you are on the receiving end of one. Clear, conventional, carefully edited writing sits close to the statistical centre and scores high for that reason, which is why competent writers, second-language speakers and anyone using a grammar tool get flagged more often than careless ones.",
      "These articles explain the mechanism honestly, set out what the research actually found, and give practical steps for anyone facing an accusation — including what to say, what evidence to keep, and what not to do.",
    ],
  },
  photography: {
    label: "Photography",
    description:
      "Grain, sensor noise, and the visual details that separate a real photograph from a generated image.",
    intro: [
      "A photograph carries evidence that light was actually counted. Film grain is the visible structure of silver halide crystals; sensor noise is the statistical spread in photon arrival. Both are technically imperfections, and both are part of why a real image reads as real.",
      "Generated pictures and heavily processed photographs lack that evidence. They arrive unnaturally smooth, evenly lit, and free of the artefacts any capture pipeline introduces — which is why they can look subtly wrong even when every individual detail is rendered correctly. The eye registers the absence of an expected imperfection.",
      "These articles cover where that texture comes from, how film grain and digital noise actually differ, and which visual tells give a generated image away — in the order your eye checks them.",
    ],
  },
  guides: {
    label: "Practical guides",
    description:
      "Step-by-step workflows, checklists, and tool comparisons you can apply to your own drafts.",
    intro: [
      "Knowing why prose sounds machine-made is one thing. Having a process you can run on a Tuesday afternoon is another, and this is where the procedures live.",
      "Some are workflows: the order to edit a draft in, how to brief a model so the first draft is worth keeping, how to keep a record of your own writing before anyone asks for one. Some are decisions: whether a given use needs disclosing, which tool fits which problem, what a free tier is actually giving you.",
      "All of them are written to be acted on rather than admired, and they say plainly where the limits are — including the limits of our own tools.",
    ],
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
