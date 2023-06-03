import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import svgSprites from 'rollup-plugin-svg-sprites'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgSprites({
      vueComponent: true,
      exclude: ['node_modules/**']
    })
  ],
  css: {
    postcss: {
      plugins: [autoprefixer()]
    }
  },
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('../ui/src', import.meta.url))
    }
  },
  build: {
    outDir: fileURLToPath(new URL('../docs/docs/.vitepress/dist/demo', import.meta.url))
  }
})
