import type { StateType, ToastProps } from './types'

export const STATE_TYPES: StateType[] = [
  'default',
  'success',
  'loading',
  'fail'
]

export const getBoxClasses = (props: ToastProps) => [
  'ta-toast_box',
  {
    'has--icon': !!(
      props.icon ||
      (props.type && STATE_TYPES.indexOf(props.type) > 0)
    )
  }
]
