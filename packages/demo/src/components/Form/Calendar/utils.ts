import dayjs from 'dayjs'
import { CalendarValueFormatter, CalendarValueParser } from '@/index'

export const template = 'YYYY年MM月DD日'

export const formatter: CalendarValueFormatter = (valueArray, mode) => {
  const value =
    valueArray.length === 0
      ? ''
      : mode === 'range'
      ? valueArray
          .map(date => {
            return dayjs(date).format(template)
          })
          .join(' ~ ')
      : dayjs(valueArray[0]).format(template)

  return {
    value,
    label: value
  }
}

export const parser: CalendarValueParser = (value, mode) => {
  if (mode === 'range') {
    return value
      ? (value as string).split(' ~ ').map(v => {
          return dayjs(v, template, true).toDate()
        })
      : []
  } else {
    return value ? [dayjs(value as string, template, true).toDate()] : []
  }
}
