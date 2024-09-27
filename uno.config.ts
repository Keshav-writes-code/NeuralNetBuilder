// uno.config.ts
import { defineConfig } from 'unocss'
import { presetUno } from 'unocss'
import { presetDaisy } from 'unocss-preset-daisy'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import presetMini from '@unocss/preset-mini'

export default defineConfig({
  presets: [
    presetUno(),
    presetDaisy({
      themes: ["business", "dark", "black", "forest"],
    }),
    presetMini(),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
})