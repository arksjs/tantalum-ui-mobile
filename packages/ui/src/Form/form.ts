import {
  isNumber,
  isString,
  returnTrue,
  emitFocusValidator,
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

export const formStringValueEmits = {
  'update:modelValue': isString,
  change: isString,
  input: isString
}

export const formNumberValueEmits = {
  'update:modelValue': isNumber,
  change: isNumber,
  input: isNumber
}

export const formFocusEmits: PropsToEmits<FocusEmits> = {
  focus: emitFocusValidator,
  blur: emitFocusValidator
}

export const formActiveEmits: PropsToEmits<FocusWithoutEventEmits> = {
  focus: returnTrue,
  blur: returnTrue
}
