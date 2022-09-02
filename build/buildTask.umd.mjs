import fs from 'fs'
import { build } from 'esbuild'
import vuePlugin from './esbuild-plugin-vue.mjs'
import { rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import { getCoreDeps, getPath } from './utils.mjs'

const { resolveCore, resolve } = getPath(import.meta.url)

export const buildEsmBrowser = () =>
  build({
    plugins: [vuePlugin()],
    entryPoints: [resolveCore('./src/index.ts')],
    external: getCoreDeps(),
    outfile: resolve('./dist/index.esm-browser.js'),
    format: 'esm',
    bundle: true,
    target: ['es2019']
  })

const buildUmdEsm = async () => {
  await build({
    plugins: [vuePlugin()],
    entryPoints: [resolveCore('./src/umd.ts')],
    external: getCoreDeps(),
    outfile: resolve('./dist/umd.js'),
    format: 'esm',
    bundle: true,
    target: ['es2015']
  })
}

const buildUmdJs = async () => {
  const inputOptions = {
    input: resolve('./dist/umd.js'),
    external: getCoreDeps(),
    plugins: [
      nodeResolve(),
      commonjs({
        include: 'node_modules/**'
      }),
      terser()
    ]
  }

  const outOptions = {
    name: 'ArkUI',
    format: 'umd',
    file: resolve('./dist/index.js'),
    globals: {
      vue: 'Vue'
    },
    sourcemap: true
  }

  const bundle = await rollup(inputOptions)
  await bundle.write(outOptions)
}

export const buildUmd = async () => {
  await buildUmdEsm()
  await buildUmdJs()
  await fs.promises.unlink('./dist/umd.js')
}
