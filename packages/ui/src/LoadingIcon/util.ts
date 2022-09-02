import { getNumber } from '../helpers/util'
import type { LoadingIconProps } from './types'

export const DEFAULT_SIZE = 100
export const DEFAULT_STROKE_WIDTH = 5.37

export const getRealStrokeWidth = (props: LoadingIconProps) => {
  return (
    (getNumber(props.strokeWidth, DEFAULT_STROKE_WIDTH) /
      getNumber(props.size, DEFAULT_SIZE)) *
    896
  )
}
