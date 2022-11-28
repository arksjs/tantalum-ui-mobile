import {
  isNumber,
  isString,
  returnTrue,
  emitEventValidator,
  type PropsToEmits
} from '../helpers'
import type { FocusEmits, FocusWithoutEventEmits } from './types'

export const formItemProps = {
  name: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
}

export const isStringValue = (value: string) => isString(value)
export const isNumberValue = (value: number) => isNumber(value)

export const formStringValueEmits = {
  'update:modelValue': isStringValue,
  change: isStringValue,
  input: isStringValue
}

export const formNumberValueEmits = {
  'update:modelValue': isNumberValue,
  change: isNumberValue,
  input: isNumberValue
}

export const formFocusEmits: PropsToEmits<FocusEmits> = {
  focus: emitEventValidator,
  blur: emitEventValidator
}

export const formActiveEmits: PropsToEmits<FocusWithoutEventEmits> = {
  focus: returnTrue,
  blur: returnTrue
}
