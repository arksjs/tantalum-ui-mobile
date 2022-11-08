export interface UIResolverOptions {
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

function getSideEffects(dirName: string, options: UIResolverOptions) {
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

function getPath(options: UIResolverOptions) {
  return `tantalum-ui-mobile/${options.format === 'cjs' ? 'lib' : 'es'}`
}

/**
 * Resolver for Tantalum UI
 *
 * @link https://github.com/arksjs/tantalum-ui-mobile
 */
export function UIResolver(options: UIResolverOptions = {}) {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.startsWith('Ta')) {
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
