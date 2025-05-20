// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    routes: {
      extend: {
        include: [{ pattern: "/profile/*" }],
        exclude: [
          { pattern: "/_astro/*" },
          { pattern: "/robots.txt" },
          { pattern: "/alt_logo.png" },
          { pattern: "/alt_logo_text.png" },
          { pattern: "/logo.png" },
          { pattern: "/logo_pure.svg" },
          { pattern: "/logo_with_text.svg" },
        ],
      },
    },
  }),

  //https://github.com/withastro/astro/issues/12824 << bane of my existence
  vite: {
    plugins: [tailwindcss()],
  },

  output: "server",
});
