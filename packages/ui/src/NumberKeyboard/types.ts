import type { FormItemCommonProps } from '../Form/types'
import type { EmptyObject } from '../helpers/types'
import type { IconData } from '../Icon/types'
import type { PopupEmits, PopupProps } from '../popup/types'

export type OnConfirm = (payload: EmptyObject) => void
export type OnDelete = (payload: { deleteKey: string }) => void
export type OnClose = (payload: { source: string }) => void

export interface NumberKeyboardItem {
  icon?: IconData
  text: string
  type: 'text' | 'confirm' | 'backspace'
  span?: number
}

export type KeyboardType = 'default' | 'rightColumn'

export interface NumberKeyboardProps extends FormItemCommonProps, PopupProps {
  value?: string
  title?: string
  type?: KeyboardType
  customKey?: string | string[]
}

export interface NumberKeyboardEmits extends PopupEmits {
  onInput?: (text: string) => void
  onChange?: (text: string) => void
  onDelete?: OnDelete
  onClose?: OnClose
  onConfirm?: OnConfirm
}

export type {
  OnDelete as NumberKeyboardOnDelete,
  OnClose as NumberKeyboardOnClose,
  KeyboardType as NumberKeyboardType
}
