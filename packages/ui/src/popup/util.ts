import { popupZIndex, type CSSProperties } from '../helpers'
import type { VisibleState } from './types'

export const VISIBLE_STATE_TYPES: VisibleState[] = [
  'show',
  'shown',
  'hide',
  'hidden'
]

let zIndex = popupZIndex

export function getNewZIndex() {
  return zIndex++
}

export function getPopupStyles(
  zIndex: number,
  absTop: number | null,
  isShow: boolean
) {
  const styles: CSSProperties = {
    zIndex: zIndex
  }

  if (absTop != null) {
    styles.top = absTop + 'px'
    styles.position = 'absolute'
  }

  if (!isShow) {
    styles.display = 'none'
  }

  return styles
}
