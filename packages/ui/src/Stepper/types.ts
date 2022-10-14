import type { FocusEmits, FormItemCommonProps } from '../Form/types'
import type { OnClick } from '../helpers/types'

type OnChange = (value: string) => void

export interface StepperProps extends FormItemCommonProps {
  value?: number | string
  disabledMinus?: boolean
  disabledPlus?: boolean
  disabledInput?: boolean
  min?: number | string
  max?: number | string
  step?: number | string
  decimalLength?: number | string
}

export interface StepperEmits extends FocusEmits {
  onInput?: OnChange
  onChange?: OnChange
  onMinusClick?: OnClick
  onPlusClick?: OnClick
}
