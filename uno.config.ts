// uno.config.ts
import { defineConfig } from "unocss";
import { presetUno } from "unocss";
import { presetIcons } from "unocss";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import { presetDaisy } from "unocss-preset-daisyui-next";
export default defineConfig({
  presets: [
    presetUno(),
    presetDaisy({
      themes: ["business", "dark", "black", "forest"],
    }),
    presetIcons(),
  ],
  transformers: [transformerVariantGroup()],
});
