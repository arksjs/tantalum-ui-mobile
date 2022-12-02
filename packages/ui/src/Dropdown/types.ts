import type { PopupProps, PopupEmits } from '../popup/types'
import type { Selector } from '../helpers'

export interface DropdownProps extends PopupProps {
  selector?: Selector
}

export type DropdownEmits = PopupEmits
