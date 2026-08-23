import Link from "next/link";
import { AUTHOR } from "@/lib/site";
import { CATEGORIES, formatDate, type CategorySlug } from "@/lib/posts";

interface Props {
  category: CategorySlug;
  date: string;
  updated: string;
  readingMinutes: number;
}

export default function Byline({ category, date, updated, readingMinutes }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-ink-soft">
      <Link
        href={`/blog/category/${category}`}
        className="rounded-full bg-accent-soft/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-dark hover:bg-accent-soft"
      >
        {CATEGORIES[category].label}
      </Link>
      <span>
        By{" "}
        <Link href="/about/editorial" className="font-medium text-ink hover:underline">
          {AUTHOR.name}
        </Link>
      </span>
      <span aria-hidden="true">·</span>
      <time dateTime={date}>{formatDate(date)}</time>
      <span aria-hidden="true">·</span>
      <span>{readingMinutes} min read</span>
      {updated && (
        <>
          <span aria-hidden="true">·</span>
          <span className="text-ink-soft">Updated {formatDate(updated)}</span>
        </>
      )}
    </div>
  );
}
