import {
  PLACEMENT_TYPES,
  getEnumsValue,
  type CSSProperties,
  type PlacementType
} from '../helpers'
import type { SafeAreaInsets } from '../hooks'

export const getInnerStyles = ({
  placement,
  safeAreaInsets
}: {
  placement?: PlacementType
  safeAreaInsets: SafeAreaInsets
}) => {
  const _placement = getEnumsValue(PLACEMENT_TYPES, placement)

  let left = safeAreaInsets.left
  let top = safeAreaInsets.top
  let right = safeAreaInsets.right
  let bottom = safeAreaInsets.bottom

  if (_placement === 'top') {
    bottom = 0
  } else if (_placement === 'bottom') {
    top = 0
  } else if (_placement === 'left') {
    right = 0
  } else if (_placement === 'right') {
    left = 0
  }

  return {
    padding: top + 'px ' + right + 'px ' + bottom + 'px ' + left + 'px'
  } as CSSProperties
}

export const getInnerClasses = ({
  placement,
  hasHeader
}: {
  placement?: PlacementType
  hasHeader: boolean
}) => [
  'ta-drawer_inner',
  'ta-horizontal-hairline',
  'placement--' + getEnumsValue(PLACEMENT_TYPES, placement),
  {
    'has--header': hasHeader
  }
]
