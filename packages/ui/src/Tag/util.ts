import {
  getColorObject,
  SIZE_TYPES,
  STATE_TYPES,
  getEnumsValue,
  type CSSProperties
} from '../helpers'
import type { TagProps, PatternType } from './types'

export const TAG_PATTERN_TYPES: PatternType[] = ['light', 'dark', 'plain']

export const getClasses = (props: TagProps) => {
  const { hasColor, isDark } = getColorObject(props.color)

  return [
    'ta-tag',
    'type--' +
      (hasColor ? STATE_TYPES[1] : getEnumsValue(STATE_TYPES, props.type)),
    'size--' + getEnumsValue(SIZE_TYPES, props.size),
    'pattern--' +
      (hasColor && props.pattern !== 'plain'
        ? isDark
          ? 'dark'
          : 'light'
        : getEnumsValue(TAG_PATTERN_TYPES, props.pattern)),
    { disabled: !!props.disabled }
  ]
}

export const getStyles = (color?: string) => {
  const styles: CSSProperties = {}

  const colorObj = getColorObject(color)

  if (colorObj.hasColor) {
    styles[`--ta-color`] = colorObj.varColor
    styles[`--ta-black-color`] = colorObj.varBlackColor
  }

  return styles
}
