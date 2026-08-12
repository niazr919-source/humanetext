"use client";

import { useEffect, useState } from "react";
import { getClientId } from "@/lib/clientId";

interface Props {
  action: "text" | "photo";
  refreshKey?: number;
}

export default function UsageCounter({ action, refreshKey }: Props) {
  const [remaining, setRemaining] = useState<number | null>(null);
  const [limit, setLimit] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(`/api/usage?action=${action}`, {
          headers: { "x-client-id": getClientId() },
        });
        const data = await res.json();
        if (!cancelled) {
          setRemaining(data.remaining);
          setLimit(data.limit);
        }
      } catch {
        if (!cancelled) {
          setRemaining(null);
          setLimit(null);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [action, refreshKey]);

  if (remaining === null || limit === null) return null;

  return (
    <p className="text-sm text-ink-soft">
      <span className="font-semibold text-ink">{remaining}</span> of {limit} free{" "}
      {action === "text" ? "rewrites" : "processes"} left today
    </p>
  );
}
