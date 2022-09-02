import { provide } from 'vue'
import dayjs from '../helpers/day'
import type { Dayjs } from '../helpers/types'
import { getEnumsValue } from '../helpers/validator'
import type {
  PickerOptionsHandler,
  PickerLabelFormatter,
  PickerHandlers
} from '../Picker/types'
import type {
  SelectorValueParser,
  SelectorValueFormatter
} from '../SelectorField/types'
import {
  array2Date,
  day2Array,
  getFormatTemplate,
  MODE_NAMES,
  parseRows
} from './date'
import { rangeNumber, returnTrue } from '../helpers/util'
import type { DatePickerCommonProps } from './types'
import { getMaxDate, getMinDate, handleMinMaxDate } from './util'

export function useHandlers(props: DatePickerCommonProps) {
  const mode = getEnumsValue(MODE_NAMES, props.initialMode)
  const defaultMinDate = getMinDate()
  const defaultMaxDate = getMaxDate()

  const optionsHandler: PickerOptionsHandler = (index, parent) => {
    const { minDate, maxDate } = handleMinMaxDate(
      props.minDate ?? defaultMinDate,
      props.maxDate ?? defaultMaxDate
    )
    const filter = props.filter || returnTrue

    return parseRows(index, parent || null, {
      filter,
      minDate,
      maxDate,
      mode
    })
  }

  const parser: SelectorValueParser = value => {
    if (props.parser) {
      return props.parser(value)
    }

    let djs: Dayjs | null = null

    if (value instanceof Date) {
      djs = dayjs(value)
    } else if (
      props.formatTemplate &&
      value != null &&
      value !== '' &&
      typeof value === 'string'
    ) {
      djs = dayjs(value as string, props.formatTemplate, true)
    }

    return day2Array(djs, mode)
  }

  const defaultValueGetter = () => {
    const { minDate, maxDate } = handleMinMaxDate(
      props.minDate ?? defaultMinDate,
      props.maxDate ?? defaultMaxDate
    )

    return parser(
      new Date(rangeNumber(Date.now(), minDate.getTime(), maxDate.getTime()))
    )
  }

  const labelFormatter: PickerLabelFormatter = array => {
    return array.length === 0
      ? ''
      : dayjs(array2Date(array, mode)).format(
          getFormatTemplate(mode, props.formatTemplate)
        )
  }

  const formatter: SelectorValueFormatter = (valueArray, labelArray) => {
    if (valueArray.length === 0) {
      // 如果是空数据value用空字符串替代
      return {
        value: '',
        label: ''
      }
    }

    if (props.formatter) {
      return props.formatter(valueArray, labelArray)
    }

    const label = labelFormatter(labelArray)
    return {
      value: props.formatTemplate ? label : array2Date(valueArray, mode),
      label
    }
  }

  const handlers: PickerHandlers = {
    optionsHandler,
    formatter,
    parser,
    defaultValueGetter,
    labelFormatter
  }

  provide('akPickerHandlers', handlers)

  return { handlers }
}
