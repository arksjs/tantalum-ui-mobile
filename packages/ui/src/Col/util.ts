import { rangeInteger, type CSSProperties, getNumber } from '../helpers'
import type { ColProps } from './types'

function rangeCol(number: number | string = 0) {
  return rangeInteger(number, 0, 24)
}

export const getColClasses = (props: ColProps) => {
  const classes = [`ta-col`, `ta-col-${rangeCol(props.span || 24)}`]

  if (getNumber(props.offset) > 0) {
    classes.push(`ta-col-offset-${Math.min(24, rangeCol(props.offset))}`)
  }

  if (getNumber(props.push) > 0) {
    classes.push(`ta-col-push-${rangeCol(props.push)}`)
  }

  if (getNumber(props.pull) > 0) {
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
