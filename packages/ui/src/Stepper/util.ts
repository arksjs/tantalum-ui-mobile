import { formatInputNumber } from '../helpers/input'
import { getNumber, rangeInteger, rangeNumber } from '../helpers/util'

export const getClasses = (disabled?: boolean) => {
  return ['ak-stepper', { disabled: !!disabled }]
}

export function formateNumber(
  value: string | number,
  decimalLength?: number | string
): string {
  return formatInputNumber(value, getNumber(decimalLength, -1))
}

export function getRangeNumber(
  props: {
    min: number
    max: number
    allowDecimal?: boolean
    decimalLength?: number | string
  },
  value: string | number
) {
  value = formateNumber(value, props.decimalLength)

  if (value === '') {
    value = props.min
  }

  if (props.allowDecimal) {
    value = rangeNumber(parseFloat(value as string), props.min, props.max)
  } else {
    value = rangeInteger(Math.floor(value as number), props.min, props.max)
  }

  return value.toString()
}
