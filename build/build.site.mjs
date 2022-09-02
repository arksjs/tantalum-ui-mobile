import { runTask } from './utils.mjs'
import { buildDemo, buildDocs, buildPlayground } from './buildTask.site.mjs'

const runBuild = async () => {
  await runTask('docs', buildDocs)
  await Promise.all([
    runTask('playground', buildPlayground),
    runTask('demo', buildDemo)
  ])
}

runBuild()
