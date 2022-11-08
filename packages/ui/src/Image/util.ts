import type { CSSProperties } from '../helpers/types'
import { camelCase2KebabCase, getNumber } from '../helpers/util'
import { getEnumsValue } from '../helpers/validator'
import type { Mode } from './types'

export const MODE_NAMES: Mode[] = [
  'scaleToFill',
  'aspectFit',
  'aspectFill',
  'widthFix',
  'top',
  'bottom',
  'left',
  'right',
  'top left',
  'top right',
  'bottom left',
  'bottom right'
]

export const getImgClasses = (mode?: Mode) => [
  'ta-image_img',
  'mode--' +
    camelCase2KebabCase(getEnumsValue(MODE_NAMES, mode)).replace(/\s+/g, '-')
]

export const getRatioStyles = (aspectRatio?: number | string) => {
  return {
    paddingTop: getNumber(aspectRatio) * 100 + '%'
  } as CSSProperties
}
