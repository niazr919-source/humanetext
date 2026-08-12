import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "What Humanwords is, why it exists, and how the Text and Photo Humanizer tools work.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight">About Humanwords</h1>

      <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-a:text-accent-dark">
        <p>
          Humanwords builds free tools that help people make AI-assisted content
          read and look more natural. We started with two problems we kept
          running into ourselves: AI-drafted text that was technically correct
          but rhythmically flat, and AI-generated or over-processed images that
          looked slightly synthetic even when every detail was rendered
          correctly.
        </p>

        <h2>What we build</h2>
        <p>
          The <Link href="/humanize-text">Text Humanizer</Link> rewrites
          stiff or repetitive text — varying sentence rhythm, cutting hedging
          filler, and replacing generic claims with more specific phrasing —
          while preserving the original meaning and facts of whatever you
          submit. It doesn&apos;t invent new claims; it reworks how existing ideas
          are expressed.
        </p>
        <p>
          The <Link href="/humanize-photo">Photo Humanizer</Link> adds
          luminance-aware grain and a light sharpening pass to photos, so
          AI-generated or overly smooth images pick up the kind of texture a
          real camera sensor produces. It&apos;s built entirely on open image
          processing (no third-party image API), so it&apos;s fast, private, and
          free to run.
        </p>

        <h2>Our position on authenticity</h2>
        <p>
          We think about this the way we write about it on the{" "}
          <Link href="/blog/content-authenticity-in-the-ai-era">blog</Link>:
          authenticity isn&apos;t about avoiding AI tools, it&apos;s about whether the
          final result represents something you actually verified, wrote, or
          created. Our tools are built to improve how AI-assisted content
          reads and looks, not to misrepresent generated content as something
          it isn&apos;t in contexts where that distinction matters — documentary
          photography, evidence, or academic integrity, for example.
        </p>

        <h2>Free to use</h2>
        <p>
          Both tools are free with a daily usage limit, no signup required.
          See <Link href="/pricing">pricing</Link> for details, or read more
          on the <Link href="/blog">blog</Link> about natural writing and
          authentic-looking photography.
        </p>

        <h2>Get in touch</h2>
        <p>
          Questions, feedback, or a bug to report? Visit the{" "}
          <Link href="/contact">contact page</Link>.
        </p>
      </div>
    </div>
  );
}
