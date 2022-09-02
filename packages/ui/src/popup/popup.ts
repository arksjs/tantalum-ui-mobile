import type { PropsToEmits } from '../helpers/types'
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
  'update:visible': visible => typeof visible === 'boolean',
  cancel: payload => payload && typeof payload.source === 'string',
  confirm: payload => !!payload
}

export const popupExtendProps = {
  visible: {
    type: Boolean,
    default: false
  }
}
