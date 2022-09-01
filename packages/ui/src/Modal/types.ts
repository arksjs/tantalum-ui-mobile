import type { PopupProps, PopupEmits } from '../popup/types'
import type { Noop } from '../helpers/types'

export interface ModalProps extends PopupProps {
  width?: string
  showClose?: boolean
}

export interface ModalEmits extends PopupEmits {
  onCloseClick?: Noop
}
