import { runTask } from './utils.mjs'
import { buildSrcFullStyle } from './buildTask.css.mjs'
import { buildSrcCompEntry } from './buildTask.components.mjs'
import { buildGlobalDeclaration } from './buildTask.declaration.mjs'

const runBuild = async () => {
  await Promise.all([
    runTask('css src', buildSrcFullStyle),
    runTask('component src', buildSrcCompEntry),
    runTask('global declaration', buildGlobalDeclaration)
  ])
}

runBuild()
