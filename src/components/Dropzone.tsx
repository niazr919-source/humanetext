"use client";

import { useRef, useState } from "react";

interface Props {
  onFile: (file: File) => void;
}

export default function Dropzone({ onFile }: Props) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (file) onFile(file);
  }

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={`flex aspect-[4/3] w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
        dragOver ? "border-accent bg-accent-soft/40" : "border-line bg-paper-dim/40 hover:border-accent"
      }`}
    >
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-ink-soft">
        <path
          d="M12 16V4m0 0L7 9m5-5l5 5M5 20h14"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="font-medium">Drag & drop a photo here</p>
      <p className="text-sm text-ink-soft">or click to browse — JPEG, PNG, or WEBP, up to 12MB</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
