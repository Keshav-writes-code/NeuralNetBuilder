// uno.config.ts
import { defineConfig } from "unocss";
import { presetWind3 } from "unocss";
import { presetIcons } from "unocss";
import { transformerVariantGroup } from "unocss";
import { presetDaisy } from "unocss-preset-daisyui-next";
export default defineConfig({
  presets: [
    presetWind3(),
    presetDaisy({
      themes: ["business", "dark", "black", "forest"],
    }),
    presetIcons(),
  ],
  transformers: [transformerVariantGroup()],
});
