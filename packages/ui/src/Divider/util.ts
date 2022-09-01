import type { DividerProps } from './types'

export const getClasses = (props: DividerProps) => {
  return [
    'fx-divider',
    'fx-horizontal-hairline',
    {
      'has--title': !!props.title,
      'border--dashed': !!props.dashed
    }
  ]
}
