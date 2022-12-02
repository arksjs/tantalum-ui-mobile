import { isNumber, isNumberArray, type CSSProperties } from '../helpers'
import type { SafeAreaInsets } from '../hooks'

export const DEFAULT_VISIBLE_HEIGHT = 200

export const getStyles = (
  offset: number | number[] = 0,
  isShow: boolean,
  safeAreaInsets: SafeAreaInsets
) => {
  let _offset = [0, 0]
  if (isNumber(offset)) {
    _offset = [offset, offset]
  } else if (isNumberArray(offset) && offset.length > 1) {
    _offset = offset
  }

  return {
    transform: `translate3d(${_offset[0]}px, ${
      _offset[1] - safeAreaInsets.bottom
    }px, 0px)`,
    display: isShow ? null : 'none'
  } as CSSProperties
}
