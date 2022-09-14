import ActionSheet from './ActionSheet.vue'
import { createConfirmHook, createShowPopup } from '../popup/api'
import type { PopupSuccessConfirmArgs } from '../popup/types'
import type { Option, Detail } from './types'

const showActionSheet = createShowPopup<
  {
    options: Option[]
    title?: string
    showCancel?: boolean
    cancelText?: string
  },
  PopupSuccessConfirmArgs<Detail>
>({
  apiName: 'showActionSheet',
  component: ActionSheet,
  createHook: createConfirmHook
})

export { ActionSheet, showActionSheet }
export default ActionSheet
