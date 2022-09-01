import fs from 'fs'
import url from 'url'
import path from 'path'
import ora from 'ora'

export const runTask = async (taskName, task) => {
  const start = Date.now()
  const s = ora().start(`Building ${taskName}`)
  try {
    await task()
    s.succeed(`Build ${taskName} successed!(${Date.now() - start}ms)`)
  } catch (e) {
    s.fail(`Build ${taskName} failed!`)
    console.error(e.toString())
  }
}

export const getPath = importUrl => {
  const __filename = url.fileURLToPath(importUrl)
  const __dirname = path.dirname(__filename)
  const resolve = p => path.resolve(process.cwd(), p)
  const resolveCore = p => path.resolve(process.cwd(), './packages/ui', p)

  return { __filename, __dirname, resolve, resolveCore }
}

export const getJSON = async filePath => {
  const str = await fs.promises.readFile(filePath)
  return JSON.parse(str)
}

export const getCoreDeps = () => ['vue']
