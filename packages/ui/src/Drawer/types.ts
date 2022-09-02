import type { PlacementType } from '../helpers/types'
import type { PopupEmits, PopupProps } from '../popup/types'

export interface DrawerProps extends PopupProps {
  title?: string
  placement?: PlacementType
  showClose?: boolean
  showMask?: boolean
  enableSafeAreaInsets?: boolean
}

export type DrawerEmits = PopupEmits
