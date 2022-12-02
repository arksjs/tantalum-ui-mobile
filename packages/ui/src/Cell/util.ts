import { getEnumsValue } from '../helpers'
import type { ArrowDirection, CellProps } from './types'

export const LINK_ICON_NAMES: ArrowDirection[] = ['right', 'up', 'down', 'left']

export const getCellClasses = (props: CellProps) => {
  return [
    'ta-cell',
    'ta-horizontal-hairline',
    {
      clickable: !!(props.clickable || props.isLink),
      'has--icon': props.icon,
      disabled: props.disabled
    }
  ]
}

export const getCellArrowClasses = (arrowDirection?: ArrowDirection) => {
  return [
    'ta-cell_link-icon',
    'arrow--' + getEnumsValue(LINK_ICON_NAMES, arrowDirection)
  ]
}
