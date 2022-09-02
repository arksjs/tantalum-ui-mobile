import type { CSSProperties } from '../helpers/types'
import { rangeInteger } from '../helpers/util'

export const getClasses = (fixedBar?: boolean) => [
  'ak-progress',
  { 'fixed-bar': !!fixedBar }
]

export const getTrackClasses = (animated?: boolean) => [
  'ak-progress_track',
  { animated: !!animated }
]

export const getTrackStyles = (progress: string) => {
  return { width: progress } as CSSProperties
}

export const getStyles = (color?: string) => {
  const styles: CSSProperties = {}

  color && (styles['--ak-color'] = color)

  return styles
}

export const getProgress = (percentage: number | string) =>
  rangeInteger(percentage, 0, 100) + '%'
