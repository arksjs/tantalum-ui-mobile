import type { IconData } from '../Icon/types'
import type { PopupProps, PopupEmits } from '../popup/types'

export type StateType = 'default' | 'success' | 'loading' | 'fail'

export interface ToastProps extends PopupProps {
  title?: string
  type?: StateType
  icon?: IconData
  showMask?: boolean
  duration?: number
}

export type ToastEmits = PopupEmits

export type { StateType as ToastType }
