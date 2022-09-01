import type { FormItemCommonProps } from '../Form/types'

export type ModelValue = number | string

export type OptionItem = {
  label: string
  value: ModelValue
}

export type UserOptionItem = ModelValue | OptionItem

export interface CheckGroupCommonProps extends FormItemCommonProps {
  options?: UserOptionItem[]
  inline?: boolean
  activeColor?: string
  value?: ModelValue | ModelValue[]
}

export interface CheckboxGroupProps extends CheckGroupCommonProps {
  value?: ModelValue[]
}

export type OnChange = (value: ModelValue[]) => void

export interface CheckboxGroupEmits {
  onUpdateModelValue?: OnChange
  onChange?: OnChange
}

export interface CheckCommonProps extends FormItemCommonProps {
  value?: ModelValue
  checked?: boolean
  activeColor?: string
}

export interface CheckboxProps extends CheckCommonProps {
  circle?: boolean
}

export interface CheckCommonEmits {
  onUpdateChecked?: (checked: boolean) => void
  onChange?: (checked: boolean) => void
}

export type CheckboxEmits = CheckCommonEmits
