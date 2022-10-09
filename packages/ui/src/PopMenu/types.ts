import type { IconData } from '../Icon/types'
import type { PopoverProps } from '../Popover/types'
import type { PopupEmits } from '../popup/types'

export interface Option {
  name: string
  icon?: IconData
  disabled?: boolean
}

export interface Detail {
  item: {
    name: string
  }
  index: number
}

export type OnConfirm = (payload: Detail) => void

export interface PopMenuProps extends PopoverProps {
  options: Option[]
}

export interface PopMenuEmits extends PopupEmits {
  onConfirm?: OnConfirm
}

export type { Option as PopMenuOption, OnConfirm as PopMenuOnConfirm }
