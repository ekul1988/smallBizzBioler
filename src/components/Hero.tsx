import { siteConfig } from "@/lib/site.config";
import { telHref } from "@/lib/format";

/**
 * Hero — the big banner at the top of the page.
 *
 * WHY a gradient instead of a photo: it looks polished with zero assets, so
 * the template works before the client sends any photography. To use a photo
 * instead, drop it in /public and swap the gradient classes on <header> for
 * something like: bg-[url('/hero.jpg')] bg-cover bg-center.
 *
 * The two buttons cover the two things a local-business visitor wants:
 * "what do you sell?" (scroll to menu) and "let me call you" (tap-to-call).
 */
export default function Hero() {
  const { business } = siteConfig;

  return (
    // <header> (not <div>) tells search engines this is the page masthead.
    <header className="bg-gradient-to-br from-primary via-primary to-primary/80 text-white">
      <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:py-28">
        {/* Tagline sits above the name in soft white. (Not the accent color:
            small accent-on-primary text fails WCAG contrast for many
            palettes — accent is reserved for the CTA button, where dark
            text sits on it.) */}
        <p className="text-sm font-semibold uppercase tracking-widest text-white/80 sm:text-base">
          {business.tagline}
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">
          {business.name}
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          {business.shortDescription}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {/* Primary call-to-action: jump to the menu section below. */}
          <a
            href="#menu"
            className="rounded-full bg-accent px-7 py-3 font-semibold text-neutral-900 shadow-lg transition hover:brightness-110"
          >
            View Menu &amp; Prices
          </a>
          {/* Secondary CTA: tap-to-call on phones, click-to-call on desktop. */}
          <a
            href={telHref(business.phone)}
            className="rounded-full border border-white/40 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Call {business.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
