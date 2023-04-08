import type { CSSProperties } from '../helpers'

export const getStyles = (color?: string, activeColor?: string) => {
  const obj: CSSProperties = {}

  color && (obj['--ta-color'] = color)
  activeColor && (obj['--ta-active-color'] = activeColor)

  return obj
}

export const getClasses = (noScrolling: boolean, hasSub: boolean) => {
  return [
    'ta-tab',
    {
      'no--scrolling': noScrolling,
      'has--subtitle': hasSub
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

export const TAB_HEIGHT = 40
