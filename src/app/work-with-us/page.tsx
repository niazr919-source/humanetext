import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Work With Us",
  description:
    "Humanetext takes on writing and editing work: explainers on AI and detection, writing-craft guides, and editing AI-assisted drafts into publishable prose.",
  alternates: { canonical: "/work-with-us" },
};

const SERVICES = [
  {
    name: "Explainers on AI, detection, and academic integrity",
    body: "Long-form pieces that explain a mechanism rather than summarising the discourse — how detectors estimate predictability, why they misfire on second-language writing, what a score does and does not mean. We read the underlying research rather than the press release.",
  },
  {
    name: "Writing-craft and style guides",
    body: "Practical guides on rhythm, structure, cutting, and voice, written to be applied to a draft rather than admired. Suited to publications and SaaS blogs serving writers, students, or marketing teams.",
  },
  {
    name: "Editing AI-assisted drafts",
    body: "Taking a generated or half-finished draft and making it publishable: verifying every claim, cutting what is padding, restoring rhythm, and adding the specifics that make writing worth reading. Documented in our own editing checklist.",
  },
  {
    name: "Photography and image-processing explainers",
    body: "Technical writing on sensor noise, film grain, banding, and why generated images read as synthetic — the kind of piece that needs the physics to be right, not just the vocabulary.",
  },
];

// Chosen to show range: the technical explainer, the practical guide, and the
// piece written for a completely different reader.
const SELECTED = [
  "why-ai-detectors-fail-non-native-speakers",
  "how-camera-sensor-noise-works",
  "sentence-patterns-that-sound-machine-made",
  "ai-accusation-appeal-letter-templates",
  "how-to-add-realistic-film-grain",
  "how-to-write-like-a-human",
];

export default function WorkWithUsPage() {
  const posts = getAllPosts();
  const selected = SELECTED.map((slug) => posts.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );
  const totalWords = posts.reduce((sum, post) => sum + post.wordCount, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    url: `${SITE_URL}/work-with-us`,
    email: CONTACT_EMAIL,
    description:
      "Writing and editing on AI, detection, writing craft, and image processing.",
    areaServed: "Worldwide",
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="font-display text-4xl font-semibold tracking-tight">Work with us</h1>
      <p className="mt-4 text-lg text-ink-soft">
        We take on writing and editing commissions. Everything on this site was
        produced in-house, so the clearest sense of what we do is to read some
        of it.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        <div className="rounded-xl border border-line p-4">
          <p className="font-display text-2xl font-semibold">{posts.length}</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft">Articles</p>
        </div>
        <div className="rounded-xl border border-line p-4">
          <p className="font-display text-2xl font-semibold">
            {Math.round(totalWords / 1000)}k
          </p>
          <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft">Words</p>
        </div>
        <div className="rounded-xl border border-line p-4">
          <p className="font-display text-2xl font-semibold">2</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft">Tools built</p>
        </div>
      </div>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          What we take on
        </h2>
        <div className="mt-6 space-y-6">
          {SERVICES.map((service) => (
            <div key={service.name} className="border-l-2 border-accent/40 pl-5">
              <h3 className="font-medium">{service.name}</h3>
              <p className="mt-1.5 text-sm text-ink-soft">{service.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          Selected work
        </h2>
        <p className="mt-2 text-ink-soft">
          Six pieces that show the range — a research explainer, a technical
          teardown, a craft guide, and one written for a reader in trouble.
        </p>
        <div className="mt-6 divide-y divide-line">
          {selected.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block py-5">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                {post.wordCount.toLocaleString()} words · {post.readingMinutes} min read
              </p>
              <h3 className="font-display mt-1 text-lg font-semibold group-hover:text-accent-dark">
                {post.title}
              </h3>
              <p className="mt-1.5 text-sm text-ink-soft">{post.description}</p>
            </Link>
          ))}
        </div>
        <Link
          href="/blog"
          className="mt-4 inline-block text-sm font-medium text-accent-dark hover:underline"
        >
          All {posts.length} articles →
        </Link>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          Why commission this rather than someone else
        </h2>
        <div className="prose prose-neutral mt-4 max-w-none prose-headings:font-display prose-a:text-accent-dark">
          <p>
            Most writing about AI detection is produced either by companies
            selling detectors or by writers summarising other people&apos;s
            summaries. We built the{" "}
            <Link href="/humanize-text">Text Humanizer</Link> and the{" "}
            <Link href="/humanize-photo">Photo Humanizer</Link>, which means the
            technical claims in our writing come from having implemented the
            thing rather than having read about it.
          </p>
          <p>
            That shows up in the detail. Our grain articles specify blend modes
            and explain why overlay weights the midtones. Our detection articles
            explain perplexity rather than asserting that detectors are
            unreliable. When our own tool is the wrong answer, we say so —
            there are several articles on this site that recommend doing the
            work by hand instead.
          </p>
          <p>
            How we research, correct, and disclose is written down on our{" "}
            <Link href="/about/editorial">editorial standards</Link> page,
            including our policy on AI assistance in our own drafting.
          </p>
        </div>
      </section>

      <section className="mt-14 rounded-2xl border border-line bg-paper-dim/40 p-8">
        <h2 className="font-display text-2xl font-semibold tracking-tight">Get in touch</h2>
        <p className="mt-3 text-ink-soft">
          Tell us what you need written or edited, roughly how long, and when
          you need it. We&apos;ll come back with a price and a timeline, or tell
          you honestly if it is not a good fit.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Writing enquiry")}`}
          className="mt-5 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          {CONTACT_EMAIL}
        </a>
        <p className="mt-4 text-sm text-ink-soft">
          Rates depend on length, research depth, and turnaround. Commissions
          are quoted per piece rather than per hour.
        </p>
      </section>
    </div>
  );
}
