/**
 * '123' -> "1" | "2" | "3"
 */
type StringToUnion<T extends string> = T extends `${infer First}${infer Rest}`
  ? First | StringToUnion<Rest>
  : never

/**
 * 所有大写字母联合
 */
type UpperCases = StringToUnion<'ABCDEFGH'> | StringToUnion<'IJKLMNOPQRSTUVXYZ'>

/**
 * for-bar-baz -> forBarBaz
 */
type ConcatDash<S extends string> = `-${S}`
export type CamelCase<S extends string> =
  S extends `${infer L}-${infer M}${infer R}`
    ? M extends '-'
      ? `${L}-${CamelCase<ConcatDash<R>>}`
      : M extends Uppercase<M>
      ? `${L}-${M}${CamelCase<R>}`
      : `${L}${Uppercase<M>}${CamelCase<R>}`
    : S

/**
 * FooBarBaz -> for-bar-baz
 */
type Split<S extends string> = S extends `${infer L}${infer R}`
  ? L extends UpperCases
    ? L extends Uppercase<L>
      ? `-${Lowercase<L>}${Split<R>}`
      : `${L}${Split<R>}`
    : `${L}${Split<R>}`
  : S
type DelFirst<T extends string, U extends string> = T extends `-${string}`
  ? U
  : U extends `-${infer R}`
  ? R
  : U
export type KebabCase<T extends string> = DelFirst<T, Split<T>>

export type UniqueID = number | string

/**
 * Style
 */
interface AkCSS {
  '--ak-color'?: string
  '--ak-dark-color'?: string
  '--ak-light-color'?: string
  '--ak-front-color'?: string
  '--ak-icon-color'?: string
  '--ak-icon-size'?: string
  '--ak-white-color'?: string
  '--ak-black-color'?: string
  '--ak-active-color'?: string
  '--ak-size'?: string
}

export type { default as TypeException } from './exception'
import type { default as TypeException } from './exception'

export type { Dayjs } from 'dayjs'

export type AnyObject = Record<string, any>
export type EmptyObject = Record<string, never>

export type ViewPosition = 'start' | 'center' | 'end' | 0 | 0.5 | 1

export interface Validator<T = unknown> {
  (value: T): boolean
}

export type Selector = HTMLElement | string

/**
 * 事件
 */
export interface LongPressEventCallback {
  (res: { type: 'long-press' | 'click' }): void
}

export type EasingType = 'linear' | 'swing'

export interface Noop {
  (): void
}

export type PlacementType = 'bottom' | 'top' | 'left' | 'right'
export type StateType = 'default' | 'primary' | 'success' | 'warning' | 'danger'
export type SizeType = 'large' | 'middle' | 'small'

export type UnionToIntersection<T> = (
  T extends any ? (x: T) => any : never
) extends (x: infer R) => any
  ? R
  : never

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
      }
    : Record<string, never>
  : Record<string, never>

/**
 * VUE
 */
import * as Vue from 'vue'

export interface CSSProperties extends Vue.CSSProperties, AkCSS {}

export type OnError = (e: TypeException) => void
export type OnClick = (e: MouseEvent) => void
export type OnFocus = (e: FocusEvent) => void
