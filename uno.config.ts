// uno.config.ts
import { defineConfig } from 'unocss'
import { presetUno } from 'unocss'
import { presetDaisy } from 'unocss-preset-daisy'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export default defineConfig({
  presets: [
    presetUno(),
    presetDaisy()
  ],
  transformers: [
    transformerVariantGroup(),
  ],
})