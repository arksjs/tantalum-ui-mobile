import { build } from 'esbuild'

const entryPoints = ['./src/index.ts']

export const buildEsm = () =>
  build({
    entryPoints,
    outfile: 'lib/index.esm.js',
    format: 'esm',
    bundle: true,
    target: ['es2015']
  })

export const buildCjs = () =>
  build({
    entryPoints,
    outfile: 'lib/index.js',
    format: 'cjs',
    bundle: true,
    target: ['es2015']
  })

const runBuild = async () => {
  await Promise.all([buildEsm(), buildCjs()])
}

runBuild()
