import { isObject, isURL, isString } from './util'
import type { AnyObject } from './types'
import { isColorValue } from './color'

interface Validator<T = unknown> {
  (value: T): boolean
}

export const selectorValidator: Validator = value => {
  return (
    isString(value) || value instanceof HTMLElement || value instanceof Document
  )
}

export const createEnumsValidator = (enums: readonly string[]) => {
  const validator: Validator<string> = value => {
    return enums.includes(value)
  }

  return validator
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

export const iconValidator: Validator = value => {
  return (isString(value) && !isURL(value)) || isSvgComponent(value)
}

export const colorValidator: Validator = value => {
  return value == null || value === '' || isColorValue(value as string)
}

export const emitFocusValidator = (e: FocusEvent) => e instanceof FocusEvent
export const emitClickValidator = (e: MouseEvent) => e instanceof MouseEvent
export const emitErrorValidator = (e: Error) => e instanceof Error

export const createListValidator = <T>(itemValidator: (item: T) => boolean) => {
  const validator = (value: unknown) => {
    if (Array.isArray(value)) {
      return (
        value.filter(v => {
          return !itemValidator(v as T)
        }).length === 0
      )
    }
    return false
  }

  return validator as (payload: T[]) => boolean
}
