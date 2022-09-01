import { getEnumsValue } from '../helpers/validator'
import type { ArrowDirection, CellProps } from './types'

export const LINK_ICON_NAMES: ArrowDirection[] = ['right', 'up', 'down', 'left']

export const getCellClasses = (props: CellProps) => {
  return [
    'fx-cell',
    'fx-horizontal-hairline',
    {
      clickable: !!(props.clickable || props.isLink),
      'has--icon': props.icon,
      disabled: props.disabled
    }
  ]
}

export const getCellArrowClasses = (arrowDirection?: ArrowDirection) => {
  return [
    'fx-cell_link-icon',
    'arrow--' + getEnumsValue(LINK_ICON_NAMES, arrowDirection)
  ]
}
