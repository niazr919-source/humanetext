import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL, LEGAL_LAST_UPDATED, PRIVACY_EMAIL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Humanetext handles the text and photos you submit, what we store, which third parties are involved, and how advertising cookies work on this site.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="mt-3 text-sm text-ink-soft">Last updated: {LEGAL_LAST_UPDATED}</p>

      <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-display prose-a:text-accent-dark">
        <p>
          This policy explains what {SITE_NAME} collects when you use this site,
          why we collect it, who else it is shared with, and the choices you
          have. It covers <Link href="/">humanetext.com</Link> and both tools
          hosted on it — the{" "}
          <Link href="/humanize-text">Text Humanizer</Link> and the{" "}
          <Link href="/humanize-photo">Photo Humanizer</Link>.
        </p>
        <p>
          The short version: you can use both tools without an account, we
          don&apos;t sell your data, we don&apos;t keep your text or images
          after we return a result, and the only advertising on this site comes
          from Google AdSense.
        </p>

        <h2>Who we are</h2>
        <p>
          {SITE_NAME} is an independently operated website that publishes free
          content tools and written guides. You can reach us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> for general
          questions, or at{" "}
          <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> for anything
          concerning this policy or your data. For the purposes of the UK and
          EU GDPR, {SITE_NAME} is the data controller for the information
          described below.
        </p>

        <h2>What we collect</h2>
        <h3>Content you submit</h3>
        <p>
          When you use the Text Humanizer, the text you paste is sent to our
          server and forwarded to our AI provider to generate a rewrite. When
          you use the Photo Humanizer, the image you upload is processed on our
          own server and returned to you. In both cases the submitted content is
          held in memory only for as long as it takes to produce your result. We
          do not write your submitted text or images to a database, and we do
          not keep a copy after the response is sent back to your browser.
        </p>

        <h3>Usage information</h3>
        <p>
          Both tools are free and capped at a daily number of uses. To enforce
          that cap without asking you to create an account, we store two things:
          a randomly generated identifier saved in your browser&apos;s
          localStorage, and a record of how many requests that identifier and
          your IP address have made today. The random identifier is not derived
          from anything about you or your device — it is just a number that lets
          us count.
        </p>

        <h3>Email addresses</h3>
        <p>
          If you choose to join the waitlist on our{" "}
          <Link href="/pricing">pricing page</Link>, we store the email address
          you enter so that we can contact you when a paid tier launches. That
          is the only reason we use it. We do not add waitlist addresses to a
          marketing list or share them with anyone else.
        </p>

        <h3>Server logs</h3>
        <p>
          Like almost every website, our hosting provider records standard
          server logs — IP address, timestamp, requested URL, browser user agent
          — which are used for security, abuse prevention, and diagnosing
          errors.
        </p>

        <h2>Why we are allowed to process it</h2>
        <p>
          Where GDPR applies, we rely on the following legal bases: performance
          of a contract, for processing the text or image you submit so we can
          give you the result you asked for; legitimate interests, for rate
          limiting, security logging, and preventing abuse of a free service;
          and consent, for the waitlist email and for personalized advertising
          where consent is required in your region.
        </p>

        <h2>Cookies and similar technologies</h2>
        <p>
          {SITE_NAME} itself sets no tracking cookies. The only first-party
          storage we use is the single localStorage identifier described above,
          which exists solely to enforce daily usage limits. Clearing your
          browser storage removes it, and the only consequence is that your
          daily allowance resets.
        </p>
        <p>
          Third parties, principally Google, do set cookies on this site in
          connection with advertising. Those are described next.
        </p>

        <h2>Advertising</h2>
        <p>
          This site displays advertising served through Google AdSense. We use
          advertising to keep both tools free to use.
        </p>
        <ul>
          <li>
            Third-party vendors, including Google, use cookies to serve ads
            based on your prior visits to this website or other websites.
          </li>
          <li>
            Google&apos;s use of advertising cookies enables it and its partners
            to serve ads to you based on your visit to this site and/or other
            sites on the internet.
          </li>
          <li>
            You may opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>
            .
          </li>
          <li>
            You can also opt out of a third-party vendor&apos;s use of cookies
            for personalized advertising by visiting{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
            >
              aboutads.info
            </a>
            .
          </li>
        </ul>
        <p>
          For a fuller explanation of how Google handles information from sites
          that use its services, see{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
          >
            How Google uses information from sites or apps that use our services
          </a>
          .
        </p>
        <p>
          Ads never receive the text or images you submit to our tools. The
          advertising script runs in your browser and has no access to the
          content sent to our processing endpoints.
        </p>

        <h2>Third-party services we use</h2>
        <ul>
          <li>
            <strong>Google Gemini</strong> — receives the text you submit to the
            Text Humanizer in order to generate a rewrite. Google states that
            data submitted through the paid API is not used to train its models.
          </li>
          <li>
            <strong>Supabase</strong> — a hosted database that stores usage
            counters and waitlist email addresses.
          </li>
          <li>
            <strong>Our hosting provider</strong> — serves the site and keeps
            standard access logs.
          </li>
          <li>
            <strong>Google AdSense</strong> — serves the advertising described
            above.
          </li>
        </ul>
        <p>
          Photo Humanizer processing happens entirely on our own server using
          open-source image libraries. Your images are never sent to a
          third-party image API.
        </p>

        <h2>How long we keep things</h2>
        <ul>
          <li>Submitted text and images: not retained after your result is returned.</li>
          <li>Usage counters: retained only as long as needed to enforce the daily limit.</li>
          <li>Waitlist emails: kept until you ask us to delete them.</li>
          <li>Server logs: retained for a short period for security and debugging.</li>
        </ul>

        <h2>Your rights</h2>
        <p>
          Depending on where you live, you may have the right to access a copy
          of the personal data we hold about you, to have it corrected or
          deleted, to object to or restrict how we process it, and to withdraw
          consent you previously gave. Residents of California may additionally
          request disclosure of the categories of personal information
          collected, and may request deletion. We do not sell personal
          information, and we do not share it for cross-context behavioral
          advertising beyond the Google advertising cookies described above.
        </p>
        <p>
          To exercise any of these rights, email{" "}
          <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>. Because we do
          not run user accounts, the practical scope is usually a waitlist email
          address, which we can delete on request.
        </p>

        <h2>Children&apos;s privacy</h2>
        <p>
          {SITE_NAME} is not directed at children under 13, and we do not
          knowingly collect personal information from children. If you believe a
          child has provided us with personal information, contact us and we
          will delete it.
        </p>

        <h2>International transfers</h2>
        <p>
          Our service providers may process data in countries other than your
          own, including the United States. Where required, transfers rely on
          the standard contractual clauses or equivalent safeguards offered by
          those providers.
        </p>

        <h2>Security</h2>
        <p>
          Traffic to this site is served over HTTPS. API keys and database
          credentials are held server-side only and are never exposed to the
          browser. No system is perfectly secure, but because we do not store
          submitted content or run user accounts, there is very little sensitive
          data to expose in the first place.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy as the site changes. Material changes will
          be reflected in the &quot;Last updated&quot; date at the top of this
          page.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to{" "}
          <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>, or through
          our <Link href="/contact">contact page</Link>.
        </p>
      </div>
    </div>
  );
}
