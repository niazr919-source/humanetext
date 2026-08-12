"use client";

import { useState } from "react";
import Dropzone from "@/components/Dropzone";
import ImageCompareSlider from "@/components/ImageCompareSlider";
import UsageCounter from "@/components/UsageCounter";
import { getClientId } from "@/lib/clientId";

export default function HumanizePhotoPage() {
  const [beforeUrl, setBeforeUrl] = useState("");
  const [afterUrl, setAfterUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  async function handleFile(file: File) {
    setError("");
    setAfterUrl("");
    setBeforeUrl(URL.createObjectURL(file));
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/humanize-photo", {
        method: "POST",
        headers: { "x-client-id": getClientId() },
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      const blob = await res.blob();
      setAfterUrl(URL.createObjectURL(blob));
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
            Photo Humanizer
          </h1>
          <p className="mt-2 max-w-xl text-ink-soft">
            Upload a photo and add realistic camera-like grain and micro-detail so it
            reads as authentic photography.
          </p>
        </div>
        <UsageCounter action="photo" refreshKey={refreshKey} />
      </div>

      {!beforeUrl && <Dropzone onFile={handleFile} />}

      {beforeUrl && (
        <div className="flex flex-col gap-6">
          {loading && (
            <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl border border-line bg-paper-dim/40">
              <p className="text-ink-soft">Adding natural texture…</p>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-line bg-paper-dim/40 p-6 text-accent-dark">
              {error}
            </div>
          )}

          {!loading && !error && afterUrl && (
            <ImageCompareSlider beforeSrc={beforeUrl} afterSrc={afterUrl} />
          )}

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                setBeforeUrl("");
                setAfterUrl("");
                setError("");
              }}
              className="rounded-full border border-line px-5 py-2 text-sm font-medium hover:bg-paper-dim"
            >
              Try another photo
            </button>
            {afterUrl && (
              <a
                href={afterUrl}
                download="humanized-photo.jpg"
                className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-accent-dark"
              >
                Download
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
