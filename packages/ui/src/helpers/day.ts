import _dayjs from 'dayjs'
import toArray from 'dayjs/plugin/toArray'
// import minMax from 'dayjs/plugin/minMax'
import CustomParseFormat from 'dayjs/plugin/customParseFormat'

export type { Dayjs } from 'dayjs'

const newDayjs = _dayjs

newDayjs.extend(toArray)
// dayjs.extend(minMax)
newDayjs.extend(CustomParseFormat)

export const dayjs = newDayjs
