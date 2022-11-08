import { isNumberArray, isNumeric } from '../helpers/util'
import type { CSSProperties } from '../helpers/types'
import type { JustifyType, AlignType, UserGutter, RowProps } from './types'

export const JUSTIFY_TYPES: JustifyType[] = [
  'start',
  'end',
  'center',
  'space-around',
  'space-between'
]

export const ALIGN_TYPES: AlignType[] = ['top', 'middle', 'bottom']

export const parseGutter = (val?: UserGutter) => {
  if (isNumeric(val)) {
    return [Math.max(0, parseFloat(val as string)), 0]
  } else if (isNumberArray(val) && (val as number[]).length >= 2) {
    return [(val as number[])[0], (val as number[])[1]]
  }
  return [0, 0]
}

export const getRowStyles = ([gH, gV]: number[]) => {
  const styles: CSSProperties = {}

  if (gH > 0 || gV > 0) {
    styles.margin = `-${gV / 2}px -${gH / 2}px ${gV / 2}px `
  }

  return styles
}

export const getRowClasses = (props: RowProps) => {
  const classes = [`ta-row`]

  props.justify &&
    JUSTIFY_TYPES.includes(props.justify) &&
    classes.push(`justify--${props.justify}`)
  props.align &&
    ALIGN_TYPES.includes(props.align) &&
    classes.push(`align--${props.align}`)

  return classes
}
