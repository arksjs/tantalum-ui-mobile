import type { CalendarSourceDetail, CalendarDetail, Mode } from './types'
import Exception from '../helpers/exception'
import { getNumber, isInNumberRange } from '../helpers/util'
import dayjs from '../helpers/day'

const DEFAULT_MONTH_RANGE = 6
export const MODE_NAMES: Mode[] = ['single', 'range']

export function getDefaultSourceDetail(): CalendarSourceDetail {
  return {
    value: [],
    label: '',
    valueArray: [],
    rangeCount: 0
  }
}

export function getSourceDetail(
  newDetail: CalendarDetail
): CalendarSourceDetail {
  return Object.assign(newDetail.source, {
    valueArray: newDetail.valueArray,
    rangeCount: newDetail.rangeCount
  })
}

export function printError(message: string) {
  console.error(new Exception(message, Exception.TYPE.PROP_ERROR, 'Calendar'))
}

export function getFirstDayOfWeek(firstDayOfWeek?: number | string) {
  const num = getNumber(firstDayOfWeek, 0)

  return isInNumberRange(num, 0, 6) ? Math.round(num) : 0
}

export const getTimeByDate = (date: Date) =>
  dayjs(date).startOf('day').valueOf()

export const getMinTime = () => dayjs().startOf('day').valueOf()

export const getMaxTime = (minTime: number) =>
  dayjs(minTime).startOf('day').add(DEFAULT_MONTH_RANGE, 'month').valueOf()

export const getViewBodyTitleStyles = (titleY: number | null) => ({
  transform: `translate3d(0px, ${
    titleY == null ? '-100%' : titleY + 'px'
  }, 0px)`
})
