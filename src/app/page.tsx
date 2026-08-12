import Link from "next/link";

const BEFORE_EXAMPLE = `In today's fast-paced digital landscape, it is important to note that effective communication plays a crucial role in the overall success of any organization. Furthermore, it is essential to leverage synergies across all departments in order to achieve optimal outcomes.`;

const AFTER_EXAMPLE = `Good communication is what keeps an organization running. When teams actually talk to each other — instead of working in silos — the results speak for themselves.`;

const STEPS = [
  {
    title: "Paste or upload",
    body: "Drop in AI-generated text or an image straight from a generator.",
  },
  {
    title: "We do the work",
    body: "Our engine rewrites phrasing and rhythm, or adds authentic photographic texture.",
  },
  {
    title: "Use it anywhere",
    body: "Copy the natural text or download the photo — same meaning, more human feel.",
  },
];

const FAQS = [
  {
    q: "Will this change the meaning of my text?",
    a: "No. The rewrite is built to preserve your original meaning, facts, and intent — it only changes phrasing, rhythm, and structure so it reads naturally.",
  },
  {
    q: "What kinds of photos work best?",
    a: "Both AI-generated images and your own low-quality photos work. We add realistic sensor grain and micro-detail so images read as authentic photography.",
  },
  {
    q: "Is it really free?",
    a: "Yes — every visitor gets a daily free quota for both tools, no signup required. Sign up with your email for a higher daily limit.",
  },
  {
    q: "Do you store what I upload?",
    a: "We process your text and photos to generate results and don't use them for anything beyond that request. See our Privacy Policy for details.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 sm:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-paper-dim/60 px-4 py-1.5 text-xs font-medium text-ink-soft">
            Free content authenticity tools
          </span>
          <h1 className="font-display mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
            Make AI content sound and look natural
          </h1>
          <p className="mt-6 text-lg text-ink-soft sm:text-xl">
            Humanwords rewrites robotic text into natural, varied prose, and adds
            authentic camera-like texture to photos — so your content reads and
            looks like it came from a person.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/humanize-text"
              className="w-full rounded-full bg-accent px-7 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-dark sm:w-auto"
            >
              Try Text Humanizer free
            </Link>
            <Link
              href="/humanize-photo"
              className="w-full rounded-full border border-line px-7 py-3 text-center text-sm font-semibold text-ink transition-colors hover:bg-paper-dim sm:w-auto"
            >
              Try Photo Humanizer free
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-paper-dim/40 p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-soft">
              Before
            </p>
            <p className="text-[15px] leading-relaxed text-ink-soft">{BEFORE_EXAMPLE}</p>
          </div>
          <div className="rounded-2xl border border-accent/40 bg-accent-soft/40 p-6">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent-dark">
              After
            </p>
            <p className="text-[15px] leading-relaxed">{AFTER_EXAMPLE}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper-dim/30">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-center text-3xl font-semibold tracking-tight">
            How it works
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {STEPS.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                  {i + 1}
                </div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-line p-8">
            <h3 className="font-display text-xl font-semibold">Text Humanizer</h3>
            <p className="mt-2 text-ink-soft">
              Turn stiff, repetitive writing into natural prose with varied sentence
              rhythm — while keeping every fact and idea intact.
            </p>
            <Link href="/humanize-text" className="mt-4 inline-block text-sm font-semibold text-accent-dark">
              Try it free →
            </Link>
          </div>
          <div className="rounded-2xl border border-line p-8">
            <h3 className="font-display text-xl font-semibold">Photo Humanizer</h3>
            <p className="mt-2 text-ink-soft">
              Add luminance-aware grain and micro-detail so AI-generated or low-quality
              images read as authentic photography.
            </p>
            <Link href="/humanize-photo" className="mt-4 inline-block text-sm font-semibold text-accent-dark">
              Try it free →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h2 className="font-display text-center text-3xl font-semibold tracking-tight">
            Frequently asked questions
          </h2>
          <div className="mt-8 divide-y divide-line">
            {FAQS.map((faq) => (
              <details key={faq.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                  {faq.q}
                  <span className="ml-4 text-ink-soft transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 text-sm text-ink-soft">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
