/**
 * env.ts — the ONLY place environment variables are read.
 *
 * ⚠️ BAKED AT BUILD TIME: this is a static export, so these values are
 * inlined into the HTML/JS when you run `npm run build`. Changing `.env`
 * does nothing to an already-built site — you must rebuild (and redeploy).
 *
 * Next.js only inlines env vars that are written out literally as
 * `process.env.NEXT_PUBLIC_...` — which is why each one is spelled out
 * below instead of being read in a loop.
 *
 * Every integration degrades gracefully when its var is empty:
 * see .env.example for what each one does and where to get it.
 */

/** The live domain (no trailing slash). Used for canonical URL, Open Graph,
 *  sitemap.xml and robots.txt. Falls back to a placeholder so the build
 *  always succeeds — but set it before launching a real client! */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"
).replace(/\/$/, "");

/** Web3Forms access key for the contact form. Empty = form renders in a
 *  clearly-labeled demo/disabled state instead of breaking. */
export const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

/** Google Analytics 4 measurement ID ("G-XXXXXXXXXX"). Empty = no analytics
 *  script is injected at all. */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
