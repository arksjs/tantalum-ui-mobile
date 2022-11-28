import { rangeInteger, type CSSProperties } from '../helpers'

export const getClasses = (fixedBar?: boolean) => [
  'ta-progress',
  { 'fixed-bar': !!fixedBar }
]

export const getTrackClasses = (animated?: boolean) => [
  'ta-progress_track',
  { animated: !!animated }
]

export const getTrackStyles = (progress: string) => {
  return { width: progress } as CSSProperties
}

export const getStyles = (color?: string) => {
  const styles: CSSProperties = {}

  color && (styles['--ta-color'] = color)

  return styles
}

export const getProgress = (percentage: number | string) =>
  rangeInteger(percentage, 0, 100) + '%'
