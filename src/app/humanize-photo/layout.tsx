import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Humanizer",
  description:
    "Add realistic camera-like grain and micro-detail to a photo so it reads as authentic photography.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
