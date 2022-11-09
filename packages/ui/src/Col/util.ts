import { rangeInteger } from '../helpers/util'
import type { CSSProperties } from '../helpers/types'
import type { ColProps } from './types'

function rangeCol(number: number | string = 0) {
  return rangeInteger(number, 0, 24)
}

export const getColClasses = (props: ColProps) => {
  const classes = [`ta-col`, `ta-col-${rangeCol(props.span || 24)}`]

  if (props.offset && props.offset > 0) {
    classes.push(`ta-col-offset-${Math.min(24, rangeCol(props.offset))}`)
  }

  if (props.push && props.push > 0) {
    classes.push(`ta-col-push-${rangeCol(props.push)}`)
  }

  if (props.pull && props.pull > 0) {
    classes.push(`ta-col-pull-${rangeCol(props.pull)}`)
  }

  return classes
}

export const getColStyles = ([gH, gV]: number[]) => {
  const styles: CSSProperties = {}

  if (gH > 0 || gV > 0) {
    styles.padding = `${gV / 2}px ${gH / 2}px`
  }

  return styles
}
