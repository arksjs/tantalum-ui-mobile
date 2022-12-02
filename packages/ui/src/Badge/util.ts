import {
  getNumber,
  isNumber,
  isObject,
  isString,
  isStringOrNumber,
  rangeInteger,
  getColorObject,
  type CSSProperties
} from '../helpers'
import type { BadgeOption, BadgeProps } from './types'

export function handleBadge(badge?: BadgeOption): BadgeProps {
  if (isStringOrNumber(badge)) {
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
    'ta-badge',
    {
      animated: !!props.animated
    }
  ]
}

export const getBadgeClasses = (props: BadgeProps) => {
  return [
    'ta-badge_badge',
    {
      dot: !!props.dot
    }
  ]
}

export const getBadgeStyles = (props: BadgeProps) => {
  const offset = props.offset || [0, 0]

  const styles: CSSProperties = {
    transform: `translate3d(50%, -50%, 0px) scale(${
      (isString(props.content) && props.content) ||
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
    styles[`--ta-color`] = colorObj.varBackgroundColor
    styles[`--ta-front-color`] = colorObj.varFrontColor
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
  if (isString(content)) {
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
