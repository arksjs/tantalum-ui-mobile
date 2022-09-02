import type { Noop } from '../helpers/types'

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
