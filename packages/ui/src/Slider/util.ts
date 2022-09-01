import type { CSSProperties } from '../helpers/types'

export const getSlideClasses = (disabled?: boolean) => [
  'fx-slider',
  {
    disabled: !!disabled
  }
]

export const getSlideStyles = (color?: string) => {
  const styles: CSSProperties = {}

  color && (styles['--fx-color'] = color)

  return styles
}
