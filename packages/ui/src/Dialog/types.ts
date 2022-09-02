import type { EmptyObject } from '../helpers/types'
import type { PopupEmits, PopupProps } from '../popup/types'

export type OnConfirm = (payload: EmptyObject) => void

export interface DialogProps extends PopupProps {
  title?: string
  showCancel?: boolean
  cancelText?: string
  confirmText?: string
  content?: string
  maskClosable?: boolean
}

export interface DialogEmits extends PopupEmits {
  onConfirm?: OnConfirm
}
