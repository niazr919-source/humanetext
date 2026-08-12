import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Text Humanizer",
  description:
    "Paste in AI-generated or robotic text and get a natural, human-sounding rewrite that keeps your original meaning.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
