import { getNumber, isNumber, getEnumsValue } from '../helpers'
import type {
  AvatarShape,
  ButtonShape,
  SkeletonAvatarProps,
  SkeletonButtonProps,
  SkeletonImageProps,
  SkeletonParagraphProps,
  SkeletonProps,
  SkeletonTitleProps
} from './types'

export const PARAGRAPH_DEFAULT_ROW = 3
export const AVATAR_SHAPE_NAMES: AvatarShape[] = ['default', 'circle']
export const BUTTON_SHAPE_NAMES: ButtonShape[] = ['default', 'round']

export const getClasses = (animated?: boolean) => {
  return ['ta-skeleton', { animated: !!animated }]
}

export const getAvatarClasses = (
  props: SkeletonAvatarProps,
  parentProps?: SkeletonProps
) => {
  return [
    'ta-skeleton-avatar',
    { animated: !!(parentProps?.animated || props.animated) },
    'shape--' +
      getEnumsValue(AVATAR_SHAPE_NAMES, props.shape ?? parentProps?.avatarShape)
  ]
}

export const getButtonClasses = (
  props: SkeletonButtonProps,
  parentProps?: SkeletonProps
) => {
  return [
    'ta-skeleton-button',
    { animated: !!(parentProps?.animated || props.animated) },
    'shape--' +
      getEnumsValue(BUTTON_SHAPE_NAMES, props.shape ?? parentProps?.buttonShape)
  ]
}

export const getImageClasses = (
  props: SkeletonImageProps,
  parentProps?: SkeletonProps
) => {
  return [
    'ta-skeleton-image',
    { animated: !!(parentProps?.animated || props.animated) }
  ]
}

export const getTitleClasses = (
  props: SkeletonTitleProps,
  parentProps?: SkeletonProps
) => {
  return [
    'ta-skeleton-title',
    { animated: !!(parentProps?.animated || props.animated) }
  ]
}

export const getParagraphClasses = (
  props: SkeletonParagraphProps,
  parentProps?: SkeletonProps
) => {
  return [
    'ta-skeleton-paragraph',
    { animated: !!(parentProps?.animated || props.animated) }
  ]
}

export const getParagraphRowList = (
  props: SkeletonParagraphProps,
  parentProps?: SkeletonProps
) => {
  const row = getNumber(props.row ?? parentProps?.paragraphRow)
  const rowLen = isNumber(row) && row > 0 ? row : PARAGRAPH_DEFAULT_ROW

  const rowList = []

  for (let i = 0; i < rowLen; i++) {
    rowList.push(i)
  }

  return rowList
}
