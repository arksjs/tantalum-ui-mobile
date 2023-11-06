/**
 * Style
 */
interface UICSS {
  '--ta-color'?: string
  '--ta-dark-color'?: string
  '--ta-light-color'?: string
  '--ta-front-color'?: string
  '--ta-icon-color'?: string
  '--ta-icon-size'?: string
  '--ta-white-color'?: string
  '--ta-black-color'?: string
  '--ta-active-color'?: string
  '--ta-size'?: string
}

/**
 * VUE
 */
import type * as Vue from 'vue'
import { camelCase2KebabCase, objectForEach } from './util'

export interface CSSProperties extends Vue.CSSProperties, UICSS {}

export function CSSProperties2CssText(object: CSSProperties) {
  const arr: string[] = []

  objectForEach(object, (v, k) => {
    const key = camelCase2KebabCase(k)

    arr.push(`${key.indexOf('webkit') === 0 ? `--${key}` : key}: ${v}`)
  })

  return arr.join('; ')
}

/** Returns the ratio of the device's physical pixel resolution to the css pixel resolution */
export function getPixelRatio() {
  return window.devicePixelRatio || 1
}
