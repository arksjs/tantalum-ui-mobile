import {
  isObject,
  isURL,
  isString,
  type AnyObject,
  type UnionToIntersection
} from './util'
import { isColorValue } from './color'

export type VoidFnToBooleanFn<VoidFn> = VoidFn extends (
  ...args: infer Args
) => void
  ? (...args: Args) => boolean
  : never

export type FnArgs<Fn> = Fn extends (...any: infer Args) => any ? Args : never

export type OnEventToEvent<S extends string> = S extends `onUpdate${infer Rest}`
  ? `update:${Uncapitalize<Rest>}`
  : S extends `on${infer Rest}`
  ? Uncapitalize<Rest>
  : S
export type EventToOnEvent<S extends string> = S extends `update:${infer Rest}`
  ? `onUpdate${Capitalize<Rest>}`
  : `on${Capitalize<S>}`

type ObjectEmitsOptions = Record<string, ((...args: any[]) => any) | null>

export type PropsToEmits<P> = Required<P> extends infer T
  ? T extends ObjectEmitsOptions
    ? {
        [K in string &
          OnEventToEvent<
            string & keyof Required<T>
          >]: T[EventToOnEvent<K>] extends null
          ? never
          : VoidFnToBooleanFn<T[EventToOnEvent<K>]>
      } extends infer E
      ? E extends {
          change: (...args: any[]) => any
          [x: string]: (...args: any[]) => any
        }
        ? E & {
            'update:modelValue': E['change'] extends (
              arg: infer Arg0,
              ...rest: any[]
            ) => boolean
              ? (value: Arg0) => boolean
              : never
          }
        : E
      : Record<string, never>
    : Record<string, never>
  : Record<string, never>

export type EmitFn<
  Options,
  Event extends keyof Options = keyof Options
> = UnionToIntersection<
  {
    [key in Event]: Options[key] extends (...args: infer Args) => any
      ? (event: key, ...args: Args) => void
      : (event: key, ...args: any[]) => void
  }[Event]
>

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
