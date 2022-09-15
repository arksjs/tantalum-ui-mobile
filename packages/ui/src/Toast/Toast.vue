<template>
  <teleport to="body">
    <div
      :class="['ak-toast', popupClasses, { 'no--mask': !showMask }]"
      :style="popupStyles"
      v-bind="$attrs"
    >
      <div :class="boxClasses">
        <ActivityIndicator
          class="ak-toast_icon"
          :size="21"
          color="#ffffff"
          v-if="type === 'loading'"
        />
        <Icon
          v-else-if="type === 'success'"
          class="ak-toast_icon"
          :icon="CheckOutlined"
        />
        <Icon
          v-else-if="type === 'fail'"
          class="ak-toast_icon"
          :icon="CloseOutlined"
        />
        <Icon v-else-if="icon" class="ak-toast_icon" :icon="icon" />
        <div class="ak-toast_text">
          {{ title }}
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, computed, toRef } from 'vue'
import type { PropType } from 'vue'
import { Icon } from '../Icon'
import { ActivityIndicator } from '../ActivityIndicator'
import { usePopup } from '../popup/use-popup'
import { popupEmits, popupProps } from '../popup/popup'
import { createEnumsValidator, iconValidator } from '../helpers/validator'
import type { StateType } from './types'
import CheckOutlined from '../Icon/icons/CheckOutlined'
import CloseOutlined from '../Icon/icons/CloseOutlined'
import type { IconData } from '../Icon/types'
import { getBoxClasses, STATE_TYPES } from './util'
import { useDelay } from '../hooks/use-delay'

export default defineComponent({
  name: 'ak-toast',
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
  emits: { ...popupEmits },
  setup(props, ctx) {
    const { addDelayTask, removeDelayTask } = useDelay(() => {
      popup.customCancel('auto', true)
    }, toRef(props, 'duration'))

    const popup = usePopup(props, ctx, {
      initialForbidScroll: false,
      afterCancel: removeDelayTask,
      afterShow: addDelayTask
    })

    const boxClasses = computed(() => getBoxClasses(props))

    return {
      ...popup,
      boxClasses,
      CheckOutlined,
      CloseOutlined
    }
  }
})
</script>
