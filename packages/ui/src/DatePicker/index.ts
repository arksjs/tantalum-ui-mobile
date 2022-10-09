import DatePicker from './DatePicker.vue'
import DatePickerPopup from './DatePickerPopup.vue'
import DatePickerView from './DatePickerView.vue'
import { createConfirmHook, createShowPopup } from '../popup/api'
import type { PopupSuccessConfirmArgs } from '../popup/types'
import type { ShowDatePickerOptions, DatePickerDetail } from './types'

const showDatePicker = createShowPopup<
  ShowDatePickerOptions,
  PopupSuccessConfirmArgs<DatePickerDetail>
>({
  apiName: 'showDatePicker',
  component: DatePickerPopup,
  createHook: createConfirmHook
})

export { DatePicker, DatePickerPopup, DatePickerView, showDatePicker }
export default DatePicker
