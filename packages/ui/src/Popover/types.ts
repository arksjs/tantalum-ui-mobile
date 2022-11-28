import type { PlacementType, Selector } from '../helpers'
import type { PopupProps, PopupEmits } from '../popup/types'

export interface PopoverProps extends PopupProps {
  content?: string
  selector?: Selector
  placement?: PlacementType
  showMask?: boolean
}

export type PopoverEmits = PopupEmits
