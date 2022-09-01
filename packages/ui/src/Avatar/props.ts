import type { PropType } from 'vue'
import type { UserSizeType } from './types'
import { SIZE_TYPES } from './util'

export const avatarProps = {
  size: {
    type: [Number, String] as PropType<UserSizeType>,
    default: SIZE_TYPES[0]
  }
}
