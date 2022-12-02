import type {
  ShapeType,
  PatternType,
  ButtonProps,
  FormType,
  ButtonGroupProps
} from './types'
import {
  getColorGroups,
  isColorValue,
  isDarkColor,
  getEnumsValue,
  SIZE_TYPES,
  STATE_TYPES,
  type CSSProperties
} from '../helpers'

export const BUTTON_SHAPE_TYPES: ShapeType[] = [
  'rectangle',
  'round',
  'circle',
  'square'
]

export const BUTTON_PATTERN_TYPES: PatternType[] = [
  'default',
  'solid',
  'dashed',
  'borderless',
  'gradient'
]

export const FORM_TYPES: FormType[] = ['button', 'submit', 'reset']

export const getCommonClasses = (props: ButtonGroupProps) => [
  'pattern--' + getEnumsValue(BUTTON_PATTERN_TYPES, props.pattern),
  'size--' + getEnumsValue(SIZE_TYPES, props.size),
  'shape--' + getEnumsValue(BUTTON_SHAPE_TYPES, props.shape)
]

export const getButtonClasses = (
  props: ButtonProps,
  groupProps?: ButtonGroupProps
) => [
  'ta-button',
  {
    'has--icon': props.loading || props.icon,
    ghost: !!props.ghost,
    transparent: !!props.transparent
  },
  [
    'type--' +
      (props.color && isColorValue(props.color)
        ? STATE_TYPES[1]
        : getEnumsValue(STATE_TYPES, props.type))
  ],
  getCommonClasses(groupProps || props)
]

export const getGroupClasses = (props: ButtonGroupProps, count: number) => [
  'ta-button-group',
  getCommonClasses(props),
  'count--' + (count || 1)
]

export const getButtonStyles = (color?: string) => {
  const obj: CSSProperties = {}

  if (color && isColorValue(color)) {
    const colors = getColorGroups(color)
    const isDark = isDarkColor(color)
    const pattern = getEnumsValue(BUTTON_PATTERN_TYPES)

    obj[`--ta-color`] = colors[5]
    obj[`--ta-dark-color`] = colors[6]
    obj[`--ta-light-color`] = colors[4]

    if (!isDark && (pattern === 'default' || pattern === 'gradient')) {
      // 浅色背景情况，字体颜色升四阶
      obj[`--ta-front-color`] = colors[9]
    }
  }

  return obj
}
