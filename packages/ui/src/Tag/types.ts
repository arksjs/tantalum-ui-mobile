import type { Noop, SizeType, StateType } from '../helpers/types'

export type PatternType = 'light' | 'dark' | 'plain'

export interface TagProps {
  size?: SizeType
  type?: StateType
  pattern?: PatternType
  closable?: boolean
  disabled?: boolean
  color?: string
}

export interface TagEmits {
  onClick?: Noop
  onClose?: Noop
  onLongPress?: Noop
}

export type { PatternType as TagPattern }
