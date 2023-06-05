import { camelCase2KebabCase, getNumber, getEnumsValue, type CSSProperties } from '../helpers'
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

export const getClasses = (autoHeight?: boolean) => [
  'ta-image',
  {
    'auto-height': !!autoHeight
  }
]

export const getImgClasses = (mode?: Mode, autoHeight?: boolean) => [
  'ta-image_img',
  'mode--' +
    camelCase2KebabCase(autoHeight ? 'widthFix' : getEnumsValue(MODE_NAMES, mode)).replace(
      /\s+/g,
      '-'
    )
]

export const getRatioStyles = (aspectRatio?: number | string) => {
  return {
    paddingTop: getNumber(aspectRatio) * 100 + '%'
  } as CSSProperties
}
