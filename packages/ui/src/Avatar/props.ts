import type { PropType } from 'vue'
import type { AvatarSize } from './types'
import { SIZE_TYPES } from '../helpers'

export const avatarProps = {
  size: {
    type: [Number, String] as PropType<AvatarSize>,
    default: SIZE_TYPES[0]
  }
}
