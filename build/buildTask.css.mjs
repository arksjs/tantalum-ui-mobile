import { rollup } from 'rollup'
import { execa } from 'execa'
import fs from 'fs'
import { getPath } from './utils.mjs'
import typescript from '@rollup/plugin-typescript'

const { resolveCore } = getPath(import.meta.url)

const replaceImportToSassImport = () => {
  return {
    name: 'replaceImportToSassImport',
    renderChunk(code) {
      return code.replace(/import/g, '@import')
    }
  }
}

const buildIndexScss = async () => {
  const bundle = await rollup({
    input: resolveCore('./src/style/index.ts'),
    external: id => {
      if (id.indexOf('.scss') !== -1) {
        return true
      }
      return false
    },
    plugins: [replaceImportToSassImport(), typescript()]
  })

  await bundle.write({
    format: 'esm',
    file: resolveCore('./src/style/index.scss')
  })
}

const buildIndex = async () => {
  const fileStrPath = './build/style-files.txt'
  const fileStr = await fs.promises.readFile(fileStrPath, 'utf-8')

  fs.promises.unlink(fileStrPath)

  const paths = fileStr
    .split(`\n`)
    .filter(function (path) {
      return path.indexOf('style') !== 0 && path !== ''
    })
    .map(v => v.replace(/.[jt]s$/, ''))
    .sort()
    .map(v => `import '../${v}'`)

  await fs.promises.writeFile(
    resolveCore('./src/style/index.ts'),
    paths.join(`\n`) + `\n`,
    'utf-8'
  )
}

export const buildSrcFullStyle = async () => {
  await execa('gulp', [
    'buildStyleImportFilePathsCache',
    '--gulpfile',
    './build/gulpfile.js'
  ])
  await buildIndex()
  await buildIndexScss()
}

export const buildCss = async () => {
  // src full
  await buildSrcFullStyle()

  // lib es sass index.js sass.js
  await execa('gulp', ['build', '--gulpfile', './build/gulpfile.js'])

  // dist/index.css
  await execa('gulp', ['compressCss', '--gulpfile', './build/gulpfile.js'])
}
