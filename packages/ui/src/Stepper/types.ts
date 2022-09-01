import type { FocusEmits, FormItemCommonProps } from '../Form/types'
import type { OnClick } from '../helpers/types'

type OnChange = (value: string) => void

export interface StepperProps extends FormItemCommonProps {
  value?: number | string
  disabledMinus?: boolean
  disabledPlus?: boolean
  disabledInput?: boolean
  allowDecimal?: boolean
  min?: number | string
  max?: number | string
  step?: number | string
  decimalLength?: number | string
}

export interface StepperEmits extends FocusEmits {
  onUpdateModelValue?: OnChange
  onInput?: OnChange
  onChange?: OnChange
  onMinusClick?: OnClick
  onPlusClick?: OnClick
}
