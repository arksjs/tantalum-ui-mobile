import type {
  ShapeType,
  PatternType,
  ButtonProps,
  FormType,
  ButtonGroupProps
} from './types'
import { getColorGroups, isColorValue, isDarkColor } from '../helpers/color'
import { getEnumsValue } from '../helpers/validator'
import { SIZE_TYPES, STATE_TYPES } from '../helpers/constants'
import type { CSSProperties } from '../helpers/types'

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
  'ak-button',
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
  'ak-button-group',
  getCommonClasses(props),
  'count--' + (count || 1)
]

export const getButtonStyles = (color?: string) => {
  const obj: CSSProperties = {}

  if (color && isColorValue(color)) {
    const colors = getColorGroups(color)
    const isDark = isDarkColor(color)
    const pattern = getEnumsValue(BUTTON_PATTERN_TYPES)

    obj[`--ak-color`] = colors[5]
    obj[`--ak-dark-color`] = colors[6]
    obj[`--ak-light-color`] = colors[4]

    if (!isDark && (pattern === 'default' || pattern === 'gradient')) {
      // 浅色背景情况，字体颜色升四阶
      obj[`--ak-front-color`] = colors[9]
    }
  }

  return obj
}
