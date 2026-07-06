import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/env";

/**
 * robots.ts — Next.js turns this into /robots.txt at build time.
 * It tells crawlers "index everything" and points them at the sitemap.
 */

// Required under `output: 'export'`: promise Next.js this route is
// fully static so it can be emitted as a plain file at build time.
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
