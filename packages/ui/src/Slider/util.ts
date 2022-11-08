import type { CSSProperties } from '../helpers/types'

export const getSlideClasses = (disabled?: boolean) => [
  'ta-slider',
  {
    disabled: !!disabled
  }
]

export const getSlideStyles = (color?: string) => {
  const styles: CSSProperties = {}

  color && (styles['--ta-color'] = color)

  return styles
}
