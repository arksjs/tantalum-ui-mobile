<template>
  <Drawer
    class="ta-notify"
    placement="top"
    :showMask="false"
    :visible="visible"
    :initialEnableBlurCancel="false"
    @visibleStateChange="onVisibleStateChange"
    @cancel="onCancel"
    @confirm="onConfirm"
    @update:visible="onUpdateVisible"
    ref="popupRef"
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
  </Drawer>
</template>

<script lang="ts">
import { defineComponent, toRef, type PropType } from 'vue'
import { Drawer } from '../Drawer'
import { NoticeBar } from '../NoticeBar'
import { popupEmits, popupProps } from '../popup/props'
import {
  iconValidator,
  type PropsToEmits,
  type StateType,
  type EmptyObject
} from '../helpers'
import type { IconData } from '../Icon/types'
import { useDelay } from '../hooks'
import type { NotifyEmits } from './types'
import { usePopupExtend } from '../popup/use-popup'
import type { OnCancel, OnVisibleStateChange } from '../popup/types'

export default defineComponent({
  name: 'ta-notify',
  components: { NoticeBar, Drawer },
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

    const popup = usePopupExtend<EmptyObject>(ctx)

    const onVisibleStateChange: OnVisibleStateChange = e => {
      if (e.state === 'show') {
        addDelayTask()
      }
      popup.onVisibleStateChange(e)
    }

    const onCancel: OnCancel = res => {
      removeDelayTask()

      popup.onCancel(res)
    }

    return {
      ...popup,
      onVisibleStateChange,
      onCancel
    }
  }
})
</script>
