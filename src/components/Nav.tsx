"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/humanize-text", label: "Text" },
  { href: "/humanize-photo", label: "Photo" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          Humanwords
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
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
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line md:hidden"
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
        <nav className="flex flex-col gap-1 border-t border-line px-6 py-4 md:hidden">
          {LINKS.map((link) => (
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
            className="mt-2 rounded-full bg-accent px-4 py-2 text-center text-sm font-semibold text-white"
          >
            Try free
          </Link>
        </nav>
      )}
    </header>
  );
}
