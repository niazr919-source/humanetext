import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // The comparison article was renamed when the site's brand was
        // aligned with the humanetext.com domain. Preserve the indexed URL.
        source: "/blog/quillbot-vs-humanwords",
        destination: "/blog/quillbot-vs-humanetext",
        permanent: true,
      },
      {
        // Merged into the fuller article on developing a writing voice, which
        // covers the same ground properly instead of gesturing at it.
        source: "/blog/writing-that-sounds-like-you",
        destination: "/blog/how-to-find-your-writing-voice",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
