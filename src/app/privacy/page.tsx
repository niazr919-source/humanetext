import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Humanwords handles the text and photos you submit, and how cookies and advertising are used on this site.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16">
      <div className="mb-8 rounded-xl border border-accent/40 bg-accent-soft/30 px-4 py-3 text-sm text-accent-dark">
        Placeholder — this page needs review by a lawyer before launch.
      </div>
      <h1 className="font-display text-4xl font-semibold tracking-tight">Privacy Policy</h1>
      <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-display">
        <p>Last updated: [DATE]</p>

        <h2>What we collect</h2>
        <p>
          When you use the Text Humanizer or Photo Humanizer, we temporarily process
          the text or image you submit in order to generate a result. We also record
          your IP address and an anonymous browser identifier to enforce daily usage
          limits. If you join our waitlist, we store the email address you provide.
        </p>

        <h2>How we use it</h2>
        <p>
          Submitted text and photos are sent to our processing services solely to
          generate your result and are not used to train models or shared with third
          parties beyond the service providers required to run the tool (for example,
          our AI text provider).
        </p>

        <h2>Cookies and similar technologies</h2>
        <p>
          We use a small amount of browser storage (localStorage) to remember an
          anonymous identifier so we can enforce fair daily usage limits without
          requiring an account. This identifier isn&apos;t linked to your name or
          identity unless you separately give us your email through the waitlist
          form.
        </p>

        <h2>Advertising</h2>
        <p>
          This site may show ads served by third-party advertising networks, such
          as Google AdSense. These networks may use cookies or similar
          technologies to serve ads based on your visits to this and other
          websites. You can opt out of personalized advertising through your
          browser settings or through{" "}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
            Google&apos;s Ads Settings
          </a>
          . For more on how Google uses data from sites that use its services,
          see{" "}
          <a
            href="https://policies.google.com/technologies/partner-sites"
            target="_blank"
            rel="noopener noreferrer"
          >
            How Google uses information from sites that use our services
          </a>
          .
        </p>

        <h2>Third-party services</h2>
        <p>
          We rely on a small number of third-party services to run Humanwords:
          an AI provider to process text rewrites, a database provider to
          enforce usage limits and store waitlist emails, and a hosting
          provider to serve the site. Each of these providers processes data
          only as needed to provide their service to us.
        </p>

        <h2>Your choices</h2>
        <p>
          You can use both tools without creating an account or providing any
          personal information. If you&apos;ve joined the waitlist and want your
          email removed, contact us using the details below.
        </p>

        <h2>Retention</h2>
        <p>
          Usage records used for rate limiting are kept only as long as needed to
          enforce daily limits. Waitlist emails are kept until you ask us to remove
          them.
        </p>

        <h2>Children&apos;s privacy</h2>
        <p>
          Humanwords is not directed at children under 13, and we do not
          knowingly collect personal information from children.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. Material changes will be
          reflected in the &quot;Last updated&quot; date above.
        </p>

        <h2>Contact</h2>
        <p>Questions about this policy can be sent to [CONTACT EMAIL].</p>
      </div>
    </div>
  );
}
