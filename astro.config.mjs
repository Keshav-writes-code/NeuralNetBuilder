// TODO: Find out a wauy to have site and base params work with tauri
// astro.config.ts
import { defineConfig } from "astro/config";
import UnoCSS from "unocss/astro";
import svelte from "@astrojs/svelte";

export default defineConfig({
  integrations: [
    UnoCSS({
      injectReset: true,
    }),
    svelte(),
  ],
  site: "https://Keshav-writes-code.github.io",
  base: "NeuralNetBuilder",
});
