// astro.config.ts
import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

export default defineConfig({
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
    svelte(),
    // tailwind(),
    icon(),
  ],
  site: "https://Keshav-writes-code.github.io",
  base: "NeuralNetBuilder",
});
