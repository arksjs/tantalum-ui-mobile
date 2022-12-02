import type { Noop, OnFocus } from '../helpers'

export interface FormItemCommonProps {
  name?: string
  disabled?: boolean
}

export interface FocusEmits {
  onFocus?: OnFocus
  onBlur?: OnFocus
}

export interface FocusWithoutEventEmits {
  onFocus?: Noop
  onBlur?: Noop
}

export interface FormItemProps {
  label?: string
  required?: boolean
  error?: string | string[]
  validateStatus?: string
}
