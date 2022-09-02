import type { EmptyObject } from '../helpers/types'
import type { PopoverProps } from '../Popover/types'
import type { PopupEmits } from '../popup/types'

export type OnConfirm = (payload: EmptyObject) => void

export interface PopDialogProps extends PopoverProps {
  showCancel?: boolean
  cancelText?: string
  confirmText?: string
}

export interface PopDialogEmits extends PopupEmits {
  onConfirm?: OnConfirm
}
