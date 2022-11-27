<template>
  <Modal
    class="ta-toast"
    :visible="visible"
    :showClose="false"
    :showMask="showMask"
    :maskClosable="maskClosable"
    @visibleStateChange="onVisibleStateChange"
    @confirm="onConfirm"
    @cancel="onCancel"
    @update:visible="onUpdateVisible"
    ref="popupRef"
  >
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
  </Modal>
</template>

<script lang="ts">
import { defineComponent, toRef, type PropType } from 'vue'
import { Modal } from '../Modal'
import { Icon } from '../Icon'
import { ActivityIndicator } from '../ActivityIndicator'
import { usePopupExtend } from '../popup/use-popup'
import { popupEmits, popupProps } from '../popup/popup'
import { createEnumsValidator, iconValidator } from '../helpers/validator'
import type { StateType, ToastEmits } from './types'
import CheckOutlined from '../Icon/icons/CheckOutlined'
import CloseOutlined from '../Icon/icons/CloseOutlined'
import type { IconData } from '../Icon/types'
import { STATE_TYPES } from './util'
import { useDelay } from '../hooks/use-delay'
import type { EmptyObject, PropsToEmits } from '../helpers/types'
import { OnCancel, OnVisibleStateChange } from '../popup/types'

export default defineComponent({
  name: 'ta-toast',
  components: { Icon, ActivityIndicator, Modal },
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
    maskClosable: {
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
      CheckOutlined,
      CloseOutlined,
      onVisibleStateChange,
      onCancel
    }
  }
})
</script>
