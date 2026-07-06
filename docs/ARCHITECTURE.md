# Architecture

How this project is put together and **why** — written for someone new to
Next.js who needs to maintain or extend it.

## The one-sentence version

Everything a client would ever want changed lives in **one typed file**
(`src/lib/site.config.ts`); at build time Next.js reads it, renders the
whole site to plain HTML/CSS in `out/`, and that folder is the website —
no server, no database, nothing to keep running.

## Project structure

```
smallBizzBoiler/
├── src/
│   ├── lib/
│   │   ├── site.config.ts   ← THE file. All content + theming. Edit this.
│   │   ├── types.ts         ← TypeScript shapes for the config (documented)
│   │   ├── env.ts           ← the only place env vars are read
│   │   └── format.ts        ← tiny display helpers (hours, tel: links, prices)
│   ├── components/          ← one file per page section, top to bottom:
│   │   ├── SpecialsBanner.tsx  (slim promo strip; renders nothing if no specials)
│   │   ├── Hero.tsx            (branded banner, name/tagline/CTAs)
│   │   ├── ServiceMenu.tsx     (menu/price list + highlighted specials)
│   │   ├── About.tsx           (story + opening hours)
│   │   ├── Contact.tsx         (address/phone/map link + form)
│   │   ├── ContactForm.tsx     (the ONLY client component — Web3Forms)
│   │   ├── Footer.tsx
│   │   └── JsonLd.tsx          (schema.org structured data for Google)
│   └── app/
│       ├── layout.tsx       ← metadata, theme injection, JSON-LD, optional GA
│       ├── page.tsx         ← the single page: just stacks the components
│       ├── globals.css      ← Tailwind + the theme "bridge" (see below)
│       ├── sitemap.ts       ← becomes /sitemap.xml at build
│       └── robots.ts        ← becomes /robots.txt at build
├── public/                  ← static files served as-is (og.png share image)
├── docs/                    ← BUILD_LOG.md (decisions), this file
├── CLAUDE.md                ← operational brief for the next AI session
└── next.config.ts           ← output:'export', unoptimized images, trailing slashes
```

## Principle 1: `site.config.ts` is the single source of truth

Every component starts with `import { siteConfig } from "@/lib/site.config"`
and reads exactly the slice it needs. **No component hardcodes business
content, and no props are passed** — with one global, typed, read-only data
source, prop-drilling would be ceremony.

Spinning up a new client is therefore:

1. edit `site.config.ts` (content + two theme colors),
2. swap `public/og.png` (and the favicon in `src/app/`),
3. rebuild.

`types.ts` makes this safe: rename a field or typo a day name and
`npm run build` fails with a clear TypeScript error instead of shipping a
broken page.

## Principle 2: static export — the build IS the site

`next.config.ts` sets `output: 'export'`. `npm run build` runs every
component **once, at build time**, and writes finished HTML into `out/`.
There is no server afterwards. Consequences:

- Hosting is free (Cloudflare Pages just serves files).
- Nothing can be "fetched from a database" at runtime — content changes
  mean editing the config and rebuilding.
- Env vars are **baked in at build time** (see `src/lib/env.ts`); changing
  them requires a rebuild.
- Every component is a *server component* (rendered to HTML, zero JS
  shipped) except `ContactForm`, which is marked `"use client"` because it
  needs browser interactivity (typing, submit states). This is why Contact
  is split into two files — the static 90% stays JS-free.

## How data flows

```
site.config.ts ──> components read it ──> npm run build ──> out/*.html
     │                                                        (the site)
     ├──> layout.tsx  ──> <title>/<meta>/OG tags (Metadata API)
     ├──> layout.tsx  ──> CSS variables on <html>  ──> Tailwind utilities
     ├──> JsonLd.tsx  ──> <script type="application/ld+json"> for Google
     └──> sitemap.ts / robots.ts ──> /sitemap.xml, /robots.txt
```

## The theme bridge (how "two hex codes" restyles everything)

Three small pieces cooperate:

1. **Config** — `theme: { primaryColor, accentColor, fontFamily }` in
   `site.config.ts`.
2. **Injection** — `layout.tsx` writes them as inline CSS variables on
   `<html>`: `--primary`, `--accent`, `--site-font`.
3. **Registration** — `globals.css` has a Tailwind v4 `@theme inline` block
   mapping `--color-primary: var(--primary)` etc. That single mapping makes
   Tailwind generate real utilities: `bg-primary`, `text-accent`,
   `border-accent`, even opacity variants like `bg-accent/10`.

So components use ordinary Tailwind classes, yet every color traces back to
the config. Contract to keep in mind: **primary should be dark** (white text
is placed on it), **accent should be bright** (dark text is placed on it).

## The SEO layer

Three cooperating parts, all fed by the same config:

- **Metadata API** (`layout.tsx`): `seo.metaTitle` / `seo.metaDescription` /
  `seo.ogImage` become the `<title>`, meta description, canonical URL, and
  Open Graph/Twitter tags. `metadataBase` (from `NEXT_PUBLIC_SITE_URL`)
  makes relative image paths absolute.
- **JSON-LD** (`components/JsonLd.tsx`): a machine-readable schema.org
  description of the business. `business.businessType` picks the `@type`
  (Restaurant, AutoRepair, HealthAndBeautyBusiness, DaySpa, LocalBusiness).
  Restaurants get `hasMenu` (Menu → MenuSection → MenuItem — the shape
  Google can show as a menu in search); everything else gets
  `hasOfferCatalog` with `Service` items. Opening hours are stored in the
  config using schema.org's exact day names, so the same data feeds both
  the visible hours table (prettified by `format.ts`) and the structured data.
- **Crawler files** (`app/sitemap.ts`, `app/robots.ts`): emitted as
  `/sitemap.xml` and `/robots.txt` at build. Both need
  `export const dynamic = "force-static"` — Next 16 refuses to build them
  under `output: 'export'` without it.

## Optional integrations (graceful degradation)

All env access is centralized in `src/lib/env.ts`; every integration is
optional and switches itself off when its var is empty:

| Var | Set | Empty |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | real URLs in canonical/OG/sitemap | `https://example.com` placeholder |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | contact form sends email | form disabled with visible "demo mode" note |
| `NEXT_PUBLIC_GA_ID` | GA4 scripts injected | no analytics script at all |

Because of the static export these are **compile-time** switches: the
no-GA build contains no trace of Google Analytics.
