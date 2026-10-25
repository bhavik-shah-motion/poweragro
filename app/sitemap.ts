import type { MetadataRoute } from "next";

// Set NEXT_PUBLIC_SITE_URL to the production domain, e.g. https://www.example.com
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/disclaimer`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
