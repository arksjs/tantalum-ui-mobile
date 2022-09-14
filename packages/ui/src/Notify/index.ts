import Notify from './Notify.vue'
import { createAlertHook, createShowPopup, createHidePopup } from '../popup/api'
import type { PopupSuccessAlertArgs } from '../popup/types'
import type { StateType } from '../helpers/types'

const showNotify = createShowPopup<
  | string
  | ({
      title: string
    } & Partial<{
      type: StateType
      icon: string
      duration: number
      backgroundColor: string
      color: string
      closable: boolean
    }>),
  PopupSuccessAlertArgs
>({
  apiName: 'showNotify',
  component: Notify,
  createHook: createAlertHook,
  singleMode: true,
  hookOptions: options => {
    if (options.duration == null) {
      options.duration = 1500
    }

    return options
  }
})

const hideNotify = createHidePopup({
  apiName: 'hideNotify'
})

export { Notify, showNotify, hideNotify }
export default Notify
