import { build } from 'esbuild'
import { execa } from 'execa'
import fs from 'fs'
import vuePlugin from './esbuild-plugin-vue.mjs'
import { getCoreDeps, getJSON, getPath } from './utils.mjs'

const { resolveCore, resolve } = getPath(import.meta.url)

const getDeps = async () => {
  const pkg = await getJSON(resolve('./package.json'))
  return Object.keys(pkg.dependencies).concat(getCoreDeps())
}

const getEntryPoints = async () => {
  const tss = await getFilePaths()

  const entryPoints = {}
  tss.forEach(name => {
    entryPoints[name] = resolveCore(`./src/${name}.ts`)
  })

  return entryPoints
}

const externalPlugin = () => {
  return {
    name: 'external',
    setup(build) {
      // Match an import called "./*" and mark it as external
      build.onResolve({ filter: /^\.\// }, () => ({ external: true }))
      build.onResolve({ filter: /^\.\.\// }, () => ({ external: true }))
    }
  }
}

const buildCompsEsm = async (entryPoints, deps) => {
  await build({
    plugins: [vuePlugin(), externalPlugin()],
    entryPoints: entryPoints,
    external: deps,
    outdir: resolve('./es/'),
    format: 'esm',
    bundle: true,
    target: ['es2019']
  })
}

const buildCompsCjs = async (entryPoints, deps) => {
  await build({
    plugins: [vuePlugin(), externalPlugin()],
    entryPoints: entryPoints,
    external: deps,
    outdir: resolve('./lib/'),
    format: 'cjs',
    bundle: true,
    target: ['es2019']
  })
}

export const getFilePaths = async () => {
  await execa('gulp', [
    'buildFilePathsCache',
    '--gulpfile',
    './build/gulpfile.js'
  ])

  const fileStrPath = resolve('./build/ts-files.txt')
  const fileStr = await fs.promises.readFile(fileStrPath, 'utf-8')

  fs.promises.unlink(fileStrPath)

  return fileStr
    .split(`\n`)
    .filter(function (path) {
      return (
        !['style/index.ts', 'types.ts', '.d.ts', 'umd.ts', '__tests__'].some(
          v => path.includes(v)
        ) && path !== ''
      )
    })
    .map(v => v.replace(/.ts$/, ''))
    .sort()
}

export const buildComps = async () => {
  await buildSrcCompEntry()

  const entryPoints = await getEntryPoints()
  const deps = await getDeps()

  await buildCompsEsm(entryPoints, deps)
  await buildCompsCjs(entryPoints, deps)
}

export const buildSrcCompEntry = async () => {
  const config = await getJSON(resolveCore('./src/components/config.json'))

  // index.ts
  const imports = []
  for (const name of config.components) {
    imports.push(`export { default as Ta${name} } from '../${name}'\n`)
  }

  await fs.promises.writeFile(
    resolveCore('./src/components/index.ts'),
    imports.join(''),
    'utf-8'
  )

  // // install.ts
  // await fs.promises.writeFile(
  //   resolveCore('./src/components/install.ts'),
  //   imports.join('').replace(/default as Ta/g, 'install as '),
  //   'utf-8'
  // )

  // api.ts
  const apiImports = []
  for (const array of config.apis) {
    const name = array.shift()
    apiImports.push(`export { ${array.join(', ')} } from '../${name}'\n`)
  }

  await fs.promises.writeFile(
    resolveCore('./src/components/api.ts'),
    apiImports.join(''),
    'utf-8'
  )
}
