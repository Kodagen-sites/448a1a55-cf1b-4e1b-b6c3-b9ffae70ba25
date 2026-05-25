import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.seo.siteUrl;
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, priority: 1.0 },
    { url: `${base}/about`, lastModified: now, priority: 0.8 },
    { url: `${base}/contact`, lastModified: now, priority: 0.7 },
    { url: `${base}/privacy`, lastModified: now, priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, priority: 0.3 },
  ];
}
