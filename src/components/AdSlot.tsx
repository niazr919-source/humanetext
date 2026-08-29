"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

interface Props {
  slot: string;
  className?: string;
}

export default function AdSlot({ slot, className }: Props) {
  useEffect(() => {
    if (!ADSENSE_CLIENT_ID) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // adsbygoogle script not loaded yet or blocked — fail silently
    }
  }, []);

  // No client id, or no real ad unit configured: render nothing rather than an
  // <ins> pointing at a slot that does not exist.
  if (!ADSENSE_CLIENT_ID || !slot) return null;

  return (
    <ins
      className={`adsbygoogle block ${className ?? ""}`}
      style={{ display: "block" }}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
