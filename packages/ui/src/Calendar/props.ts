import type { PropType } from 'vue'
import { isInNumberRange, isInteger } from '../helpers/util'
import type {
  DayHandler,
  Mode,
  ValueFormatter,
  ValueParser,
  CalendarDetail
} from './types'
import { createEnumsValidator } from '../helpers/validator'
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
    validator: (val: number) => {
      return isInteger(val) && isInNumberRange(val, 0, 6)
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

export const calendarDetailValidator = (payload: CalendarDetail) =>
  isPickerDetail(payload) &&
  typeof payload.rangeCount === 'number' &&
  Array.isArray(payload.valueArray)
