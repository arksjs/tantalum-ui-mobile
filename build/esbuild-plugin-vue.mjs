import path from 'path'
import fs from 'fs'
import md5 from 'md5'
import { parse, compileTemplate, compileScript, rewriteDefault } from 'vue/compiler-sfc'

const VuePlugin = () => {
  return {
    name: 'vue',
    setup(build) {
      const absPath = path.resolve(process.cwd(), build.initialOptions.absWorkingDir || '')

      const resolvePath = (p, resolveDir) => {
        if (p.startsWith('.')) {
          return path.resolve(resolveDir, p)
        }
        if (p.startsWith(absPath + '/')) {
          return p
        }
        return path.join(absPath, p)
      }

      build.onResolve({ filter: /\.vue$/ }, args => {
        return {
          path: args.path,
          namespace: 'vue',
          pluginData: { resolveDir: args.resolveDir }
        }
      })

      build.onLoad({ filter: /\.vue$/, namespace: 'vue' }, async args => {
        const { resolveDir } = args.pluginData
        const filePath = resolvePath(args.path, resolveDir)
        const content = await fs.promises.readFile(filePath, 'utf8')
        const sfc = parse(content)
        const { script, scriptSetup, template } = sfc.descriptor
        const isTS = script?.lang === 'ts' || scriptSetup?.lang === 'ts'
        const id = md5(filePath)

        let contents = ``
        let scriptContent = 'export default {}'

        if (scriptSetup) {
          scriptContent = compileScript(sfc.descriptor, {
            id
          }).content
        } else if (script) {
          scriptContent = script.content
        }
        contents += rewriteDefault(scriptContent, '_sfc_script')

        if (template) {
          contents += `
            ${
              compileTemplate({
                id,
                source: template.content,
                filename: filePath,
                isProd: process.env.NODE_ENV === 'production' || process.env.BUILD === 'production',
                slotted: sfc.descriptor.slotted
              }).code
            }`

          contents += `
          _sfc_script.render = render
          _sfc_script.__file = '${path.relative(absPath, filePath).replace(/\\/g, '/')}'
          `
        }

        contents += `
          export { _sfc_script as default }
          `

        return {
          contents,
          resolveDir,
          loader: isTS ? 'ts' : 'js'
        }
      })
    }
  }
}

export default VuePlugin
