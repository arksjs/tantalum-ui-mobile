import type { SelectorFieldProps } from './types'

export const getClasses = (props: { label?: string; disabled?: boolean }) => [
  'ak-input',
  { 'has--value': !!props.label, disabled: !!props.disabled }
]

export const getInputClasses = (label?: string) => [
  'ak-input_input',
  { placeholder: !label }
]
