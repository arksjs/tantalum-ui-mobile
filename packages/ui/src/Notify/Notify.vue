<template>
  <teleport to="body">
    <div
      class="ta-notify"
      :class="popupClasses"
      :style="popupStyles"
      v-bind="$attrs"
    >
      <NoticeBar
        class="ta-notify_inner"
        :type="type"
        :leftIcon="icon"
        :title="title"
        :color="color"
        :mode="closable ? 'closable' : 'default'"
        @closeClick="onCloseClick"
      />
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'
import type { PropType } from 'vue'
import { NoticeBar } from '../NoticeBar'
import { usePopup } from '../popup/use-popup'
import { popupEmits, popupProps } from '../popup/popup'
import { iconValidator } from '../helpers/validator'
import type { PropsToEmits, StateType } from '../helpers/types'
import type { IconData } from '../Icon/types'
import { useDelay } from '../hooks/use-delay'
import type { NotifyEmits } from './types'

export default defineComponent({
  name: 'ta-notify',
  components: { NoticeBar },
  props: {
    ...popupProps,
    closable: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    icon: {
      type: [String, Object] as PropType<IconData>,
      validator: iconValidator
    },
    color: {
      type: String
    },
    // 展示时长(ms)，值为 0 时，notify 不会消失
    duration: {
      type: Number,
      default: 0
    },
    // 类型
    type: {
      type: String as PropType<StateType>
    }
  },
  emits: {
    ...popupEmits
  } as PropsToEmits<NotifyEmits>,
  setup(props, ctx) {
    const { addDelayTask, removeDelayTask } = useDelay(() => {
      popup.customCancel('auto', true)
    }, toRef(props, 'duration'))

    const popup = usePopup(props, ctx, {
      initialForbidScroll: false,
      initialFocusFixed: true,
      afterCancel: removeDelayTask,
      afterShow: addDelayTask
    })

    return {
      ...popup
    }
  }
})
</script>
