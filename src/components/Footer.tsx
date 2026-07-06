import { siteConfig } from "@/lib/site.config";

/**
 * Footer — name, address one-liner, social links, copyright.
 *
 * Note: the © year is computed at BUILD time (this is a static export, so
 * there's no server rendering it fresh). Sites get rebuilt whenever content
 * changes, so in practice it stays current; worst case it shows the year
 * of the last deploy.
 */
export default function Footer() {
  const { business } = siteConfig;
  const { address } = business;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-400">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-semibold text-white">{business.name}</p>
          <p className="mt-1 text-sm">
            {address.street}, {address.city}, {address.region}{" "}
            {address.postalCode}
          </p>
        </div>

        {/* Social links render only if the (optional) list exists in config. */}
        {business.socials && business.socials.length > 0 && (
          <ul className="flex gap-5">
            {business.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium transition hover:text-accent"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        <p className="text-sm">
          © {year} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
