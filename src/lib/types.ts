/**
 * types.ts — TypeScript shapes for everything in `site.config.ts`.
 *
 * WHY this file exists: every piece of client-editable content is typed, so
 * when you customize `site.config.ts` for a new client your editor
 * autocompletes the field names and the build fails loudly on typos —
 * instead of silently shipping a broken page.
 *
 * You should rarely need to touch this file. Edit `site.config.ts` instead.
 */

/**
 * Chooses the schema.org `@type` emitted in the structured data
 * (see components/JsonLd.tsx). Pick the closest match for the client;
 * "LocalBusiness" is the safe catch-all when nothing else fits.
 */
export type BusinessType =
  | "Restaurant"
  | "AutoRepair"
  | "HealthAndBeautyBusiness" // salons, barbers, nail studios
  | "DaySpa" // spas, massage
  | "LocalBusiness"; // generic fallback

/** Full day names — these match what schema.org expects, verbatim. */
export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface Address {
  street: string;
  city: string;
  /** State / province, e.g. "MA" */
  region: string;
  postalCode: string;
  /** Two-letter country code, e.g. "US" */
  country: string;
}

/** Latitude/longitude — improves local-SEO structured data and the map link. */
export interface Geo {
  lat: number;
  lng: number;
}

/**
 * One opening-hours rule. Days a rule doesn't cover are treated as closed,
 * so "closed Mondays" just means: don't list Monday anywhere.
 */
export interface OpeningHoursRule {
  /** Which days this rule covers, e.g. ["Tuesday", "Wednesday", "Thursday"] */
  days: Weekday[];
  /** 24-hour "HH:MM", e.g. "11:00" */
  open: string;
  /** 24-hour "HH:MM", e.g. "21:00" */
  close: string;
}

export interface SocialLink {
  /** Display text, e.g. "Instagram" */
  label: string;
  url: string;
}

export interface Business {
  name: string;
  /** Short punchy line shown above the name in the hero */
  tagline: string;
  /** 1–3 sentences used in the hero and the About section */
  shortDescription: string;
  businessType: BusinessType;
  /** Human-readable; the code strips formatting for tel: links automatically */
  phone: string;
  email: string;
  address: Address;
  geo?: Geo;
  openingHours: OpeningHoursRule[];
  socials?: SocialLink[];
  /** ISO currency code for structured-data prices. Defaults to "USD". */
  currency?: string;
}

/**
 * Per-client look & feel. These become CSS variables in layout.tsx, which
 * Tailwind exposes as `bg-primary`, `text-accent`, `font-sans`, etc.
 * Restyling a client = changing two hex codes here.
 */
export interface Theme {
  /** Main brand color. Pick something DARK — white text sits on top of it. */
  primaryColor: string;
  /** Highlight color for CTAs/badges. Pick something LIGHT/bright — dark text sits on it. */
  accentColor: string;
  /** A CSS font-family stack (see README for using a custom Google font) */
  fontFamily: string;
}

/**
 * A time-limited promotion. Only specials with `active: true` render —
 * flip the flag instead of deleting, so seasonal deals are easy to re-run.
 */
export interface Special {
  title: string;
  description: string;
  /** Display string, e.g. "$2.50" or "20% off" — optional */
  price?: string;
  active: boolean;
}

/** One line on the menu / price list. */
export interface MenuItem {
  name: string;
  description: string;
  /** Display string, e.g. "$4.25" or "from $89" */
  price: string;
}

/**
 * One section of the menu. The same structure covers a taqueria's "Tacos",
 * a salon's "Color Services", and a mechanic's "Brakes & Suspension".
 */
export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface Seo {
  /** Browser-tab + Google result title. Keep under ~60 characters. */
  metaTitle: string;
  /** Google result snippet. Keep under ~160 characters. */
  metaDescription: string;
  /** Path (in /public) to the social-share image, ideally 1200×630 */
  ogImage: string;
}

/** The single object exported by site.config.ts. */
export interface SiteConfig {
  business: Business;
  theme: Theme;
  specials: Special[];
  menu: MenuCategory[];
  seo: Seo;
}
