import fs from 'fs'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'

function copyVuePlugin(): Plugin {
  return {
    name: 'copy-vue',
    generateBundle() {
      const filePath = path.resolve(
        __dirname,
        './node_modules/vue/dist/vue.runtime.esm-browser.js'
      )
      if (!fs.existsSync(filePath)) {
        throw new Error(
          `vue.runtime.esm-browser.js not built. ` +
            `Run "nr build vue -f esm-browser" first.`
        )
      }
      this.emitFile({
        type: 'asset',
        fileName: 'vue.runtime.esm-browser.js',
        source: fs.readFileSync(filePath, 'utf-8')
      })
    }
  }
}

function copyUIPlugin(): Plugin {
  return {
    name: 'copy-ui',
    generateBundle() {
      const jsPath = path.resolve(__dirname, '../../dist/index.esm-browser.js')
      if (!fs.existsSync(jsPath)) {
        throw new Error(
          `index.esm-browser.js not built. Run "pnpm build" first.`
        )
      }
      this.emitFile({
        type: 'asset',
        fileName: 'ui.esm-browser.js',
        source: fs.readFileSync(jsPath, 'utf-8')
      })

      this.emitFile({
        type: 'asset',
        fileName: 'ui.css',
        source: fs.readFileSync(
          path.resolve(__dirname, '../../dist/index.css'),
          'utf-8'
        )
      })
    }
  }
}

export default defineConfig(async () => {
  return {
    base: './',
    plugins: [vue(), copyVuePlugin(), copyUIPlugin()],
    build: {
      outDir: '../docs/docs/.vitepress/dist/playground'
    },
    resolve: {
      alias: [
        {
          find: 'tantalum-ui-mobile',
          replacement: path.resolve('../../')
        }
      ]
    }
  }
})
