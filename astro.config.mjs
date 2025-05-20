// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),

  //https://github.com/withastro/astro/issues/12824 << bane of my existence
  vite: {
    plugins: [tailwindcss()],
  },

  output: "server",
});
