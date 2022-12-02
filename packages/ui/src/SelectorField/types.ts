import type { Noop } from '../helpers'

export type SelectorValue = string | number | Date
export type SelectorModelValue = SelectorValue | SelectorValue[]
export interface SelectorSourceDetail {
  label: string
  value: any
}
export interface SelectorDetail {
  value: SelectorModelValue
  label: string
  source: SelectorSourceDetail
}

export interface SelectorValueFormatter {
  (valueArray: SelectorValue[], labelArray: string[]):
    | { value: SelectorModelValue; label: string }
    | SelectorModelValue
}
export interface SelectorValueParser {
  (value: unknown): SelectorValue[]
}

export type SelectorOnChange = (payload: SelectorModelValue) => void

export type SelectorOnConfirm = (payload: SelectorDetail) => void

export interface SelectorFieldProps {
  disabled?: boolean
  value: string
  label: string
  name?: string
  placeholder?: string
}

export interface SelectorFieldEmits {
  onFieldClick?: Noop
}
