import type { OnClick } from '../helpers/types'
import type { IconData } from '../Icon/types'

export type ArrowDirection = 'right' | 'up' | 'down' | 'left'

export interface CellProps {
  icon?: IconData
  label?: string
  description?: string
  content?: string
  clickable?: boolean
  required?: boolean
  isLink?: boolean
  disabled?: boolean
  arrowDirection?: ArrowDirection
}

export interface CellEmits {
  onClick?: OnClick
}

export type { ArrowDirection as CellArrowDirection }
