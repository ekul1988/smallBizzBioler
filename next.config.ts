import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "Static export" mode: `npm run build` renders every page to plain
  // HTML/CSS/JS in the `out/` folder. There is NO Node.js server at runtime,
  // which is what lets us host this for free on Cloudflare Pages.
  output: "export",

  // next/image's on-the-fly optimizer needs a server, and we don't have one.
  // With `unoptimized: true` images are served exactly as the files you put
  // in /public — so pre-resize/compress them yourself (e.g. squoosh.app).
  images: { unoptimized: true },

  // Emit routes as `route/index.html` so plain file hosts (Cloudflare Pages)
  // serve clean URLs without extra redirect rules.
  trailingSlash: true,
};

export default nextConfig;
