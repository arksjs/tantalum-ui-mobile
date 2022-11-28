<template>
  <teleport to="body">
    <div
      :class="['ta-toast', popupClasses]"
      :style="popupStyles"
      v-bind="$attrs"
    >
      <div class="ta-toast_box">
        <ActivityIndicator
          class="ta-toast_icon"
          :size="21"
          color="#ffffff"
          v-if="type === 'loading'"
        />
        <Icon
          v-else-if="type === 'success'"
          class="ta-toast_icon"
          :icon="CheckOutlined"
        />
        <Icon
          v-else-if="type === 'fail'"
          class="ta-toast_icon"
          :icon="CloseOutlined"
        />
        <Icon v-else-if="icon" class="ta-toast_icon" :icon="icon" />
        <div class="ta-toast_text">
          {{ title }}
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, toRef, type PropType } from 'vue'
import { Icon } from '../Icon'
import { ActivityIndicator } from '../ActivityIndicator'
import { usePopup } from '../popup/use-popup'
import { popupEmits, popupProps } from '../popup/popup'
import {
  createEnumsValidator,
  iconValidator,
  type PropsToEmits
} from '../helpers'
import type { StateType, ToastEmits } from './types'
import CheckOutlined from '../Icon/icons/CheckOutlined'
import CloseOutlined from '../Icon/icons/CloseOutlined'
import type { IconData } from '../Icon/types'
import { STATE_TYPES } from './util'
import { useDelay } from '../hooks'

export default defineComponent({
  name: 'ta-toast',
  components: { Icon, ActivityIndicator },
  props: {
    ...popupProps,
    title: {
      type: String,
      default: ''
    },
    type: {
      type: String as PropType<StateType>,
      validator: createEnumsValidator(STATE_TYPES),
      default: 'default'
    },
    icon: {
      type: [String, Object] as PropType<IconData>,
      validator: iconValidator
    },
    showMask: {
      type: Boolean,
      default: false
    },
    // 展示时长(ms)，值为 0 时，notify 不会消失
    duration: {
      type: Number,
      default: 0
    }
  },
  emits: { ...popupEmits } as PropsToEmits<ToastEmits>,
  setup(props, ctx) {
    const { addDelayTask, removeDelayTask } = useDelay(() => {
      popup.customCancel('auto', true)
    }, toRef(props, 'duration'))

    const popup = usePopup(props, ctx, {
      initialForbidScroll: false,
      initialEnableBlurCancel: false,
      emitCallback(event, res) {
        if (event === 'cancel') {
          removeDelayTask()
        } else if (event === 'visibleStateChange' && res.state === 'show') {
          addDelayTask()
        }
      }
    })

    return {
      ...popup,
      CheckOutlined,
      CloseOutlined
    }
  }
})
</script>
