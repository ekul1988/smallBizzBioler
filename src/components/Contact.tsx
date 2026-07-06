import { siteConfig } from "@/lib/site.config";
import { telHref } from "@/lib/format";
import ContactForm from "./ContactForm";

/**
 * Contact — how to reach and find the business, plus the message form.
 *
 * This component is a SERVER component (renders to plain HTML at build
 * time); only the interactive <ContactForm> inside it is a client
 * component. Keeping the split here means the address/phone/map link cost
 * zero JavaScript in the visitor's browser.
 */

/** Builds a Google Maps link — exact coordinates when geo is set in the
 *  config, otherwise a search for the street address. No API key needed. */
function mapsUrl(): string {
  const { address, geo } = siteConfig.business;
  const query = geo
    ? `${geo.lat},${geo.lng}`
    : encodeURIComponent(
        `${address.street}, ${address.city}, ${address.region} ${address.postalCode}`,
      );
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export default function Contact() {
  const { business } = siteConfig;
  const { address } = business;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="mx-auto max-w-5xl scroll-mt-8 px-4 py-16 sm:py-24"
    >
      <h2
        id="contact-heading"
        className="text-center text-3xl font-bold tracking-tight sm:text-4xl"
      >
        Find Us
      </h2>

      <div className="mt-10 grid gap-12 md:grid-cols-2">
        {/* ── Left column: address, phone, email, directions ──────────── */}
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-primary">Address</h3>
            {/* <address> is the semantically-correct tag for contact info;
                not-italic undoes the browser's default italics. */}
            <address className="mt-1 not-italic leading-relaxed text-neutral-700">
              {address.street}
              <br />
              {address.city}, {address.region} {address.postalCode}
            </address>
            <a
              href={mapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-semibold text-primary underline underline-offset-4 hover:text-primary/80"
            >
              Get directions →
            </a>
          </div>

          <div>
            <h3 className="font-bold text-primary">Phone</h3>
            <a
              href={telHref(business.phone)}
              className="mt-1 inline-block text-neutral-700 hover:text-primary"
            >
              {business.phone}
            </a>
          </div>

          <div>
            <h3 className="font-bold text-primary">Email</h3>
            <a
              href={`mailto:${business.email}`}
              className="mt-1 inline-block text-neutral-700 hover:text-primary"
            >
              {business.email}
            </a>
          </div>
        </div>

        {/* ── Right column: the message form (client component) ───────── */}
        <ContactForm />
      </div>
    </section>
  );
}
