"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      onClick={handleCopy}
      disabled={!text}
      className="rounded-full border border-line px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-paper-dim disabled:cursor-not-allowed disabled:opacity-40"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
