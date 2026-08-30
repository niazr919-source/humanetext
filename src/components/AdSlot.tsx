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
    if (!ADSENSE_CLIENT_ID || !slot || pushed.current) return;

    let frame = 0;
    let attempts = 0;

    // Wait until the element actually has width. Pushing during hydration
    // produced "No slot size for availableWidth=0" — the ins element had not
    // been laid out yet, so AdSense had no width to pick a creative for.
    const pushWhenMeasured = () => {
      const width = ref.current?.getBoundingClientRect().width ?? 0;

      if (width > 0) {
        pushed.current = true;
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch {
          // Script blocked or not yet loaded — nothing useful to do.
        }
        return;
      }

      // Give layout a few frames before giving up, in case a webfont or
      // stylesheet is still settling. Roughly a second at 60fps.
      if (attempts++ < 60) frame = requestAnimationFrame(pushWhenMeasured);
    };

    frame = requestAnimationFrame(pushWhenMeasured);
    return () => cancelAnimationFrame(frame);
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
