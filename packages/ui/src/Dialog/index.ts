import { withInstall } from '../helpers/with-install'
import Dialog from './Dialog.vue'
import { createConfirmHook, createShowPopup } from '../popup/api'
import type { PopupSuccessConfirmArgs } from '../popup/types'
import type { EmptyObject } from '../helpers/types'

const showDialog = createShowPopup<
  {
    content: string
  } & Partial<{
    title: string
    maskClosable: boolean
    showCancel: boolean
    cancelText: string
    confirmText: string
  }>,
  PopupSuccessConfirmArgs<EmptyObject>
>({
  apiName: 'showDialog',
  component: Dialog,
  createHook: createConfirmHook
})

export { Dialog, showDialog }
export default Dialog
export const install = withInstall(Dialog)
