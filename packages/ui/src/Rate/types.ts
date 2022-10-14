import type { FormItemCommonProps } from '../Form/types'
import type { IconData } from '../Icon/types'

type OnChange = (value: number) => void

export interface RateProps extends FormItemCommonProps {
  value?: number | string
  count?: number | string
  allowHalf?: boolean
  readonly?: boolean
  icon?: IconData
  activeIcon?: IconData
  color?: string
  activeColor?: string
  size?: number | string
}

export interface RateEmits {
  onInput?: OnChange
  onChange?: OnChange
}
