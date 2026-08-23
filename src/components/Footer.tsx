import Link from "next/link";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

const COLUMNS = [
  {
    heading: "Tools",
    links: [
      { href: "/humanize-text", label: "Text Humanizer" },
      { href: "/humanize-photo", label: "Photo Humanizer" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    heading: "Read",
    links: [
      { href: "/blog", label: "All articles" },
      { href: "/blog/category/writing", label: "Writing craft" },
      { href: "/blog/category/detection", label: "AI detection" },
      { href: "/blog/category/photography", label: "Photography" },
    ],
  },
  {
    heading: "Site",
    links: [
      { href: "/about", label: "About" },
      { href: "/about/editorial", label: "Editorial standards" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-lg font-semibold">{SITE_NAME}</p>
          <p className="mt-2 max-w-xs text-sm text-ink-soft">
            Free tools and in-depth guides for making AI-assisted writing read
            naturally and AI-assisted images look photographic.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-3 inline-block text-sm text-accent-dark hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        {COLUMNS.map((column) => (
          <nav key={column.heading}>
            <p className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
              {column.heading}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-ink-soft">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-line px-6 py-4 text-center text-xs text-ink-soft">
        © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </div>
    </footer>
  );
}
