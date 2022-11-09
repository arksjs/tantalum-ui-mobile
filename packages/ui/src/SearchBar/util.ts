import type { CSSProperties } from '../helpers/types'

export const getInnerClasses = (showCancel?: boolean) => [
  'ta-search_inner',
  { 'has--cancel': !!showCancel }
]

export const getInnerStyles = (background?: string) =>
  ({ background } as CSSProperties)

export const getFieldClasses = (ghost?: boolean) => [
  'ta-search_field',
  { ghost: !!ghost }
]

export const getSuggestStyles = (height: number) => ({ height: height + 'px' })
