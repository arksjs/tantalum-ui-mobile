import {
  getEnumsValue,
  STATE_TYPES,
  getColorObject,
  type CSSProperties,
  type StateType
} from '../helpers'

export const getClasses = (type?: StateType) => {
  return ['ta-notice-bar', 'type--' + getEnumsValue(STATE_TYPES, type)]
}

export const getStyles = (color?: string) => {
  const styles: CSSProperties = {}

  const colorObj = getColorObject(color)
  if (colorObj.hasColor) {
    styles[`--ta-color`] = colorObj.varBackgroundColor
    styles[`--ta-front-color`] = colorObj.varFrontColor
  }

  return styles
}

export const getContentClasses = (marquee?: boolean) => {
  return [
    'ta-notice-bar_content-inner',
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
