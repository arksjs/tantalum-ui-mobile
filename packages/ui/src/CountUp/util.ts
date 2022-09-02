import { isNumber } from '../helpers/util'
import type { Speed } from './types'

export const SpeedMap = new Map<Speed, number>([
  ['normal', 50],
  ['fast', 10],
  ['slow', 100]
])

export function getDuration(diff: number, speed: Speed) {
  if (isNumber(speed)) {
    return speed as number
  }

  return Math.max(
    Math.abs(diff) *
      (SpeedMap.get(speed as 'normal') || (SpeedMap.get('normal') as number)),
    1000
  )
}
