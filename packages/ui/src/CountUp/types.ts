import type { Noop } from '../helpers'

export type OnCancel = (payload: { number: number }) => void
export type OnAnimated = OnCancel

export type Speed = 'normal' | 'fast' | 'slow' | number

export interface CountUpProps {
  initialNumber?: number | string
  number?: number | string
  speed?: Speed
  thousands?: boolean
  decimalDigits?: number | string
}

export interface CountUpEmits {
  onCancel?: OnCancel
  onAnimated?: OnAnimated
}

export interface CountUpRef {
  cancel: Noop
}

export type { Speed as CountUpSpeed, OnCancel as CountUpOnCancel, OnAnimated as CountUpOnAnimated }
