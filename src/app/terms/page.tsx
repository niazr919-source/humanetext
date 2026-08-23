import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, LEGAL_LAST_UPDATED, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern use of Humanetext, including acceptable use, content ownership, usage limits, advertising, and liability.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Terms of Service</h1>
      <p className="mt-3 text-sm text-ink-soft">Last updated: {LEGAL_LAST_UPDATED}</p>

      <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-a:text-accent-dark">
        <p>
          These terms govern your use of {SITE_NAME} at humanetext.com,
          including the <Link href="/humanize-text">Text Humanizer</Link>, the{" "}
          <Link href="/humanize-photo">Photo Humanizer</Link>, and the articles
          published on our <Link href="/blog">blog</Link>. By using the site you
          agree to them. If you do not agree, please don&apos;t use the site.
        </p>

        <h2>The service</h2>
        <p>
          {SITE_NAME} provides free, browser-based tools that rewrite text so it
          reads more naturally and add photographic texture to images. The tools
          are offered as-is, without an account, subject to daily usage limits.
          We may change, suspend, or discontinue any part of the service at any
          time.
        </p>

        <h2>Eligibility</h2>
        <p>
          You must be at least 13 years old to use this site. If you are using
          it on behalf of an organization, you confirm that you are authorized
          to accept these terms for that organization.
        </p>

        <h2>Your content</h2>
        <p>
          You keep every right you already had in the text and images you
          submit, and in the results the tools return. We claim no ownership
          over your content. You grant us only the narrow, temporary permission
          needed to process your submission and return a result — nothing more.
          As described in our <Link href="/privacy">Privacy Policy</Link>, we do
          not retain submitted content after processing and do not use it to
          train models.
        </p>
        <p>
          You are responsible for having the right to submit whatever you
          submit. Don&apos;t upload content you do not own or have permission to
          use.
        </p>

        <h2>Acceptable use</h2>
        <p>You agree not to use {SITE_NAME}:</p>
        <ul>
          <li>
            to produce content intended to deceive, defraud, harass, threaten,
            or impersonate another person;
          </li>
          <li>
            to present AI-generated or AI-edited material as unedited
            documentary evidence in a context where that distinction matters —
            news reporting, journalism, insurance or legal proceedings, or
            scientific publication;
          </li>
          <li>
            to circumvent an institution&apos;s rules on AI assistance where
            those rules apply to you, including academic integrity policies (see
            our{" "}
            <Link href="/blog/ai-writing-tools-academic-integrity">
              guide on academic integrity
            </Link>{" "}
            for our position on this);
          </li>
          <li>
            to generate content that is illegal, sexually exploitative of
            minors, or that infringes someone else&apos;s intellectual property;
          </li>
          <li>
            to attack the service — automated scraping, attempts to bypass rate
            limits, denial-of-service, or probing for vulnerabilities.
          </li>
        </ul>
        <p>
          We may block access from any browser or IP address that appears to be
          violating these rules, without notice.
        </p>

        <h2>Usage limits</h2>
        <p>
          Free usage is capped per day per browser and IP address. The current
          limit is shown in each tool and on the{" "}
          <Link href="/pricing">pricing page</Link>. We may adjust these limits
          to keep the service sustainable. Attempting to evade the limit — for
          example by cycling identifiers or addresses — is a breach of these
          terms.
        </p>

        <h2>Advertising</h2>
        <p>
          This site displays advertising served through Google AdSense, which is
          what keeps the tools free. Ads are selected and served by Google, not
          by us; we do not control, endorse, or take responsibility for the
          content of any advertisement or the sites they link to. Our{" "}
          <Link href="/privacy">Privacy Policy</Link> explains how advertising
          cookies work and how to opt out of personalized ads.
        </p>

        <h2>Our content</h2>
        <p>
          The articles, guides, design, and code that make up this site are
          owned by {SITE_NAME} and protected by copyright. You are welcome to
          quote from our articles with attribution and a link. You may not
          republish them in full, or reproduce them at scale, without written
          permission.
        </p>

        <h2>Accuracy of results</h2>
        <p>
          The Text Humanizer uses a large language model, which means output can
          contain mistakes. It is designed to preserve the meaning of what you
          submit, but you should read every result before you use it. We make no
          guarantee that output will evade any particular AI detector, achieve
          any particular score, or be suitable for any specific purpose. Claims
          to the contrary from any humanizing tool should be treated with
          skepticism — we explain why in{" "}
          <Link href="/blog/how-ai-content-detectors-work">
            how AI content detectors actually work
          </Link>
          .
        </p>

        <h2>No warranty</h2>
        <p>
          The service is provided &quot;as is&quot; and &quot;as available,&quot;
          without warranties of any kind, express or implied, including
          warranties of merchantability, fitness for a particular purpose, and
          non-infringement. We do not warrant that the service will be
          uninterrupted, timely, secure, or error-free.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {SITE_NAME} will not be liable
          for any indirect, incidental, special, consequential, or punitive
          damages, or for any loss of data, revenue, or profits, arising out of
          or related to your use of the service. Because the service is provided
          free of charge, our total aggregate liability to you for any claim is
          limited to one hundred US dollars.
        </p>
        <p>
          Some jurisdictions do not allow the exclusion of certain warranties or
          limitations of liability, so some of the above may not apply to you.
        </p>

        <h2>Indemnity</h2>
        <p>
          You agree to indemnify and hold {SITE_NAME} harmless from any claim or
          demand arising out of content you submit or the way you use results
          the service produced for you.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms as the service changes. The &quot;Last
          updated&quot; date at the top of this page reflects the most recent
          revision. Continuing to use the site after a change means you accept
          the updated terms.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws applicable in the operator&apos;s
          place of business, without regard to conflict-of-law rules. Nothing
          here limits any consumer rights you have under the mandatory law of
          your country of residence.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, or through
          our <Link href="/contact">contact page</Link>.
        </p>
      </div>
    </div>
  );
}
