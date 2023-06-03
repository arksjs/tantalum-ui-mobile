import type { PropType } from 'vue'
import { getNumber, isInNumberRange, isInteger, createEnumsValidator, isNumber } from '../helpers'
import type { DayHandler, Mode, ValueFormatter, ValueParser, CalendarSelectorDetail } from './types'
import { isPickerDetail } from '../Picker/props'
import type { SelectorModelValue } from '../SelectorField/types'
import { MODE_NAMES } from './util'

export const commonProps = {
  modelValue: {
    type: [Date, String, Number, Array] as PropType<SelectorModelValue>
  },
  minDate: {
    type: Date
  },
  maxDate: {
    type: Date
  },
  initialMode: {
    type: String as PropType<Mode>,
    validator: createEnumsValidator(MODE_NAMES),
    default: MODE_NAMES[0]
  },
  allowSameDay: {
    type: Boolean,
    default: false
  },
  maxRange: {
    type: Number,
    default: Infinity
  },
  dayHandler: {
    type: Function as PropType<DayHandler>
  },
  firstDayOfWeek: {
    type: [Number, String],
    validator: (val: number | string) => {
      const num = getNumber(val, -1)
      return isInteger(num) && isInNumberRange(num, 0, 6)
    },
    default: 0
  },
  formatter: {
    type: Function as PropType<ValueFormatter>
  },
  parser: {
    type: Function as PropType<ValueParser>
  }
}

export const calendarDetailValidator = (payload: CalendarSelectorDetail) =>
  isPickerDetail(payload) && isNumber(payload.rangeCount) && Array.isArray(payload.valueArray)
