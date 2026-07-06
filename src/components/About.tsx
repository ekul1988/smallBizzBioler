import { siteConfig } from "@/lib/site.config";
import { formatDays, formatTime } from "@/lib/format";

/**
 * About — the business's story next to its opening hours.
 *
 * Hours live here (not buried in the footer) because "are they open right
 * now?" is one of the top questions local-business visitors have. The raw
 * config stores 24-hour times and day arrays; the format helpers turn them
 * into friendly "Tue – Thu · 11:00 AM – 9:00 PM" rows.
 */
export default function About() {
  const { business } = siteConfig;

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-8 bg-neutral-50 py-16 sm:py-24"
    >
      <div className="mx-auto grid max-w-5xl gap-12 px-4 md:grid-cols-2">
        {/* Left: the story */}
        <div>
          <h2
            id="about-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            About {business.name}
          </h2>
          <p className="mt-5 leading-relaxed text-neutral-700">
            {business.shortDescription}
          </p>
        </div>

        {/* Right: the hours, as a definition list (days → times) */}
        <div>
          <h3 className="text-xl font-bold">Hours</h3>
          <dl className="mt-4 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white px-5">
            {business.openingHours.map((rule) => (
              <div
                key={rule.days.join()}
                className="flex items-center justify-between gap-4 py-3"
              >
                <dt className="font-medium">{formatDays(rule.days)}</dt>
                <dd className="text-neutral-600">
                  {formatTime(rule.open)} – {formatTime(rule.close)}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm text-neutral-500">
            Days not listed above: closed.
          </p>
        </div>
      </div>
    </section>
  );
}
