import { isBoolean, isString, type PropsToEmits } from '../helpers'
import type { PopupEmits } from './types'
import { VISIBLE_STATE_TYPES } from './util'

export const popupProps = {
  visible: {
    type: Boolean,
    default: false
  },
  maskClosable: {
    type: Boolean,
    default: true
  }
}

export const popupEmits: PropsToEmits<PopupEmits> = {
  visibleStateChange: payload =>
    payload && VISIBLE_STATE_TYPES.includes(payload.state),
  'update:visible': visible => isBoolean(visible),
  cancel: payload => payload && isString(payload.source),
  confirm: payload => !!payload
}

export const popupExtendProps = {
  visible: {
    type: Boolean,
    default: false
  }
}
