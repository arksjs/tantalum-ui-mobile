import Picker from './Picker.vue'
import PickerPopup from './PickerPopup.vue'
import PickerView from './PickerView.vue'
import { createConfirmHook, createShowPopup } from '../popup/api'
import type { PopupSuccessConfirmArgs } from '../popup/types'
import type { ShowPickerOptions } from './types'
import type { SelectorDetail } from '../SelectorField/types'

const showPicker = createShowPopup<
  ShowPickerOptions,
  PopupSuccessConfirmArgs<SelectorDetail>
>({
  apiName: 'showPicker',
  component: PickerPopup,
  createHook: createConfirmHook
})

export { Picker, PickerPopup, PickerView, showPicker }
export default Picker
