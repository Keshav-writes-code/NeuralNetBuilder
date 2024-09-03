// astro.config.ts
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import { presetUno } from 'unocss'
import {presetDaisy} from 'unocss-preset-daisy'
import svelte from '@astrojs/svelte';

export default defineConfig({
    integrations: [
        UnoCSS({
            presets: [
                presetUno(),
                presetDaisy()
            ],
            injectReset: true // or a path to the reset file
        }),
        svelte()
    ],
    site: 'https://Keshav-writes-code.github.io',
    base: 'NeuralNetBuilder',    
})
