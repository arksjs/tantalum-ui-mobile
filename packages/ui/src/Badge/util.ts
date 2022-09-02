import { getColorObject } from '../helpers/color'
import type { CSSProperties } from '../helpers/types'
import {
  getNumber,
  isNumber,
  isObject,
  isString,
  isStringNumberMix,
  rangeInteger
} from '../helpers/util'
import type { BadgeOption, BadgeProps } from './types'

export function handleBadge(badge?: BadgeOption): BadgeProps {
  if (isStringNumberMix(badge)) {
    return {
      content: badge
    }
  } else if (isObject(badge)) {
    return badge as BadgeProps
  } else {
    return {}
  }
}

export const getClasses = (props: BadgeProps) => {
  return [
    'ak-badge',
    {
      animated: !!props.animated
    }
  ]
}

export const getBadgeClasses = (props: BadgeProps) => {
  return [
    'ak-badge_badge',
    {
      dot: !!props.dot
    }
  ]
}

export const getBadgeStyles = (props: BadgeProps) => {
  const offset = props.offset || [0, 0]

  const styles: CSSProperties = {
    transform: `translate3d(50%, -50%, 0px) scale(${
      (typeof props.content === 'string' && props.content) ||
      props.showZero ||
      (props.content && props.content > 0)
        ? 1
        : 0
    })`,
    right: `${-offset[0]}px`,
    top: `${offset[1]}px`
  }

  const colorObj = getColorObject(props.color)

  if (colorObj.hasColor) {
    styles[`--ak-color`] = colorObj.varBackgroundColor
    styles[`--ak-front-color`] = colorObj.varFrontColor
  }

  return styles
}

export const DEFAULT_MAX_COUNT = 99

export const getDefaultContent = (props: BadgeProps) => {
  return isString(props.content)
    ? props.content
    : isNumber(props.content)
    ? rangeInteger(
        props.content,
        0,
        getNumber(props.maxCount, DEFAULT_MAX_COUNT)
      )
    : 0
}

export const getShowContent = (props: BadgeProps, content: string | number) => {
  if (typeof content === 'string') {
    return content
  }

  if (
    props.content != null &&
    props.maxCount != null &&
    props.content > props.maxCount &&
    content === props.maxCount
  ) {
    return content + '+'
  }
  return content.toString()
}
