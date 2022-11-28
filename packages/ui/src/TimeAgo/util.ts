import type { TimeAgoProps } from './types'
import { isNumber, dayjs, type Dayjs, isString } from '../helpers'

export function getDate(props: TimeAgoProps) {
  let djs: Dayjs | null = null

  const { time, formatTemplate } = props

  if (time instanceof Date || isNumber(time)) {
    djs = dayjs(time)
  } else if (isString(time) && formatTemplate) {
    djs = dayjs(time, formatTemplate)
  }

  if (djs && djs.isValid()) {
    return djs.toDate()
  }

  return null
}
