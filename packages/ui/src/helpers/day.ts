import dayjs from 'dayjs'
import toArray from 'dayjs/plugin/toArray'
// import minMax from 'dayjs/plugin/minMax'
import CustomParseFormat from 'dayjs/plugin/customParseFormat'

const newDayjs = dayjs

newDayjs.extend(toArray)
// dayjs.extend(minMax)
newDayjs.extend(CustomParseFormat)

export default newDayjs
