import { siteConfig } from "@/lib/site.config";

/**
 * ServiceMenu — the heart of the page: what the business sells, with prices.
 *
 * It renders `menu` from site.config.ts, which is just categories of
 * {name, description, price} items. That one shape covers a taqueria's
 * "Tacos", a salon's "Color Services", and a mechanic's "Brakes &
 * Suspension" — rename the categories and this component adapts.
 *
 * Active specials get highlighted cards at the top of this section (they
 * also appear in the slim SpecialsBanner at the very top of the page).
 */
export default function ServiceMenu() {
  const { menu, specials } = siteConfig;
  const activeSpecials = specials.filter((s) => s.active);

  return (
    // id="menu" is the anchor target for the hero's "View Menu" button.
    // aria-labelledby ties the section to its heading for screen readers.
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="mx-auto max-w-5xl scroll-mt-8 px-4 py-16 sm:py-24"
    >
      <h2
        id="menu-heading"
        className="text-center text-3xl font-bold tracking-tight sm:text-4xl"
      >
        Menu &amp; Prices
      </h2>

      {/* ── Specials, highlighted ─────────────────────────────────────── */}
      {activeSpecials.length > 0 && (
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {activeSpecials.map((special) => (
            <div
              key={special.title}
              className="rounded-xl border-2 border-accent bg-accent/10 p-5"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                ★ Special
              </span>
              <div className="mt-1 flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-semibold">{special.title}</h3>
                {special.price && (
                  <span className="shrink-0 font-bold text-primary">
                    {special.price}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                {special.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ── The menu itself ───────────────────────────────────────────── */}
      <div className="mt-12 space-y-12">
        {menu.map((category) => (
          <div key={category.name}>
            <h3 className="border-b-2 border-accent pb-2 text-xl font-bold text-primary">
              {category.name}
            </h3>
            {/* A list (not a table) reads naturally on narrow phone screens:
                name + description stack on the left, price hugs the right. */}
            <ul className="mt-2 divide-y divide-neutral-100">
              {category.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-baseline justify-between gap-6 py-4"
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                  <span className="shrink-0 font-semibold text-neutral-800">
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
