import type { ColRow } from '../Picker/types'
import type { SelectorValue } from '../SelectorField/types'
import type { ColName, Mode, RowsParser } from './types'
import { dayjs, type Dayjs } from '../helpers'

export const MODE_NAMES: Mode[] = [
  'date',
  'time',
  'datetime',
  'minute-second',
  'hour-minute',
  'hour-minute-second',
  'day-hour',
  'month-day',
  'month-day-hour',
  'month-day-hour-minute',
  'year-month',
  'year-month-day',
  'year-month-day-hour',
  'year-month-day-hour-minute',
  'year-month-day-hour-minute-second'
]

interface ColMapItem {
  colNames: ColName[]
  template: string
  isDateTime: boolean
}

const ModeColMap = new Map<Mode, ColMapItem>([
  [
    'date',
    {
      template: 'YYYY-MM-DD',
      isDateTime: false,
      colNames: ['year', 'month', 'day']
    }
  ],
  [
    'time',
    {
      template: 'HH:mm:ss',
      isDateTime: false,
      colNames: ['hour', 'minute', 'second']
    }
  ],
  [
    'datetime',
    {
      template: 'YYYY-MM-DD HH:mm:ss',
      isDateTime: true,
      colNames: ['year', 'month', 'day', 'hour', 'minute', 'second']
    }
  ],
  [
    'minute-second',
    { template: 'mm:ss', isDateTime: false, colNames: ['minute', 'second'] }
  ],
  [
    'hour-minute',
    { template: 'HH:mm', isDateTime: false, colNames: ['hour', 'minute'] }
  ],
  [
    'hour-minute-second',
    {
      template: 'HH:mm:ss',
      isDateTime: false,
      colNames: ['hour', 'minute', 'second']
    }
  ],
  [
    'day-hour',
    { template: 'DD HH', isDateTime: true, colNames: ['day', 'hour'] }
  ],
  [
    'month-day',
    { template: 'MM-DD', isDateTime: false, colNames: ['month', 'day'] }
  ],
  [
    'month-day-hour',
    {
      template: 'MM-DD HH',
      isDateTime: true,
      colNames: ['month', 'day', 'hour']
    }
  ],
  [
    'month-day-hour-minute',
    {
      template: 'MM-DD HH:mm',
      isDateTime: true,
      colNames: ['month', 'day', 'hour', 'minute']
    }
  ],
  [
    'year-month',
    { template: 'YYYY-MM', isDateTime: false, colNames: ['year', 'month'] }
  ],
  [
    'year-month-day',
    {
      template: 'YYYY-MM-DD',
      isDateTime: false,
      colNames: ['year', 'month', 'day']
    }
  ],
  [
    'year-month-day-hour',
    {
      template: 'YYYY-MM-DD HH',
      isDateTime: true,
      colNames: ['year', 'month', 'day', 'hour']
    }
  ],
  [
    'year-month-day-hour-minute',
    {
      template: 'YYYY-MM-DD HH:mm',
      isDateTime: true,
      colNames: ['year', 'month', 'day', 'hour', 'minute']
    }
  ],
  [
    'year-month-day-hour-minute-second',
    {
      template: 'YYYY-MM-DD HH:mm:ss',
      isDateTime: true,
      colNames: ['year', 'month', 'day', 'hour', 'minute', 'second']
    }
  ]
])

function getCopMapItem(mode: Mode) {
  return ModeColMap.get(mode) as ColMapItem
}

// function num2Str(num: number) {
//   return num >= 10 ? num.toString() : '0' + num
// }

export const parseRows: RowsParser = (
  index,
  parent,
  { minDate, maxDate, mode, filter }
) => {
  const { colNames } = getCopMapItem(mode)
  const colName = colNames[index]
  const parentIndexes = parent?.indexes || []
  const parentValues = (parent?.values as number[]) || []
  const rows: ColRow[] = []

  function pushRow(i: number, j: number) {
    if (filter(i, colName) !== false) {
      rows.push({
        label: i.toString(),
        value: i,
        indexes: [...parentIndexes, j],
        values: [...parentValues, i],
        hasChildren: index < colNames.length - 1
      })
    }
  }

  if (colName === 'year') {
    // 年
    const min = minDate.getFullYear()
    const max = maxDate.getFullYear()

    for (let i = min, j = 0; i <= max; i++, j++) {
      pushRow(i, j)
    }
  } else if (colName === 'month') {
    // 月
    parent = parent as ColRow

    const min = 1
    const max = 12

    let djs = dayjs()
    if (parentValues.length > 0) {
      djs = djs.year(parentValues[0])
    }
    djs = djs.startOf('year')
    const d = djs.toDate()

    for (let i = min, j = 0; i <= max; i++, j++) {
      d.setMonth(i - 1)

      if (
        d.getTime() >= minDate.getTime() &&
        d.getTime() <= maxDate.getTime()
      ) {
        pushRow(i, j)
      }
    }
  } else if (colName === 'day') {
    // 日
    let djs = dayjs()
    if (parentValues.length > 1) {
      djs = djs.year(parentValues[0]).month(parentValues[1] - 1)
    } else if (parentValues.length > 0) {
      djs = djs.month(parentValues[0] - 1)
    }
    djs = djs.startOf('month')

    const min = 1
    const max = djs.daysInMonth()
    const d = djs.toDate()

    for (let i = min, j = 0; i <= max; i++, j++) {
      d.setDate(i)

      if (
        d.getTime() >= minDate.getTime() &&
        d.getTime() <= maxDate.getTime()
      ) {
        pushRow(i, j)
      }
    }
  } else {
    // if (!isDateTime) {
    //   minDate = dayjs()
    //     .startOf('day')
    //     .toDate()
    //   maxDate = dayjs()
    //     .add(1, 'day')
    //     .startOf('day')
    //     .toDate()
    // }

    let djs = dayjs()
    if (colName === 'hour') {
      djs = djs.startOf('day')
    } else if (colName === 'minute') {
      if (parentValues.length > 0) {
        djs = djs.hour(parentValues[parentValues.length - 1])
      }

      djs = djs.startOf('hour')
    } else {
      if (parentValues.length > 1) {
        djs = djs.hour(parentValues[parentValues.length - 2])
      }
      if (parentValues.length > 0) {
        djs = djs.minute(parentValues[parentValues.length - 1])
      }
      djs = djs.startOf('minute')
    }

    for (let i = 0, max = colName === 'hour' ? 24 : 60; i < max; i++) {
      if (colName === 'hour') {
        djs = djs.hour(i)
      } else if (colName === 'minute') {
        djs = djs.minute(i)
      } else {
        djs = djs.second(i)
      }

      if (
        djs.valueOf() >= minDate.getTime() &&
        djs.valueOf() <= maxDate.getTime()
      ) {
        pushRow(i, i)
      }
    }
  }

  return rows
}

export function array2Date(array: SelectorValue[], mode: Mode) {
  let djs = dayjs().millisecond(0)

  const { colNames } = getCopMapItem(mode)

  // 补0
  switch (colNames[colNames.length - 1]) {
    case 'minute': {
      djs = djs.second(0)
      break
    }
    case 'hour': {
      djs = djs.minute(0).second(0)
      break
    }
    case 'day': {
      djs = djs.hour(0).minute(0).second(0)
      break
    }
    case 'month': {
      djs = djs.date(1).hour(0).minute(0).second(0)
      break
    }
    default:
      break
  }

  array.forEach((v, k) => {
    const colName = colNames[k]
    v = v as number

    djs = djs[(colName === 'day' ? 'date' : colName) as 'hour'](
      colName === 'month' ? v - 1 : v
    )
  })

  return djs.toDate()
}

export function getFormatTemplate(mode: Mode, template?: string) {
  return template ?? getCopMapItem(mode).template
}

export function day2Array(djs: Dayjs | null, mode: Mode) {
  const dNameIndexes: ColName[] = [
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second'
  ]

  const { colNames } = getCopMapItem(mode)
  const valueArray: number[] = []

  if (djs && djs.isValid()) {
    const dArray = djs.toArray()
    dArray[1] = dArray[1] + 1

    colNames.forEach(name => {
      valueArray.push(dArray[dNameIndexes.indexOf(name)])
    })
  }

  return valueArray
}
