import type {
  SelectorModelValue,
  SelectorValueFormatter,
  SelectorValueParser
} from '../SelectorField/types'
import type { ColRow, PickerCommonEmits, PickerDetail } from '../Picker/types'
import type { PopupEmits, PopupProps } from '../popup/types'
import type { FocusWithoutEventEmits, FormItemCommonProps } from '../Form/types'

export type ColName = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'
export type Mode =
  | 'date'
  | 'time'
  | 'datetime'
  | 'minute-second'
  | 'hour-minute'
  | 'hour-minute-second'
  | 'day-hour'
  | 'month-day'
  | 'month-day-hour'
  | 'month-day-hour-minute'
  | 'year-month'
  | 'year-month-day'
  | 'year-month-day-hour'
  | 'year-month-day-hour-minute'
  | 'year-month-day-hour-minute-second'

export interface OptionFilter {
  (number: number, type: ColName): boolean
}

export interface RowsParser {
  (
    index: number,
    parent: ColRow | null,
    options: {
      minDate: Date
      maxDate: Date
      mode: Mode
      filter: OptionFilter
    }
  ): ColRow[]
}

export interface DatePickerDetail {
  value: number[]
  label: string
}

export type OnConfirm = (payload: DatePickerDetail) => void

export type ShowDatePickerOptions = Partial<{
  title: string
  value: Date
  minDate: Date
  maxDate: Date
  mode: Mode
  filter: OptionFilter
}>

export interface DatePickerCommonProps {
  modelValue?: SelectorModelValue
  formatTemplate?: string
  initialMode?: Mode
  minDate?: Date
  maxDate?: Date
  filter?: OptionFilter
  formatter?: SelectorValueFormatter
  parser?: SelectorValueParser
}

export type DatePickerViewProps = DatePickerCommonProps
export type DatePickerViewEmits = PickerCommonEmits

export interface DatePickerPopupProps
  extends PopupProps,
    DatePickerCommonProps {
  title?: string
}
export interface DatePickerPopupEmits extends PopupEmits, PickerCommonEmits {
  onConfirm?: OnConfirm
}

export interface DatePickerProps
  extends FormItemCommonProps,
    DatePickerCommonProps {
  placeholder?: string
}
export interface DatePickerEmits
  extends FocusWithoutEventEmits,
    PickerCommonEmits {}
