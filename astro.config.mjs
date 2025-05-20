// @ts-check
import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  integrations: [react()],

  //https://github.com/withastro/astro/issues/12824 << bane of my existence
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["react-dom"], // possibly a fix for Cloudflare
    },
    resolve: {
      alias: {
        "react-dom/server": "react-dom/server.edge",
      },
    },
  },

  output: "server",
});
