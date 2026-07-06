import { siteConfig } from "@/lib/site.config";
import { SITE_URL } from "@/lib/env";
import { priceNumber } from "@/lib/format";

/**
 * JsonLd — structured data (schema.org) for local SEO.
 *
 * WHAT this is: a <script type="application/ld+json"> tag containing a
 * machine-readable description of the business. Google reads it to power
 * rich results — the Maps/knowledge panel with hours, phone, and sometimes
 * menu prices. Visitors never see it; search engines love it.
 *
 * Everything is generated from site.config.ts:
 *   - businessType  → the schema.org @type (Restaurant, AutoRepair, …)
 *   - address/geo/phone/hours → LocalBusiness fields
 *   - menu → `hasMenu` for restaurants (Google's restaurant-menu format),
 *            `hasOfferCatalog` (a generic priced service list) otherwise.
 *
 * Validate the output at https://validator.schema.org after customizing.
 */
export default function JsonLd() {
  const { business, menu, seo } = siteConfig;
  const currency = business.currency ?? "USD";

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": business.businessType,
    name: business.name,
    description: business.shortDescription,
    url: SITE_URL,
    telephone: business.phone,
    email: business.email,
    image: `${SITE_URL}${seo.ogImage}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    openingHoursSpecification: business.openingHours.map((rule) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: rule.days, // full day names, exactly what schema.org expects
      opens: rule.open,
      closes: rule.close,
    })),
  };

  // Optional fields — only included when present in the config.
  if (business.geo) {
    data.geo = {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    };
  }
  if (business.socials && business.socials.length > 0) {
    // sameAs links the business's social profiles to this listing.
    data.sameAs = business.socials.map((s) => s.url);
  }

  if (business.businessType === "Restaurant") {
    // Restaurants get schema.org's dedicated Menu format, which Google can
    // surface as an actual menu in search results.
    data.hasMenu = {
      "@type": "Menu",
      hasMenuSection: menu.map((category) => ({
        "@type": "MenuSection",
        name: category.name,
        hasMenuItem: category.items.map((item) => ({
          "@type": "MenuItem",
          name: item.name,
          description: item.description,
          offers: {
            "@type": "Offer",
            price: priceNumber(item.price),
            priceCurrency: currency,
          },
        })),
      })),
    };
  } else {
    // Every other business type gets a generic priced service catalog —
    // the same config data, just wrapped in the schema Google expects
    // for services instead of food.
    data.hasOfferCatalog = {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: menu.map((category) => ({
        "@type": "OfferCatalog",
        name: category.name,
        itemListElement: category.items.map((item) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: item.name,
            description: item.description,
          },
          price: priceNumber(item.price),
          priceCurrency: currency,
        })),
      })),
    };
  }

  return (
    // dangerouslySetInnerHTML is the standard way to embed JSON-LD. The
    // content comes from our own typed config — but we still escape "<" so
    // a config string containing "</script>" could never break out of the
    // tag (JSON parsers read < as a normal "<").
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
