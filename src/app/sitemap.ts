import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://humanetext.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/humanize-text",
    "/humanize-photo",
    "/pricing",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
  }));

  return [...staticRoutes, ...postRoutes];
}
