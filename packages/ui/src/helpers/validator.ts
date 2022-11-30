import { isObject, isURL, isString } from './util'
import type { AnyObject } from './types'
import { isColorValue } from './color'

export const selectorValidator = (value?: string | HTMLElement | Document) => {
  return (
    isString(value) || value instanceof HTMLElement || value instanceof Document
  )
}

export const createEnumsValidator = (enums: readonly string[]) => {
  return (value: string) => {
    return enums.includes(value)
  }
}

export function getEnumsValue<T extends readonly any[]>(
  enums: T,
  value?: string
): T[number] {
  return enums.includes(value as T[number]) ? (value as T[number]) : enums[0]
}

/**
 * 判断是否svg组件
 * @param value 值
 */
export function isSvgComponent(value: unknown) {
  if (isObject(value)) {
    const obj = value as AnyObject

    if (isString(obj.template) || typeof obj.render === 'function') {
      // vue component
      return true
    } else if (obj.__file && obj.__file.indexOf('.svg') > -1) {
      // vue-svg-loader
      return true
    }
  }

  return false
}

export const iconValidator = (value: unknown) => {
  return (isString(value) && !isURL(value)) || isSvgComponent(value)
}

export const colorValidator = (value: unknown) => {
  return value == null || value === '' || isColorValue(value as string)
}

export const emitFocusValidator = (e: FocusEvent) => e instanceof FocusEvent
export const emitClickValidator = (e: MouseEvent) => e instanceof MouseEvent
export const emitErrorValidator = (e: Error) => e instanceof Error
