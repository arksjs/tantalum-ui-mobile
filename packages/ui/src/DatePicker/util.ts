import { dayjs } from '../helpers'

export const getMinDate = () =>
  dayjs().startOf('day').subtract(9, 'year').toDate()

export const getMaxDate = () =>
  dayjs().add(1, 'day').startOf('day').subtract(1, 'second').toDate()

export const handleMinMaxDate = (minDate: Date, maxDate: Date) => {
  if (minDate.getTime() > maxDate.getTime()) {
    // 兼容min max搞反的问题
    maxDate = [minDate, (minDate = maxDate)][0]
  }

  return { minDate, maxDate }
}
