import { CSSProperties } from '../helpers/types'
import { getNumber, isInteger, isNumeric, rangeInteger } from '../helpers/util'

export const DEFAULT_COUNT = 5
export const MAX_COUNT = 20

export const isIntegerOrHalf = (val?: number | string) => {
  if (isNumeric(val)) {
    if (isInteger(val) || (parseFloat(val as string) * 10) % 5 === 0) {
      return true
    }
  }
  return false
}

export const getMax = (count?: number | string) =>
  rangeInteger(getNumber(count, DEFAULT_COUNT), 1, MAX_COUNT)

export const getClasses = ({
  disabled,
  readonly
}: {
  disabled?: boolean
  readonly?: boolean
}) => {
  return ['ak-rate', { disabled: !!disabled, readonly: !!readonly }]
}

export const getStyles = ({
  color,
  activeColor,
  size
}: {
  color?: string
  activeColor?: string
  size?: number | string
}) => {
  const obj: CSSProperties = {}

  color && (obj['--ak-color'] = color)
  activeColor && (obj['--ak-active-color'] = activeColor)
  size != null &&
    size > 0 &&
    (obj['--ak-size'] = getNumber(size as string) + 'px')

  return obj
}
