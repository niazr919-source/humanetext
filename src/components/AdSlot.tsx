"use client";

import { useEffect, useRef } from "react";

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
  const ref = useRef<HTMLModElement>(null);
  // AdSense marks a slot "done" on the first push, so a push made while the
  // element still measures zero wide permanently wastes it for that pageview.
  // This guards against pushing twice under React's development double-render.
  const pushed = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!ADSENSE_CLIENT_ID || !slot || !el || pushed.current) return;

    const push = () => {
      if (pushed.current) return;
      pushed.current = true;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // Script blocked or not yet loaded — nothing useful to do.
      }
    };

    // Pushing while the element still measures zero wide produced
    // "No slot size for availableWidth=0", and AdSense marks a slot done on the
    // first push, so that permanently wasted it. Wait for real width.
    if (el.getBoundingClientRect().width > 0) {
      push();
      return;
    }

    // ResizeObserver rather than a frame loop: it fires even in a background
    // tab, where requestAnimationFrame is paused, and it has no timeout to
    // exhaust if layout settles slowly.
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0) {
          observer.disconnect();
          push();
          return;
        }
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [slot]);

  // No client id, or no real ad unit configured: render nothing rather than an
  // <ins> pointing at a slot that does not exist.
  if (!ADSENSE_CLIENT_ID || !slot) return null;

  return (
    <ins
      ref={ref}
      className={`adsbygoogle ${className ?? ""}`}
      // Width is set inline rather than by a utility class so the element has a
      // measurable box even if the stylesheet has not applied yet.
      style={{ display: "block", width: "100%" }}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
