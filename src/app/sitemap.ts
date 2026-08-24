import type { MetadataRoute } from "next";
import { CATEGORIES, getAllPosts } from "@/lib/posts";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/humanize-text",
    "/humanize-photo",
    "/pricing",
    "/blog",
    "/about",
    "/about/editorial",
    "/contact",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    // Tools and home are the commercial pages; keep them above the rest.
    priority: route === "" || route.startsWith("/humanize") ? 1 : 0.6,
  }));

  const categoryRoutes = Object.keys(CATEGORIES).map((category) => ({
    url: `${SITE_URL}/blog/category/${category}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updated
      ? new Date(post.updated)
      : post.date
        ? new Date(post.date)
        : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
