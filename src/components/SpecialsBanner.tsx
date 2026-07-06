import { siteConfig } from "@/lib/site.config";

/**
 * SpecialsBanner — a slim promo strip above everything else on the page.
 *
 * It only shows specials with `active: true` in site.config.ts, and renders
 * NOTHING at all when there are none — so clients with no promos get a
 * clean page without touching any component code.
 *
 * (Active specials also appear as bigger cards at the top of ServiceMenu;
 * this strip is just the attention-grabber.)
 */
export default function SpecialsBanner() {
  const activeSpecials = siteConfig.specials.filter((s) => s.active);

  // The whole point: no active specials → no banner, no empty space.
  if (activeSpecials.length === 0) return null;

  return (
    // role="status" politely announces the promo to screen readers without
    // interrupting them mid-sentence.
    <div
      role="status"
      className="bg-accent px-4 py-2 text-center text-sm font-medium text-neutral-900 sm:text-base"
    >
      {activeSpecials
        .map((s) => (s.price ? `${s.title} — ${s.price}` : s.title))
        .join("  •  ")}
    </div>
  );
}
