import type { OnClick, StateType } from '../helpers'
import type { IconData } from '../Icon/types'

export type Mode = 'default' | 'clickable' | 'closable'

export interface NoticeBarProps {
  title?: string
  mode?: Mode
  leftIcon?: IconData
  rightIcon?: IconData
  color?: string
  marquee?: boolean
  type?: StateType
}

export interface NoticeBarEmits {
  onClick?: OnClick
  onCloseClick?: OnClick
}

export type { Mode as NoticeBarMode }
