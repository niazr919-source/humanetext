import type { Metadata } from "next";
import Link from "next/link";
import { AUTHOR, CONTACT_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Editorial Standards",
  description:
    "Who writes Humanetext, how articles are researched and tested, how we handle corrections, and our disclosure policy on advertising and our own tools.",
  alternates: { canonical: "/about/editorial" },
};

export default function EditorialPage() {
  const posts = getAllPosts();
  const totalWords = posts.reduce((sum, post) => sum + post.wordCount, 0);

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR.name,
    description: AUTHOR.bio,
    jobTitle: AUTHOR.role,
    url: `${SITE_URL}/about/editorial`,
    worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <h1 className="font-display text-4xl font-semibold tracking-tight">
        Editorial standards
      </h1>
      <p className="mt-4 text-lg text-ink-soft">
        How the writing on this site gets made, who is accountable for it, and
        what we do when we get something wrong.
      </p>

      <div className="mt-10 rounded-2xl border border-line bg-paper-dim/40 p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
          Written and maintained by
        </p>
        <p className="font-display mt-1 text-xl font-semibold">{AUTHOR.name}</p>
        <p className="text-sm text-ink-soft">{AUTHOR.role}</p>
        <p className="mt-3 text-sm">{AUTHOR.bio}</p>
        <p className="mt-4 text-sm text-ink-soft">
          Reach the desk at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent-dark hover:underline">
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="rounded-xl border border-line p-4">
          <p className="font-display text-2xl font-semibold">{posts.length}</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft">Articles</p>
        </div>
        <div className="rounded-xl border border-line p-4">
          <p className="font-display text-2xl font-semibold">
            {(totalWords / 1000).toFixed(0)}k
          </p>
          <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft">Words</p>
        </div>
        <div className="rounded-xl border border-line p-4">
          <p className="font-display text-2xl font-semibold">4</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft">Topics</p>
        </div>
      </div>

      <div className="prose prose-neutral mt-10 max-w-none prose-headings:font-display prose-a:text-accent-dark">
        <h2>How we choose what to write about</h2>
        <p>
          Every article starts from a question we have actually been asked, or
          one we had to answer for ourselves while building the tools on this
          site. That means a lot of our writing covers narrow, practical ground —
          why a particular phrase reads as machine-written, what a detector
          score actually measures, why grain has to follow luminance to look
          real. We would rather publish one article that answers a question
          completely than five that circle it.
        </p>
        <p>
          We do not publish articles because a keyword looked promising. If we
          can&apos;t say something specific and useful about a topic, we skip it.
        </p>

        <h2>How articles are researched</h2>
        <p>
          Claims about how a tool behaves come from using the tool. When we
          describe what a detector does with a given passage, or how an image
          changes after processing, we ran that passage or that image ourselves.
          Where an article describes a technical mechanism — perplexity,
          burstiness, sensor noise, demosaicing — we describe the mechanism
          plainly and note where the explanation is simplified.
        </p>
        <p>
          We try to be explicit about uncertainty. Detector accuracy in
          particular is frequently overstated by the companies selling
          detectors, and we say so rather than repeating vendor numbers as fact.
        </p>

        <h2>Our use of AI in our own writing</h2>
        <p>
          It would be strange for a site about AI-assisted content to be cagey
          about this. We use AI tools the way we suggest readers use them: for
          drafting scaffolding, for rephrasing a paragraph that isn&apos;t
          landing, and for catching repetition. Every published article is then
          read, restructured, fact-checked, and edited by a person, who is
          responsible for what it says. We do not publish unedited generated
          text, and we do not publish articles nobody has read end to end.
        </p>

        <h2>Corrections</h2>
        <p>
          If we get something wrong, we fix the article and note the change. For
          substantive corrections — a claim that was wrong, not a typo — we add
          a dated note at the foot of the article rather than quietly editing
          it. Articles revised after publication carry an
          &quot;Updated&quot; date in the byline.
        </p>
        <p>
          Spotted an error? Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> and we will
          look at it.
        </p>

        <h2>Updates and review</h2>
        <p>
          Anything we write about detection tools or model behaviour has a short
          shelf life. We revisit articles in those categories when the
          underlying tools change materially, and we date every revision. An
          article with no update date has not needed one.
        </p>

        <h2>Disclosure: advertising</h2>
        <p>
          This site carries advertising served through Google AdSense, which is
          what pays for the tools to stay free. Advertisers have no input into
          what we publish, no advance sight of articles, and no ability to
          request changes. We do not accept paid guest posts, paid links, or
          sponsored articles. If that ever changes, it will be disclosed on this
          page and labelled on the article itself.
        </p>

        <h2>Disclosure: our own tools</h2>
        <p>
          We build and give away the{" "}
          <Link href="/humanize-text">Text Humanizer</Link> and{" "}
          <Link href="/humanize-photo">Photo Humanizer</Link>, and we link to
          them from articles where they are genuinely relevant. That is an
          obvious conflict of interest, so we try to handle it honestly: when a
          manual technique works better than our tool, we say so, and when our
          tool can&apos;t do something, we say that too. Our comparison articles
          include our own tools&apos; weaknesses alongside competitors&apos;.
        </p>

        <h2>What we will not do</h2>
        <p>
          We won&apos;t promise that any tool defeats any specific detector.
          That claim is unverifiable, changes weekly, and encourages exactly the
          use cases we think people should avoid. Our position on academic and
          professional integrity is set out in{" "}
          <Link href="/blog/ai-writing-tools-academic-integrity">
            this article
          </Link>{" "}
          and in our <Link href="/terms">terms of service</Link>.
        </p>
      </div>
    </div>
  );
}
