import type { PropType } from 'vue'
import { createEnumsValidator } from '../helpers/validator'
import type { AvatarShape, ButtonShape } from './types'
import { AVATAR_SHAPE_NAMES, BUTTON_SHAPE_NAMES } from './util'

// 指定头像的形状
export const propAvatarShape = {
  type: String as PropType<AvatarShape>,
  validator: createEnumsValidator(AVATAR_SHAPE_NAMES)
}

// 指定按钮的形状
export const propButtonShape = {
  type: String as PropType<ButtonShape>,
  validator: createEnumsValidator(BUTTON_SHAPE_NAMES)
}

// 是否显示动画
export const propAnimated = {
  type: Boolean,
  default: false
}

export const rootProps = {
  avatarShape: propAvatarShape,
  buttonShape: propButtonShape,
  // 设置段落占位图的行数
  paragraphRow: {
    type: Number
  },
  animated: propAnimated
}
