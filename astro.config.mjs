// astro.config.ts
import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";
import svelte from "@astrojs/svelte";
import icon from "astro-icon";

export default defineConfig({
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
    svelte(),
    icon(),
  ],
  site: "https://Keshav-writes-code.github.io",
  base: "NeuralNetBuilder",
});
