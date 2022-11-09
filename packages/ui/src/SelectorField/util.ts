export const getClasses = (props: { label?: string; disabled?: boolean }) => [
  'ta-input',
  { 'has--value': !!props.label, disabled: !!props.disabled }
]

export const getInputClasses = (label?: string) => [
  'ta-input_input',
  { placeholder: !label }
]
