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
  }));

  const categoryRoutes = Object.keys(CATEGORIES).map((category) => ({
    url: `${SITE_URL}/blog/category/${category}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updated
      ? new Date(post.updated)
      : post.date
        ? new Date(post.date)
        : new Date(),
  }));

  return [...staticRoutes, ...categoryRoutes, ...postRoutes];
}
