import type { SiteConfig } from "./types";

/**
 * ════════════════════════════════════════════════════════════════════
 *  SITE CONFIG — THE ONLY FILE YOU EDIT TO SPIN UP A NEW CLIENT
 * ════════════════════════════════════════════════════════════════════
 *
 * Every component on the page reads from this object. Nothing
 * business-specific is hardcoded anywhere else. To launch a new client:
 *
 *   1. Replace the values below with the client's real info.
 *   2. Change theme.primaryColor / accentColor to their brand colors.
 *   3. Drop their social-share image into /public and point seo.ogImage at it.
 *   4. `npm run build` — done.
 *
 * The demo data below is a fictional taqueria so the template looks real
 * out of the box. All types are defined (and documented) in ./types.ts.
 */
export const siteConfig: SiteConfig = {
  business: {
    name: "El Camino Taqueria",
    tagline: "Real street tacos, made fresh daily",
    shortDescription:
      "El Camino is a family-run taqueria in downtown Worcester serving " +
      "handmade tortillas, slow-roasted meats, and agua frescas since 2012. " +
      "Order at the counter, grab a seat, and we'll bring it out hot.",

    // Picks the schema.org type for structured data. Options:
    // 'Restaurant' | 'AutoRepair' | 'HealthAndBeautyBusiness' | 'DaySpa' | 'LocalBusiness'
    businessType: "Restaurant",

    phone: "(508) 555-0134",
    email: "hola@elcaminotaqueria.com",
    address: {
      street: "214 Main Street",
      city: "Worcester",
      region: "MA",
      postalCode: "01608",
      country: "US",
    },
    // Optional but great for local SEO. Right-click the spot in Google Maps
    // and click the coordinates to copy them. Delete this field if unknown.
    geo: { lat: 42.2626, lng: -71.8023 },

    // Days not listed anywhere = closed (Mondays, in this demo).
    // Times are 24-hour "HH:MM"; they're formatted as "11:00 AM" on the page.
    openingHours: [
      { days: ["Tuesday", "Wednesday", "Thursday"], open: "11:00", close: "21:00" },
      { days: ["Friday", "Saturday"], open: "11:00", close: "22:00" },
      { days: ["Sunday"], open: "11:00", close: "20:00" },
    ],

    // Optional — delete the whole array if the client has no socials.
    socials: [
      { label: "Instagram", url: "https://instagram.com/elcaminotaqueria" },
      { label: "Facebook", url: "https://facebook.com/elcaminotaqueria" },
    ],

    currency: "USD",
  },

  /**
   * THEME — the whole restyle lives in these three lines.
   * primaryColor: main brand color. Keep it DARK (white text goes on it).
   * accentColor:  highlight for CTAs/badges. Keep it BRIGHT (dark text goes on it).
   * fontFamily:   any CSS font stack. See README for adding a Google font.
   */
  theme: {
    primaryColor: "#9a3412", // terracotta
    accentColor: "#f59e0b", // amber
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
  },

  /**
   * SPECIALS — active ones show in the banner at the very top of the page
   * AND as highlighted cards at the top of the menu. Flip `active` to
   * false instead of deleting, so seasonal promos are easy to re-run.
   */
  specials: [
    {
      title: "Taco Tuesday",
      description: "All street tacos $2.50 each, every Tuesday, all day.",
      price: "$2.50",
      active: true,
    },
    {
      title: "Free Horchata Friday",
      description: "Free small horchata with any burrito, Fridays after 4 PM.",
      active: true,
    },
    {
      // Example of a paused special — flip `active: true` to bring it back.
      title: "Pozole Weekend",
      description: "Slow-simmered pozole rojo, weekends only while it lasts.",
      price: "$11.00",
      active: false,
    },
  ],

  /**
   * MENU — categories of priced items. The same structure works for
   * restaurant sections, salon services, or mechanic services:
   * just rename the categories and items.
   */
  menu: [
    {
      name: "Tacos",
      items: [
        {
          name: "Al Pastor",
          description: "Marinated pork, grilled pineapple, cilantro, onion.",
          price: "$4.25",
        },
        {
          name: "Carnitas",
          description: "Slow-roasted pork, salsa verde, pickled red onion.",
          price: "$4.25",
        },
        {
          name: "Baja Fish",
          description: "Beer-battered cod, cabbage slaw, chipotle crema.",
          price: "$5.50",
        },
        {
          name: "Rajas con Crema",
          description: "Roasted poblanos, corn, and crema (vegetarian).",
          price: "$4.00",
        },
      ],
    },
    {
      name: "Burritos & Bowls",
      items: [
        {
          name: "Mission Burrito",
          description: "Your choice of meat, rice, beans, cheese, salsa, guac.",
          price: "$12.50",
        },
        {
          name: "Carne Asada Bowl",
          description: "Grilled steak over cilantro-lime rice with black beans.",
          price: "$13.00",
        },
        {
          name: "Veggie Bowl",
          description: "Rajas, sweet potato, black beans, queso fresco.",
          price: "$11.00",
        },
      ],
    },
    {
      name: "Sides & Drinks",
      items: [
        {
          name: "Chips & Guacamole",
          description: "Made to order, with tomatillo salsa.",
          price: "$6.50",
        },
        {
          name: "Elote",
          description: "Grilled street corn, cotija, chile-lime mayo.",
          price: "$5.00",
        },
        {
          name: "Horchata",
          description: "House-made cinnamon rice milk.",
          price: "$4.00",
        },
        {
          name: "Jarritos",
          description: "Assorted Mexican sodas.",
          price: "$3.00",
        },
      ],
    },
  ],

  /**
   * SEO — what Google and social shares display.
   * metaTitle: aim for "Business | What + Where" under ~60 chars.
   * metaDescription: the pitch under the Google link, under ~160 chars.
   * ogImage: 1200×630 image in /public shown when the site is shared.
   */
  seo: {
    metaTitle: "El Camino Taqueria | Street Tacos in Worcester, MA",
    metaDescription:
      "Family-run taqueria in downtown Worcester. Handmade tortillas, " +
      "slow-roasted meats, agua frescas. Open Tue–Sun on Main Street.",
    ogImage: "/og.png",
  },
};
