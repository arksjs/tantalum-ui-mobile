import type { IconData } from '../Icon/types'
import type { PopupProps, PopupEmits } from '../popup/types'
import type { StateType } from '../helpers'

export interface NotifyProps extends PopupProps {
  title: string
  type?: StateType
  icon?: IconData
  closable?: boolean
  duration?: number
  color?: string
}

export type NotifyEmits = PopupEmits
