import type { CSSProperties } from '../helpers/types'
import { rangeInteger } from '../helpers/util'

export const getClasses = (fixedBar?: boolean) => [
  'fx-progress',
  { 'fixed-bar': !!fixedBar }
]

export const getTrackClasses = (animated?: boolean) => [
  'fx-progress_track',
  { animated: !!animated }
]

export const getTrackStyles = (progress: string) => {
  return { width: progress } as CSSProperties
}

export const getStyles = (color?: string) => {
  const styles: CSSProperties = {}

  color && (styles['--fx-color'] = color)

  return styles
}

export const getProgress = (percentage: number | string) =>
  rangeInteger(percentage, 0, 100) + '%'
