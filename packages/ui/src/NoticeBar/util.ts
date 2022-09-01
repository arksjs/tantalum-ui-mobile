import { getEnumsValue } from '../helpers/validator'
import { STATE_TYPES } from '../helpers/constants'
import type { CSSProperties, StateType } from '../helpers/types'
import { getColorObject } from '../helpers/color'

export const getClasses = (type?: StateType) => {
  return ['fx-notice-bar', 'type--' + getEnumsValue(STATE_TYPES, type)]
}

export const getStyles = (color?: string) => {
  const styles: CSSProperties = {}

  const colorObj = getColorObject(color)
  if (colorObj.hasColor) {
    styles[`--fx-color`] = colorObj.varBackgroundColor
    styles[`--fx-front-color`] = colorObj.varFrontColor
  }

  return styles
}

export const getContentClasses = (marquee?: boolean) => {
  return [
    'fx-notice-bar_content-inner',
    {
      marquee: !!marquee
    }
  ]
}

export const getContentStyles = ({
  marqueeX,
  marqueeDuration
}: {
  marqueeX: number
  marqueeDuration: number
}) => {
  const styles: CSSProperties = {}

  marqueeX !== 0 && (styles.transform = `translateX(${marqueeX}px)`)
  marqueeDuration > 0 && (styles.transitionDuration = `${marqueeDuration}s`)

  return styles
}
