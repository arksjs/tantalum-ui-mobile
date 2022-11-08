import { formatInputDigit, formatInputNumber } from '../helpers/input'
import { getNumber } from '../helpers/util'
import { getEnumsValue } from '../helpers/validator'
import type { Mode } from './types'

const TYPE_NAMES = [
  'text',
  'number',
  'digit',
  'tel',
  'password',
  'search',
  'textarea'
]

export const getInputMode = (_type?: string) => {
  let mode: Mode = 'none'
  let type = ''

  switch (_type) {
    case 'search':
      mode = 'search'
      break

    case 'digit':
      mode = 'numeric'
      type = 'tel'
      break

    case 'number':
      mode = 'decimal'
      type = 'text'
      break

    case 'tel':
      mode = 'tel'
      break

    case 'text':
      mode = 'text'
      break

    default:
      break
  }

  if (!type) {
    type = getEnumsValue(TYPE_NAMES, _type)
  }

  return {
    inputMode: mode,
    inputType: type
  }
}

export const getMaxLength = (maxLength?: number | string) => {
  return Math.max(0, getNumber(maxLength, 140))
}

export const getClasses = ({
  type,
  readonly,
  prepend,
  append,
  active,
  disabled
}: {
  type: string
  readonly?: boolean
  disabled?: boolean
  prepend: boolean
  append: boolean
  active: boolean
}) => {
  return [
    'ta-input',
    {
      'has--prepend': prepend,
      'has--append': append,
      'ta-textarea': type === 'textarea',
      focus: active,
      readonly: !!readonly,
      disabled: !!disabled
    }
  ]
}

export const getValue = (val: string | number, type: string) => {
  let newVal = val.toString()

  switch (type) {
    case 'digit':
      newVal = formatInputDigit(newVal)
      break

    case 'number':
      newVal = formatInputNumber(newVal)
      break

    default:
      break
  }

  return newVal
}
