export interface ArkUIResolverOptions {
  /**
   * import style css or sass along with components
   *
   * @default true
   */
  importStyle?: boolean | 'css' | 'sass'
  /**
   * use commonjs lib or es module
   *
   * @default "esm"
   */
  format?: 'esm' | 'cjs'
}

function getSideEffects(dirName: string, options: ArkUIResolverOptions) {
  const { importStyle = true } = options
  const path = getPath(options)

  if (importStyle === 'sass') {
    return `${path}/${dirName}/style/sass`
  }

  if (importStyle === 'css' || importStyle === true) {
    return `${path}/${dirName}/style/index`
  }

  return
}

function getPath(options: ArkUIResolverOptions) {
  return `arkui-mobile-vue/${options.format === 'cjs' ? 'lib' : 'es'}`
}

/**
 * Resolver for ArkUI
 *
 * @link https://github.com/arksjs/arkui-mobile-vue
 */
export function ArkUIResolver(options: ArkUIResolverOptions = {}) {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.startsWith('Ak')) {
        const partialName = name.slice(2)
        return {
          importName: partialName,
          path: getPath(options),
          sideEffects: getSideEffects(partialName, options)
        }
      }
    }
  }
}
