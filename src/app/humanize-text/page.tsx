"use client";

import { useState } from "react";
import UsageCounter from "@/components/UsageCounter";
import CopyButton from "@/components/CopyButton";
import { getClientId } from "@/lib/clientId";

export default function HumanizeTextPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  async function handleHumanize() {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError("");
    setOutput("");

    try {
      const res = await fetch("/api/humanize-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-id": getClientId(),
        },
        body: JSON.stringify({ text: input }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setOutput(data.result);
      setRefreshKey((k) => k + 1);
    } catch {
      setError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-14">
      <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Text Humanizer
          </h1>
          <p className="mt-2 max-w-xl text-ink-soft">
            Paste in stiff or robotic-sounding text and get a natural, varied rewrite
            that keeps your original meaning.
          </p>
        </div>
        <UsageCounter action="text" refreshKey={refreshKey} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col">
          <label htmlFor="input" className="mb-2 text-sm font-semibold text-ink-soft">
            Original text
          </label>
          <textarea
            id="input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your text here..."
            maxLength={6000}
            className="h-80 w-full resize-none rounded-2xl border border-line bg-paper-dim/40 p-4 text-[15px] leading-relaxed outline-none focus:border-accent"
          />
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-ink-soft">{input.length} / 6000</span>
            <button
              onClick={handleHumanize}
              disabled={!input.trim() || loading}
              className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Humanizing…" : "Humanize"}
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold text-ink-soft">Natural rewrite</span>
            {output && <CopyButton text={output} />}
          </div>
          <div className="h-80 w-full overflow-y-auto rounded-2xl border border-line bg-white/60 p-4 text-[15px] leading-relaxed dark:bg-paper-dim/20">
            {loading && <p className="text-ink-soft">Rewriting your text…</p>}
            {!loading && error && <p className="text-accent-dark">{error}</p>}
            {!loading && !error && output && <p className="whitespace-pre-wrap">{output}</p>}
            {!loading && !error && !output && (
              <p className="text-ink-soft">Your natural-sounding rewrite will appear here.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
