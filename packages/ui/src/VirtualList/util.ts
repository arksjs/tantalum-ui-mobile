import type { CSSProperties } from '../helpers'

export const getClasses = (horizontal: boolean) => [
  'ta-virtual-list',
  { horizontal }
]

export const getListStyles = (horizontal: boolean, max: number) => {
  const styles: CSSProperties = {}

  styles[horizontal ? 'width' : 'height'] = max + 'px'

  return styles
}

export function getItemStyles(
  {
    offset,
    otherOffset,
    itemSize,
    otherSizePx
  }: {
    offset: number
    otherOffset: string
    itemSize: number
    otherSizePx: string
  },

  cols: number[],
  horizontal: boolean
) {
  const style: CSSProperties = {}

  // style.position = 'absolute'
  if (cols.length > 1) {
    style.height = itemSize + 'px'
    style.width = otherSizePx
    style.transform = `translate3d(${otherOffset}, ${offset}px, 0)`
  } else if (horizontal) {
    style.width = itemSize + 'px'
    style.height = otherSizePx
    style.transform = `translate3d(${offset}px, 0, 0)`
  } else {
    style.height = itemSize + 'px'
    style.width = otherSizePx
    style.transform = `translate3d(0, ${offset}px, 0)`
  }

  return style
}
