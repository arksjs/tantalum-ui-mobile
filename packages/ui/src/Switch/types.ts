import type { FormItemCommonProps } from '../Form/types'

export interface SwitchProps extends FormItemCommonProps {
  modelValue?: boolean
  color?: string
  activeColor?: string
  size?: number | string
}

export interface SwitchEmits {
  onChange?: (checked: boolean) => void
}
