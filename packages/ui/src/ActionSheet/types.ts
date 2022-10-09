import type { PopupEmits, PopupProps } from '../popup/types'

export interface Option {
  name: string
  highlight?: boolean
  description?: string
  disabled?: boolean
}

export interface Detail {
  item: {
    name: string
  }
  index: number
}

export type OnConfirm = (payload: Detail) => void

export interface ActionSheetProps extends PopupProps {
  title?: string
  showCancel?: boolean
  cancelText?: string
  options: Option[]
  enableSafeAreaInsets?: boolean
}

export interface ActionSheetEmits extends PopupEmits {
  onConfirm?: OnConfirm
}

export type { Option as ActionSheetOption, OnConfirm as ActionSheetOnConfirm }
