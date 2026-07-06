import SpecialsBanner from "@/components/SpecialsBanner";
import Hero from "@/components/Hero";
import ServiceMenu from "@/components/ServiceMenu";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

/**
 * page.tsx — the entire site is this one page.
 *
 * It's intentionally just a stack of components: all content lives in
 * src/lib/site.config.ts and each component pulls what it needs from
 * there. To reorder the page, reorder these lines; to drop a section,
 * delete a line. No props are passed because there's exactly one source
 * of truth and every component reads it directly.
 */
export default function Home() {
  return (
    <>
      {/* Slim promo strip — renders nothing when no specials are active. */}
      <SpecialsBanner />

      {/* Big branded banner with name, tagline, and call-to-action buttons. */}
      <Hero />

      {/* <main> wraps the page's core content — helps screen readers and SEO. */}
      <main>
        <ServiceMenu /> {/* what we sell, with prices (#menu) */}
        <About /> {/* the story + opening hours (#about) */}
        <Contact /> {/* address, phone, map link, message form (#contact) */}
      </main>

      <Footer />
    </>
  );
}
