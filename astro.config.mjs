// astro.config.ts
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

import svelte from '@astrojs/svelte';

export default defineConfig({
    integrations: [
        UnoCSS({
            injectReset: true // or a path to the reset file
        }),
        svelte()
    ],
    site: 'https://Keshav-writes-code.github.io',
    base: 'NeuralNetBuilder',    
})
