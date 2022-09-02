import { PLACEMENT_TYPES } from '../helpers/constants'
import type { CSSProperties, PlacementType } from '../helpers/types'
import { getEnumsValue } from '../helpers/validator'
import type { SafeAreaInsets } from '../hooks/types'
import type { DrawerProps } from './types'

export const getClasses = (showMask?: boolean) => [
  'ak-drawer',
  { 'no--mask': !showMask }
]

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
  'ak-drawer_inner',
  'ak-horizontal-hairline',
  'placement--' + getEnumsValue(PLACEMENT_TYPES, placement),
  {
    'has--header': hasHeader
  }
]
