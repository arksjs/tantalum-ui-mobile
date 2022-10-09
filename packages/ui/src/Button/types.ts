import type { OnClick, SizeType, StateType } from '../helpers/types'
import type { IconData } from '../Icon/types'

export type ShapeType = 'rectangle' | 'round' | 'circle' | 'square'

export type PatternType =
  | 'default'
  | 'solid'
  | 'dashed'
  | 'borderless'
  | 'gradient'

export type FormType = 'button' | 'submit' | 'reset'

export interface ButtonGroupProps {
  shape?: ShapeType
  size?: SizeType
  pattern?: PatternType
}

export interface ButtonProps extends ButtonGroupProps {
  type?: StateType
  icon?: IconData
  loading?: boolean
  ghost?: boolean
  disabled?: boolean
  transparent?: boolean
  color?: string
  formType?: FormType
}

export interface ButtonEmits {
  onClick?: OnClick
}

export type { ShapeType as ButtonShape, PatternType as ButtonPattern }
