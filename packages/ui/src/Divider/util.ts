import type { DividerProps } from './types'

export const getClasses = (props: DividerProps) => {
  return [
    'ta-divider',
    'ta-horizontal-hairline',
    {
      'has--title': !!props.title,
      'border--dashed': !!props.dashed
    }
  ]
}
