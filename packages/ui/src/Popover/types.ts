import { PlacementType, Selector } from '../helpers/types'
import type { PopupProps, PopupEmits } from '../popup/types'

export interface PopoverProps extends PopupProps {
  content?: string
  selector?: Selector
  placement?: PlacementType
  showMask?: boolean
}

export type PopoverEmits = PopupEmits
