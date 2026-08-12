import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using Humanwords, including content ownership, advertising, and usage limits.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <div className="mb-8 rounded-xl border border-accent/40 bg-accent-soft/30 px-4 py-3 text-sm text-accent-dark">
        Placeholder — this page needs review by a lawyer before launch.
      </div>
      <h1 className="font-display text-4xl font-semibold tracking-tight">Terms of Service</h1>
      <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-display">
        <p>Last updated: [DATE]</p>

        <h2>Use of the service</h2>
        <p>
          Humanwords provides tools to make text and photos sound and look more
          natural. You agree to use the service only for content you have the right
          to submit, and not to use it to generate misleading, harmful, or illegal
          content.
        </p>

        <h2>Your content</h2>
        <p>
          You retain all rights to the text and photos you submit and to the
          results generated from them. We don&apos;t claim ownership over your
          content and don&apos;t use it for anything beyond generating your
          result.
        </p>

        <h2>Free usage limits</h2>
        <p>
          Free usage is limited to a daily quota per browser and IP address, as shown
          in the tool. We may change these limits at any time.
        </p>

        <h2>Advertising</h2>
        <p>
          This site may display advertising served by third-party networks,
          including Google AdSense. Advertisements are provided by those
          networks and we don&apos;t control their content. See our{" "}
          <a href="/privacy">Privacy Policy</a> for details on how advertising
          cookies are used.
        </p>

        <h2>Acceptable use</h2>
        <p>
          You may not use Humanwords to generate content intended to deceive,
          defraud, harass, or impersonate another person, or to misrepresent
          AI-generated or AI-edited material as unedited documentary evidence
          in a context where that distinction matters (for example, news
          reporting, academic submissions, or legal proceedings).
        </p>

        <h2>No warranty</h2>
        <p>
          The service is provided &quot;as is&quot; without warranties of any kind. We
          don&apos;t guarantee that output will be free of errors or suitable for any particular
          purpose.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, Humanwords is not liable for
          any indirect, incidental, or consequential damages arising from your
          use of the service.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the
          service after a change means you accept the updated terms.
        </p>

        <h2>Contact</h2>
        <p>Questions about these terms can be sent to [CONTACT EMAIL].</p>
      </div>
    </div>
  );
}
