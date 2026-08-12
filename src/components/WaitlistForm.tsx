"use client";

import { useState } from "react";
import { getClientId } from "@/lib/clientId";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-id": getClientId(),
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("done");
    } catch {
      setError("Couldn't reach the server. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="rounded-full border border-teal/40 bg-teal-soft px-5 py-3 text-center text-sm font-medium text-teal">
        You&apos;re on the list — we&apos;ll email you when it&apos;s ready.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="flex-1 rounded-full border border-line bg-paper px-5 py-3 text-sm outline-none focus:border-accent"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-50"
      >
        {status === "loading" ? "Joining…" : "Join waitlist"}
      </button>
      {error && <p className="mt-1 text-sm text-accent-dark sm:hidden">{error}</p>}
    </form>
  );
}
