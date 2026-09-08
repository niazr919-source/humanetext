"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * The two tools live in the nav rather than on the homepage, which is an
 * article index. They stay grouped and labelled in full so the menu is where
 * people look for them.
 */
const TOOL_LINKS = [
  { href: "/humanize-text", label: "Text Humanizer" },
  { href: "/humanize-photo", label: "Photo Humanizer" },
];

const SITE_LINKS = [
  { href: "/blog", label: "Articles" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/work-with-us", label: "Hire us" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          Humanetext
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {TOOL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-ink transition-colors hover:text-accent-dark"
            >
              {link.label}
            </Link>
          ))}

          <span aria-hidden="true" className="h-4 w-px bg-line" />

          {SITE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/humanize-text"
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
          >
            Try free
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="sr-only">Menu</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-line px-6 py-4 lg:hidden">
          <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Free tools
          </p>
          {TOOL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-paper-dim"
            >
              {link.label}
            </Link>
          ))}

          <p className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Site
          </p>
          {SITE_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft hover:bg-paper-dim hover:text-ink"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/humanize-text"
            onClick={() => setOpen(false)}
            className="mt-3 rounded-full bg-accent px-4 py-2 text-center text-sm font-semibold text-white"
          >
            Try free
          </Link>
        </nav>
      )}
    </header>
  );
}
