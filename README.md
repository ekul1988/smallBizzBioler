# Small-Biz Site Boilerplate

A reusable **single-page website template for local businesses** —
restaurants, auto shops, salons, spas — built to be cloned and restyled per
client in under an hour. It ships as a **fully static site** (plain HTML/CSS,
no server, no database) that hosts for **free on Cloudflare Pages**.

The template comes pre-filled with a fictional demo business ("El Camino
Taqueria") so it looks real and builds immediately.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · static
export (`output: 'export'`)

---

## Run it locally

```bash
npm install
npm run dev       # live-reload dev server at http://localhost:3000
npm run build     # production build → static site in out/
npm run preview   # serve the built out/ folder locally
```

---

## Spinning up a new client (the whole workflow)

All content and styling lives in **one file**:
[`src/lib/site.config.ts`](src/lib/site.config.ts). Components never
hardcode business content — they all read from this config.

1. **Clone this repo** into a new repo for the client.
2. **Edit `src/lib/site.config.ts`:**
   - `business` — name, tagline, description, phone, email, address,
     coordinates, opening hours, socials.
   - `business.businessType` — picks the schema.org type for Google:
     `'Restaurant' | 'AutoRepair' | 'HealthAndBeautyBusiness' | 'DaySpa' | 'LocalBusiness'`.
   - `specials` — promos; only `active: true` ones render (top banner +
     highlighted menu cards). No active specials → no banner at all.
   - `menu` — categories of `{name, description, price}`. Works equally as
     a food menu, salon price list, or mechanic service list.
   - `seo` — meta title (~60 chars), description (~160 chars), share image.
3. **Restyle** — change two hex codes in `theme`:
   - `primaryColor`: main brand color. **Keep it dark** — white text sits on it.
   - `accentColor`: CTA/highlight color. **Keep it bright** — dark text sits on it.
4. **Swap images:**
   - `public/og.png` — the social-share image (1200×630). The included one
     is a generated placeholder gradient; replace it with a real photo.
   - `src/app/favicon.ico` — the browser-tab icon.
   - The hero uses a brand-color gradient by default (zero assets needed);
     to use a photo instead, see the comment in `src/components/Hero.tsx`.
5. **Set env vars** (all optional — see below), then `npm run build`.

Everything is typed: typos in the config fail the build with a clear error
instead of shipping a broken page.

### Custom fonts

`theme.fontFamily` is a plain CSS font stack (default: system fonts, zero
loading cost). To use a Google font: import it with `next/font/google` in
`src/app/layout.tsx`, add its `.variable` class to `<html>`, and set
`fontFamily: "var(--your-font-var), sans-serif"` in the config.

---

## Environment variables

Copy `.env.example` to `.env`. **Every var is optional** — the site builds
and runs with all of them empty; each integration degrades gracefully.

| Variable | What it does | When empty |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Live domain used in canonical URL, OG tags, sitemap, robots | Placeholder `https://example.com` (set it before real launch!) |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Activates the contact form via [web3forms.com](https://web3forms.com) (free, made for static sites; sign up with the **client's** email) | Form shows a labeled "demo mode" state |
| `NEXT_PUBLIC_GA_ID` | Injects Google Analytics 4 (`G-XXXXXXXXXX`) | No analytics script injected |

> ⚠️ **Baked at build time.** This is a static export — env values are
> compiled into the HTML/JS during `npm run build`. Editing `.env` (or the
> Cloudflare Pages variables) does nothing until you **rebuild/redeploy**.

---

## Deploying free on Cloudflare Pages

1. Push the client's repo to GitHub.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages →
   Connect to Git** and pick the repo.
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
4. Add the environment variables (above) under **Settings → Environment
   variables**, then trigger a deploy.
5. Add the client's custom domain under **Custom domains**, and set
   `NEXT_PUBLIC_SITE_URL` to it (then redeploy — see the warning above).

Every push to the default branch auto-deploys. That's the whole pipeline.

---

## Optional: let clients edit their own prices (Git-based CMS)

Not installed — documented here for when a client wants self-service edits.

A Git-based CMS ([Sveltia CMS](https://github.com/sveltia/sveltia-cms) —
recommended, or its predecessor [Decap CMS](https://decapcms.org)) gives the
client a friendly admin UI at `/admin/` that commits straight to GitHub;
each save triggers a Cloudflare Pages rebuild. No database, still free.

The rough shape of the work (roughly an afternoon):

1. Move the editable content from `site.config.ts` into JSON/YAML files
   (e.g. `content/business.json`, `content/menu.json`) and have
   `site.config.ts` import them — components don't change.
2. Add `public/admin/index.html` loading the Sveltia CMS script, plus
   `public/admin/config.yml` describing those files as CMS "collections".
3. Create a **GitHub OAuth app** so the client can log in (manual step —
   Sveltia needs a small auth worker; Cloudflare Workers has ready-made
   templates for this).

Until then, "client wants a price changed" = you edit one line in
`site.config.ts` and push.

---

## Project layout & docs

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — how it's put together
  (config → components → static HTML, the theme bridge, the SEO layer).
- [`docs/BUILD_LOG.md`](docs/BUILD_LOG.md) — chronological decisions log.
- [`CLAUDE.md`](CLAUDE.md) — operational brief for AI-assisted sessions.

## Assumptions made (defaults you may want to change)

- **Demo business is fictional** (taqueria in Worcester, MA, 555 phone
  number, example.com-style emails/socials) — replace everything per client.
- **English-only** (`lang="en"`), light theme only, `en_US`/USD defaults;
  `business.currency` covers other currencies for structured data.
- **Single page, no nav bar** — the hero's buttons and in-page anchors
  (`#menu`, `#about`, `#contact`) do the navigating.
- **Prices are display strings** (`"$4.25"`, `"from $89"`) so non-numeric
  pricing works; structured data extracts the number automatically.
- **Hours model:** days not listed in `openingHours` are shown/treated as
  closed. Times are 24-hour `"HH:MM"`, displayed as 12-hour AM/PM.
- **Hero is a gradient, not a photo** — deliberate, so the template looks
  finished with zero client assets.
- **`package.json` name is `smallbizz-boilerplate`** (npm forbids capital
  letters, so it can't match the repo folder name exactly).
- The generated `out/` folder and `.env` are gitignored; `og.png` is a
  placeholder gradient meant to be replaced per client.
