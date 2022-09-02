import type { FocusWithoutEventEmits, FormItemCommonProps } from '../Form/types'
import type { PickerCommonEmits } from '../Picker/types'
import type { PopupEmits, PopupProps, PopupRef } from '../popup/types'
import type {
  SelectorValue,
  SelectorModelValue,
  SelectorDetail
} from '../SelectorField/types'

export interface CalendarDetail extends SelectorDetail {
  valueArray: number[][]
  rangeCount: number
}
export interface CalendarOriginalDetail extends CalendarDetail {
  value: SelectorValue[]
}

export type OnConfirm = (payload: CalendarDetail) => void
export type OnSelect = (payload: CalendarDetail) => void

export type Mode = 'single' | 'range'

export interface DayInfo {
  cover?: boolean
  topHighlight?: boolean
  topText?: string
  state: string
  bottomHighlight?: boolean
  bottomText?: string
  text: string
  dateString: string
  date?: Date
  timestamp: number
}

export type DayHandler = (dayInfo: DayInfo) => DayInfo

export interface Month {
  caption: string
  monthString: string
  days: DayInfo[]
  startDay: number
}

export type ShowCalendarOptions = Partial<{
  title: string
  value: SelectorModelValue
  showConfirm: boolean
  showClose: boolean
  minDate: Date
  maxDate: Date
  mode: Mode
  allowSameDay: boolean
  maxRange: number
  dayHandler: DayHandler
}>

export interface ValueFormatter {
  (valueArray: Date[], mode: Mode): SelectorDetail | SelectorModelValue
}
export interface ValueParser {
  (value: unknown, mode: Mode): Date[]
}

/**
 * CalendarCommon
 */

export interface CalendarCommonProps {
  value?: SelectorModelValue
  minDate?: Date
  maxDate?: Date
  initialMode?: Mode
  allowSameDay?: boolean
  maxRange?: number | string
  dayHandler?: DayHandler
  firstDayOfWeek?: number | string
  formatter?: ValueFormatter
  parser?: ValueParser
}

/**
 * CalendarView
 */
export type CalendarViewProps = CalendarCommonProps

export interface CalendarViewEmits extends PickerCommonEmits {
  onSelect?: OnSelect
}

export interface CalendarViewRef {
  getDetail: () => CalendarDetail
}

/**
 * CalendarPopup
 */
export interface CalendarPopupProps extends PopupProps, CalendarCommonProps {
  title?: string
  showConfirm?: boolean
  showClose?: boolean
}

export interface CalendarPopupEmits extends PopupEmits, PickerCommonEmits {
  onConfirm?: OnConfirm
}

export interface CalendarPopupRef extends PopupRef, CalendarViewRef {}

/**
 * Calendar
 */
export interface CalendarProps
  extends FormItemCommonProps,
    CalendarCommonProps {
  placeholder?: string
  showConfirm?: boolean
  showClose?: boolean
}

export interface CalendarEmits
  extends FocusWithoutEventEmits,
    PickerCommonEmits {}
