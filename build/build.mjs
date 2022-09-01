import { runTask } from './utils.mjs'
import { buildCss } from './buildTask.css.mjs'
import { buildDeclaration } from './buildTask.declaration.mjs'
import { buildComps } from './buildTask.components.mjs'
import { buildEsmBrowser, buildUmd } from './buildTask.umd.mjs'

const runBuild = async () => {
  await Promise.all([
    [
      runTask('css', buildCss),
      runTask('declaration', buildDeclaration),
      runTask('components', buildComps),
      runTask('esm-browser', buildEsmBrowser),
      runTask('umd', buildUmd)
    ]
  ])
}

runBuild()
