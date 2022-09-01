import type { SelectorFieldProps } from './types'

export const getClasses = (props: { label?: string; disabled?: boolean }) => [
  'fx-input',
  { 'has--value': !!props.label, disabled: !!props.disabled }
]

export const getInputClasses = (label?: string) => [
  'fx-input_input',
  { placeholder: !label }
]
