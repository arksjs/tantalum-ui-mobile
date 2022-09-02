import type { CSSProperties } from '../helpers/types'

export const getSlideClasses = (disabled?: boolean) => [
  'ak-slider',
  {
    disabled: !!disabled
  }
]

export const getSlideStyles = (color?: string) => {
  const styles: CSSProperties = {}

  color && (styles['--ak-color'] = color)

  return styles
}
