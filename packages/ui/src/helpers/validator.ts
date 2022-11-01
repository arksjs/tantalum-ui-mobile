import {
  isObject,
  isStringNumberMixArray,
  isNumber,
  isURL,
  isNumeric,
  isStringArray,
  isString
} from './util'
import { getSizeValue } from './dom'
import type { AnyObject, EmptyObject, Validator } from './types'
import { isColorValue } from './color'

export const selectorValidator: Validator = value => {
  return (
    typeof value === 'string' ||
    value instanceof HTMLElement ||
    value instanceof Document
  )
}

export const stringOrStringArrayValidator: Validator = value => {
  return !!(isStringArray(value) || isString(value))
}

export const stringNumberArrayMixValidator: Validator = value => {
  return (
    isStringNumberMixArray(value) ||
    typeof value === 'string' ||
    isNumber(value)
  )
}

export const sizeValidator: Validator<number | string> = value => {
  return getSizeValue(value, Infinity) !== Infinity
}

export const createEnumsValidator = (enums: string[]) => {
  const validator: Validator<string> = value => {
    return enums.includes(value)
  }

  return validator
}

export function getEnumsValue<T = string>(enums: T[], value?: unknown): T {
  return enums.includes(value as T) ? (value as T) : enums[0]
}

/**
 * 判断是否svg组件
 * @param value 值
 */
export function isSvgComponent(value: unknown) {
  if (isObject(value)) {
    const obj = value as AnyObject

    if (typeof obj.template === 'string' || typeof obj.render === 'function') {
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
  return (typeof value === 'string' && !isURL(value)) || isSvgComponent(value)
}

export const numberValidator: Validator<number | string> = value =>
  isNumeric(value)

export const colorValidator: Validator = value => {
  return value == null || value === '' || isColorValue(value as string)
}

export const emitEventValidator = (e: Event) => e instanceof Event
export const emitClickValidator = (e: MouseEvent) => e instanceof MouseEvent

export const emitErrorValidator = (e: Error) => e instanceof Error

export const emitTypeValidator = (payload: { type: string }) =>
  payload && typeof payload.type === 'string'

export const emitEmptyValidator = (payload: EmptyObject) => !!payload

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
