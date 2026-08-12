import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">Humanwords</p>
          <p className="mt-1 text-sm text-ink-soft">
            Natural-sounding writing and authentic-looking photos.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
          <Link href="/humanize-text" className="hover:text-ink">Text Humanizer</Link>
          <Link href="/humanize-photo" className="hover:text-ink">Photo Humanizer</Link>
          <Link href="/pricing" className="hover:text-ink">Pricing</Link>
          <Link href="/blog" className="hover:text-ink">Blog</Link>
          <Link href="/about" className="hover:text-ink">About</Link>
          <Link href="/contact" className="hover:text-ink">Contact</Link>
          <Link href="/privacy" className="hover:text-ink">Privacy</Link>
          <Link href="/terms" className="hover:text-ink">Terms</Link>
        </nav>
      </div>
      <div className="border-t border-line px-6 py-4 text-center text-xs text-ink-soft">
        © {new Date().getFullYear()} Humanwords. All rights reserved.
      </div>
    </footer>
  );
}
