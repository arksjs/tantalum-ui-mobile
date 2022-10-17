import type {
  CheckCommonEmits,
  CheckCommonProps,
  CheckGroupCommonProps,
  ModelValue
} from '../Checkbox/types'

export interface RadioGroupProps extends CheckGroupCommonProps {
  modelValue?: ModelValue
}

export interface RadioGroupEmits {
  onChange?: (value: ModelValue) => void
}

export type RadioProps = CheckCommonProps

export type RadioEmits = CheckCommonEmits
