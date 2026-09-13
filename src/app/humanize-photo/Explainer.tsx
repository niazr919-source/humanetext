import Link from "next/link";

/**
 * Substantive explanation rendered below the tool itself. Describes this
 * specific processing pipeline — the same one documented in the film grain
 * articles — rather than grain in general.
 */
export default function Explainer() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-3xl px-6 py-14">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          What the processing actually does
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
          Four stages, run on our server with open-source image libraries rather
          than a generative model. Nothing in your picture is redrawn or
          invented — the pixels you upload are the pixels you get back, with
          texture applied on top.
        </p>

        <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-ink-soft">
          <p>
            <strong className="text-ink">1. A monochromatic noise field.</strong>{" "}
            Random variation is generated as brightness only, with no colour
            speckle. This matters because black and white film has a single
            emulsion layer and produces exactly that kind of texture, whereas
            per-channel colour noise reads as a cheap digital filter.
          </p>
          <p>
            <strong className="text-ink">2. A slight blur.</strong> The noise is
            softened by a fraction of a pixel so the grain has size. Pixel-sharp
            static is the most common tell of a bad grain effect, because real
            grain is a physical structure with dimensions rather than a
            per-pixel random number.
          </p>
          <p>
            <strong className="text-ink">3. An overlay composite.</strong> The
            field is blended using an overlay mode, which scales the effect by
            the brightness of the pixel underneath. Texture therefore lands
            hardest in the midtones and is compressed in both deep shadows and
            bright highlights.
          </p>
          <p>
            <strong className="text-ink">4. Light sharpening, then a JPEG
            encode.</strong> This puts the result through something resembling a
            real capture pipeline, rather than leaving clean texture sitting on
            top of a clean image.
          </p>
        </div>

        <h2 className="font-display mt-12 text-2xl font-semibold tracking-tight">
          Why midtones rather than shadows
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
          This is a deliberate choice, and it is the detail most grain tools get
          wrong, because two different physical effects get lumped under one
          word.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
          <strong className="text-ink">Film grain peaks in the midtones.</strong>{" "}
          Film is an emulsion of silver halide crystals, and each one either
          develops or it does not. In a blown highlight nearly all of them
          develop, so the field is uniformly dense. In deep shadow almost none
          do, so it is uniformly sparse. Visible texture peaks where roughly half
          developed.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
          <strong className="text-ink">Digital sensor noise peaks in the
          shadows.</strong> A sensor counts photons, and photon arrival is
          random. The spread scales with the square root of the count, so a
          bright area collecting 10,000 photons has about 1% relative noise
          while a dark area collecting 100 has about 10%.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
          They are opposite distributions. This tool models the film case.
          Applying one recipe while describing the other is how grain ends up
          looking approximately right and specifically wrong — the full
          explanation is in{" "}
          <Link href="/blog/what-is-film-grain-photography" className="text-accent-dark hover:underline">
            what is film grain
          </Link>{" "}
          and{" "}
          <Link href="/blog/how-camera-sensor-noise-works" className="text-accent-dark hover:underline">
            how camera sensor noise works
          </Link>
          .
        </p>

        <h2 className="font-display mt-12 text-2xl font-semibold tracking-tight">
          Which images are worth running through it
        </h2>
        <div className="mt-4 space-y-5 text-[15px] leading-relaxed text-ink-soft">
          <p>
            <strong className="text-ink">Good candidates:</strong> AI-generated
            images, which are typically rendered with even, artefact-free detail
            no real sensor produces. Heavily denoised photographs, where noise
            reduction has left skin and surfaces looking plastic. Upscaled
            images that have gone smooth. Flat digital gradients showing visible
            banding, which grain masks very effectively — the method is in{" "}
            <Link href="/blog/fix-banding-in-gradients" className="text-accent-dark hover:underline">
              how to fix banding in gradients
            </Link>
            .
          </p>
          <p>
            <strong className="text-ink">Poor candidates:</strong> photographs
            that already carry visible high-ISO noise. Adding grain on top of
            grain produces a muddy double texture rather than a film look.
            Denoise first, or leave the image alone.
          </p>
          <p>
            <strong className="text-ink">Bright, clean product shots</strong> sit
            in between. Grain will read as an applied effect there, because no
            photographer would have chosen fast film for that job.
          </p>
        </div>

        <h2 className="font-display mt-12 text-2xl font-semibold tracking-tight">
          What it will not fix
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
          Texture is the last thing a viewer checks, not the first. The eye
          verifies geometry, lighting and anatomy long before it reaches surface
          detail, so grain over an image with impossible lighting or a
          six-fingered hand produces a grainy impossible image and nothing more.
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
          It also will not repair composition, correct exposure, or rescue a
          low-resolution file. The seven things that actually give generated
          pictures away, in the order your eye checks them, are in{" "}
          <Link href="/blog/why-ai-generated-images-look-fake" className="text-accent-dark hover:underline">
            why AI-generated images still look off
          </Link>
          .
        </p>

        <h2 className="font-display mt-12 text-2xl font-semibold tracking-tight">
          Where you should not use it
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
          Documentary photography, photojournalism, evidence, insurance claims
          and scientific imaging all have norms about permissible
          post-processing. Texture that implies a capture condition which did not
          occur can cross that line, and our{" "}
          <Link href="/terms" className="text-accent-dark hover:underline">
            terms
          </Link>{" "}
          rule that use out. The reasoning is in{" "}
          <Link href="/blog/content-authenticity-in-the-ai-era" className="text-accent-dark hover:underline">
            content authenticity in the AI era
          </Link>
          .
        </p>

        <h2 className="font-display mt-12 text-2xl font-semibold tracking-tight">
          Privacy and limits
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
          Your image is processed to produce the result and is not retained
          afterwards. Downloads are full resolution with no watermark. The free
          allowance is three images a day per visitor, renewed daily — this tool
          costs far less to run than the text rewriter, since it uses our own
          server rather than a paid API, so the limit protects the server rather
          than a bill. Leaving an email raises it. See our{" "}
          <Link href="/privacy" className="text-accent-dark hover:underline">
            privacy policy
          </Link>{" "}
          for what is handled and by whom.
        </p>
      </div>
    </section>
  );
}
