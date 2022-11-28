import type { CSSProperties } from '../helpers'
import type { HandleOptionItem } from './types'

export const getStyles = (color?: string, activeColor?: string) => {
  const obj: CSSProperties = {}

  color && (obj['--ta-color'] = color)
  activeColor && (obj['--ta-active-color'] = activeColor)

  return obj
}

export const getClasses = (
  scrollThreshold: number,
  options2: HandleOptionItem[],
  hasSub: boolean
) => {
  return [
    'ta-tab',
    {
      'no--scroll': options2.length <= scrollThreshold,
      'has--sub': hasSub
    }
  ]
}

export const getItemClasses = (index: number, activeIndex: number) => {
  return [
    'ta-tab_item',
    'ta-vertical-hairline',
    {
      active: index === activeIndex,
      'active-prev': index === activeIndex - 1,
      'active-next': index === activeIndex + 1
    }
  ]
}
