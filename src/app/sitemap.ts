import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/env";

/**
 * sitemap.ts — Next.js turns this into /sitemap.xml at build time.
 * A sitemap tells search engines which URLs exist; ours has exactly one.
 * The domain comes from NEXT_PUBLIC_SITE_URL (see src/lib/env.ts).
 */

// Required under `output: 'export'`: promise Next.js this route is
// fully static so it can be emitted as a plain file at build time.
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(), // "last built" — fine for a site rebuilt on every edit
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
