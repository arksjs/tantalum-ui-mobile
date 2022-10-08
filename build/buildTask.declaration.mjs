import { execa } from 'execa'
import fs from 'fs'
import { getPath, getJSON } from './utils.mjs'

const { resolve, resolveCore } = getPath(import.meta.url)

export const buildDeclaration = async () => {
  await buildGlobalDeclaration()
  await execa('vue-tsc', ['--project', './build/tsconfig.declaration.json'])
  await execa('gulp', ['copyDeclaration', '--gulpfile', './build/gulpfile.js'])
}

export const buildGlobalDeclaration = async () => {
  const config = await getJSON(resolveCore('./src/components/config.json'))

  const imports = []

  for (const name of config.components) {
    imports.push(`Ak${name}: typeof import('arkui-mobile-vue/es')['Ak${name}']`)
  }

  const code = `declare module 'vue' {
  export interface GlobalComponents {
    ${imports.join(`\n    `)}
  }
}

export {}
`

  await fs.promises.writeFile(resolve('./global.d.ts'), code, 'utf-8')

  // 同时放到demo一份
  await fs.promises.writeFile(
    resolve('./packages/demo/src/ui.d.ts'),
    code.replace(/arkui-mobile-vue\/es/g, 'arkui-mobile-vue/packages/ui/src'),
    'utf-8'
  )
}
