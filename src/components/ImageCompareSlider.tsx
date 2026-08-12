"use client";

import { useRef, useState } from "react";

interface Props {
  beforeSrc: string;
  afterSrc: string;
}

export default function ImageCompareSlider({ beforeSrc, afterSrc }: Props) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  function updateFromClientX(clientX: number) {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl border border-line bg-paper-dim"
      onMouseDown={(e) => {
        dragging.current = true;
        updateFromClientX(e.clientX);
      }}
      onMouseMove={(e) => {
        if (dragging.current) updateFromClientX(e.clientX);
      }}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => updateFromClientX(e.touches[0].clientX)}
      onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={afterSrc} alt="Processed" className="absolute inset-0 h-full w-full object-contain" />

      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeSrc}
          alt="Original"
          className="absolute inset-0 h-full w-full object-contain"
        />
      </div>

      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3L1 7l4 4M9 3l4 4-4 4" stroke="#211D1A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
        Before
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
        After
      </span>
    </div>
  );
}
