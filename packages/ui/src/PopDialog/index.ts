import PopDialog from './PopDialog.vue'
import { createConfirmHook, createShowPopup } from '../popup/api'
import type { PopupSuccessConfirmArgs } from '../popup/types'
import type { Selector, PlacementType, EmptyObject } from '../helpers'

const showPopDialog = createShowPopup<
  {
    selector: Selector
    content: string
  } & Partial<{
    placement: PlacementType
    showCancel: boolean
    cancelText: string
    confirmText: string
  }>,
  PopupSuccessConfirmArgs<EmptyObject>
>({
  apiName: 'showPopDialog',
  component: PopDialog,
  createHook: createConfirmHook
})

export { PopDialog, showPopDialog }
export default PopDialog
