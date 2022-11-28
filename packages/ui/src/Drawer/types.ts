import type { PlacementType } from '../helpers'
import type { PopupEmits, PopupProps } from '../popup/types'

export interface DrawerProps extends PopupProps {
  title?: string
  placement?: PlacementType
  showClose?: boolean
  showMask?: boolean
  enableSafeAreaInsets?: boolean
}

export type DrawerEmits = PopupEmits
