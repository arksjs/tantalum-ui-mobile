import {
  formatInputNumber,
  getNumber,
  rangeInteger,
  rangeNumber
} from '../helpers'

export const getClasses = (disabled?: boolean) => {
  return ['ta-stepper', { disabled: !!disabled }]
}

export function formatNumber(
  value: string | number,
  decimalLength?: number | string
): string {
  return formatInputNumber(value, getNumber(decimalLength, -1))
}

export function getRangeNumber(
  props: {
    min: number
    max: number
    decimalLength?: number | string
  },
  value: string | number
) {
  value = formatNumber(value, props.decimalLength)

  if (value === '') {
    value = props.min
  }

  if (props.decimalLength != 0) {
    value = rangeNumber(parseFloat(value as string), props.min, props.max)
  } else {
    value = rangeInteger(Math.floor(value as number), props.min, props.max)
  }

  return value.toString()
}
