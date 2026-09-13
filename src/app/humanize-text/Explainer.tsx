import Link from "next/link";

/**
 * Substantive explanation rendered below the tool itself.
 *
 * The tool page is the first thing most visitors and reviewers see, and a
 * textarea with one sentence above it tells them nothing about what the
 * rewrite does, what it refuses to do, or when not to use it. Everything here
 * describes this specific implementation rather than rewriting in general.
 */
export default function Explainer() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-3xl px-6 py-14">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          What the rewrite actually changes
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
          Four things, in roughly this order of impact.
        </p>

        <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-soft">
          <p>
            <strong className="text-ink">Sentence length.</strong> Machine-written
            prose tends to settle into a narrow band, with most sentences
            landing between fifteen and twenty-five words. That evenness is the
            single strongest signal that nobody was making choices. The rewrite
            breaks the pattern up, splitting some sentences and joining others,
            so the rhythm varies the way it does when a person is writing.
          </p>
          <p>
            <strong className="text-ink">Filler and hedging.</strong> Openers
            like <em>it is important to note that</em> and stacked qualifiers
            like <em>may potentially be able to</em> delay the point without
            adding to it. They come out, which usually shortens the passage by
            ten to twenty per cent on its own.
          </p>
          <p>
            <strong className="text-ink">Abstraction.</strong> Where a sentence
            reaches for a general noun — <em>solutions</em>, <em>landscape</em>,{" "}
            <em>challenges</em> — and the specific thing is recoverable from
            context, the specific thing goes back in.
          </p>
          <p>
            <strong className="text-ink">Transitions.</strong> Heavy formal
            connectives — <em>furthermore</em>, <em>moreover</em>,{" "}
            <em>in conclusion</em> — get replaced or dropped. Most paragraphs
            connect perfectly well without being told they are connecting.
          </p>
        </div>

        <h2 className="font-display mt-12 text-2xl font-semibold tracking-tight">
          What it deliberately leaves alone
        </h2>
        <div className="mt-4 space-y-5 text-[15px] leading-relaxed text-ink-soft">
          <p>
            <strong className="text-ink">Your facts and figures.</strong> Names,
            numbers, dates and claims pass through unchanged. A rewrite that
            quietly alters a statistic is worse than no rewrite, so the tool is
            built to move phrasing rather than substance.
          </p>
          <p>
            <strong className="text-ink">Your argument.</strong> If a paragraph
            makes a weak case, it will make the same weak case more readably.
            Rhythm is a presentation problem; reasoning is not, and no rewriting
            tool can fix the second by working on the first.
          </p>
          <p>
            <strong className="text-ink">Technical terminology.</strong> Domain
            words are left in place rather than swapped for common synonyms.
            This is where general-purpose paraphrasers most often damage a text,
            turning a precise term into an approximate one.
          </p>
        </div>

        <h2 className="font-display mt-12 text-2xl font-semibold tracking-tight">
          Getting a better result
        </h2>
        <div className="mt-4 space-y-5 text-[15px] leading-relaxed text-ink-soft">
          <p>
            <strong className="text-ink">Give it a few paragraphs, not one
            sentence.</strong> Rhythm is a property of a passage. A single
            sentence has no rhythm to vary, so there is very little for the
            rewrite to work with.
          </p>
          <p>
            <strong className="text-ink">Do not paste an entire document.</strong>{" "}
            The input is capped at 6,000 characters, and quality is better on
            focused sections anyway. Work through a long piece in parts, which
            also lets you keep the bits that were already fine.
          </p>
          <p>
            <strong className="text-ink">Read the output before you use it.</strong>{" "}
            Treat it as a draft from a fast editor, not a finished text. You are
            accountable for what it says, and you will often want to put a phrase
            of your own back in.
          </p>
          <p>
            <strong className="text-ink">Keep what was already yours.</strong> If
            a sentence in the original sounded like you, and the rewrite has
            smoothed it out, use the original. The tool optimises for natural
            rhythm, which is not always the same as your voice.
          </p>
        </div>

        <h2 className="font-display mt-12 text-2xl font-semibold tracking-tight">
          What this tool will not do
        </h2>
        <div className="mt-4 space-y-5 text-[15px] leading-relaxed text-ink-soft">
          <p>
            <strong className="text-ink">It will not reliably change an AI
            detector score, and we do not claim otherwise.</strong> Detectors
            estimate how statistically predictable text is rather than who wrote
            it. Scores differ between tools, and the same passage can score
            differently on two runs of the same tool. Any service promising to
            defeat detection is selling you a result it cannot control — the
            mechanism is set out in{" "}
            <Link href="/blog/how-ai-content-detectors-work" className="text-accent-dark hover:underline">
              how AI content detectors actually work
            </Link>
            .
          </p>
          <p>
            <strong className="text-ink">It will not make submitted work
            permissible.</strong> If your institution or client prohibits
            generated text, running it through a rewriter does not change what
            you are handing in. Where that line sits is covered in{" "}
            <Link href="/blog/ai-writing-tools-academic-integrity" className="text-accent-dark hover:underline">
              using AI writing tools responsibly
            </Link>
            .
          </p>
          <p>
            <strong className="text-ink">It will not teach you to write.</strong>{" "}
            That is a genuine limitation rather than false modesty. If you want
            the underlying skill, the edits the tool performs are all learnable
            by hand, and{" "}
            <Link href="/blog/how-to-write-like-a-human" className="text-accent-dark hover:underline">
              how to write like a human
            </Link>{" "}
            sets them out.
          </p>
        </div>

        <h2 className="font-display mt-12 text-2xl font-semibold tracking-tight">
          Privacy and limits
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
          Text you submit is sent to a language model to produce the rewrite and
          is not stored afterwards or used to train anything. There is no
          account, no password and no email requirement. The free allowance is
          three rewrites a day per visitor, renewed daily, because each rewrite
          calls a paid model and this site is funded by advertising rather than
          subscriptions. Leaving an email raises the limit and nothing else —
          output quality is identical either way, and there is no better version
          being held back. The reasoning is spelled out on our{" "}
          <Link href="/pricing" className="text-accent-dark hover:underline">
            pricing page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
