import { reactive, watchEffect } from 'vue'
import * as defaultCompiler from 'vue/compiler-sfc'
import type { Store, SFCOptions, StoreState, OutputModes } from '@vue/repl'
import { compileFile, File } from '@vue/repl'
import { utoa, atou } from './utils/encode'
import { showToast } from 'tantalum-ui-mobile'
import { genUnpkgLink } from './utils/link'

const defaultMainFile = 'App.vue'
const uiSetupFile = 'ui-setup.js'
const isDev = import.meta.env.DEV

const coreImports = {
  vue: !isDev ? `./vue.runtime.esm-browser.js` : `./src/vue-dev-proxy`,
  'tantalum-ui-mobile': !isDev
    ? `./ui.esm-browser.js`
    : genUnpkgLink(
        'tantalum-ui-mobile',
        undefined,
        '/dist/index.esm-browser.js'
      )
}

const welcomeCode = `\
<script setup lang='ts'>
/* required start */
import { setupUI } from './${uiSetupFile}'
setupUI()
/* required end */

import { ref } from 'vue'
import { showToast } from 'tantalum-ui-mobile'

const msg = ref('Click!')
const onClick = () => {
  showToast('Hello World!')
}
</script>

<template>
  <ta-button type="primary" @click="onClick">{{ msg }}</ta-button>
</template>
`

const uiReplPluginCode = `\
import TantalumUI from 'tantalum-ui-mobile'
import { getCurrentInstance } from 'vue'

await appendStyle()

export function setupUI() {
  const instance = getCurrentInstance()
  instance.appContext.app.use(TantalumUI)
}

export function appendStyle() {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = '${
      !isDev
        ? `./ui.css`
        : genUnpkgLink('tantalum-ui-mobile', undefined, '/dist/index.css')
    }'
    link.onload = resolve
    link.onerror = reject
    document.body.appendChild(link)
  })
}
`

export class ReplStore implements Store {
  state: StoreState
  compiler = defaultCompiler
  options?: SFCOptions
  initialShowOutput: boolean
  initialOutputMode: OutputModes = 'preview'

  constructor({
    serializedState = '',
    showOutput = false,
    outputMode = 'preview'
  }: {
    serializedState?: string
    showOutput?: boolean
    outputMode?: OutputModes
  }) {
    let files: StoreState['files'] = {}

    if (serializedState) {
      const saved = JSON.parse(atou(serializedState))
      for (const filename of Object.keys(saved)) {
        files[filename] = new File(filename, saved[filename])
      }
    } else {
      files = {
        [defaultMainFile]: new File(defaultMainFile, welcomeCode)
      }
    }

    this.initialShowOutput = showOutput
    this.initialOutputMode = outputMode

    let mainFile = defaultMainFile
    if (!files[mainFile]) {
      mainFile = Object.keys(files)[0]
    }
    this.state = reactive({
      mainFile,
      files,
      activeFile: files[mainFile],
      errors: [],
      vueRuntimeURL: coreImports.vue
    })

    this.initImportMap()

    this.state.files[uiSetupFile] = new File(
      uiSetupFile,
      uiReplPluginCode,
      !isDev
    )

    watchEffect(() => compileFile(this, this.state.activeFile))

    for (const file of Object.values(this.state.files)) {
      compileFile(this, file)
    }
  }

  setActive(filename: string) {
    const file = this.state.files[filename]
    if (file.hidden) return
    this.state.activeFile = this.state.files[filename]
  }

  addFile(fileOrFilename: string | File) {
    const file =
      typeof fileOrFilename === 'string'
        ? new File(fileOrFilename)
        : fileOrFilename
    this.state.files[file.filename] = file
    if (!file.hidden) this.setActive(file.filename)
  }

  deleteFile(filename: string) {
    if (filename === uiSetupFile) {
      showToast('This is TantalumUI setup file.')
      return
    }

    if (confirm(`Are you sure you want to delete ${filename}?`)) {
      if (this.state.activeFile.filename === filename) {
        this.state.activeFile = this.state.files[this.state.mainFile]
      }
      delete this.state.files[filename]
    }
  }

  serialize() {
    return '#' + utoa(JSON.stringify(this.getFiles()))
  }

  getFiles() {
    const exported: Record<string, string> = {}
    for (const file of Object.values(this.state.files)) {
      if (file.hidden) continue
      exported[file.filename] = file.code
    }
    return exported
  }

  async setFiles(newFiles: Record<string, string>, mainFile = defaultMainFile) {
    const files: Record<string, File> = {}
    if (mainFile === defaultMainFile && !newFiles[mainFile]) {
      files[mainFile] = new File(mainFile, welcomeCode)
    }

    for (const [filename, file] of Object.entries(newFiles)) {
      files[filename] = new File(filename, file)
    }

    for (const file of Object.values(files)) {
      await compileFile(this, file)
    }
    this.state.mainFile = mainFile
    this.state.files = files
    this.initImportMap()
    this.setActive(mainFile)
  }

  private initImportMap() {
    const map = this.state.files['import-map.json']
    if (!map) {
      this.state.files['import-map.json'] = new File(
        'import-map.json',
        JSON.stringify(
          {
            imports: coreImports
          },
          null,
          2
        )
      )
    } else {
      try {
        const json = JSON.parse(map.code)
        if (!json.imports.vue) {
          json.imports.vue = coreImports.vue
          map.code = JSON.stringify(json, null, 2)
        }
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }

  getImportMap() {
    try {
      return JSON.parse(this.state.files['import-map.json'].code)
    } catch (e) {
      this.state.errors = [
        `Syntax error in import-map.json: ${(e as Error).message}`
      ]
      return {}
    }
  }
}
