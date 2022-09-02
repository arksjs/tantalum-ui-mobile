import type { CSSProperties } from '../helpers/types'
import type { HandleOptionItem } from './types'

export const getStyles = (color?: string, activeColor?: string) => {
  const obj: CSSProperties = {}

  color && (obj['--ak-color'] = color)
  activeColor && (obj['--ak-active-color'] = activeColor)

  return obj
}

export const getClasses = (
  scrollThreshold: number,
  options2: HandleOptionItem[],
  hasSub: boolean
) => {
  return [
    'ak-tab',
    {
      'no--scroll': options2.length <= scrollThreshold,
      'has--sub': hasSub
    }
  ]
}

export const getItemClasses = (index: number, activeIndex: number) => {
  return [
    'ak-tab_item',
    'ak-vertical-hairline',
    {
      active: index === activeIndex,
      'active-prev': index === activeIndex - 1,
      'active-next': index === activeIndex + 1
    }
  ]
}
