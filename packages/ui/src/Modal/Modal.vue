<template>
  <teleport to="body">
    <div
      :class="['ta-modal', popupClasses]"
      :style="popupStyles"
      v-bind="$attrs"
    >
      <div class="ta-mask" @click="onMaskClick"></div>
      <div class="ta-modal_box" :style="boxStyles" ref="popupInnerEl">
        <div class="ta-modal_box-inner">
          <slot></slot>
        </div>
        <i v-if="showClose" class="ta-modal_close" @click="onCloseClick">
          <Icon :icon="CloseCircleFilled" />
        </i>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { usePopup } from '../popup/use-popup'
import { popupEmits, popupProps } from '../popup/props'
import { Icon } from '../Icon'
import CloseCircleFilled from '../Icon/icons/CloseCircleFilled'
import { getBoxStyles } from './util'
import type { PropsToEmits } from '../helpers'
import type { ModalEmits } from './types'

export default defineComponent({
  name: 'ta-modal',
  components: { Icon },
  props: {
    ...popupProps,
    width: {
      type: String
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  emits: { ...popupEmits } as PropsToEmits<ModalEmits>,
  setup(props, ctx) {
    const popup = usePopup(props, ctx, {
      initialFocusFixed: true,
      initialEnableBlurCancel: false
    })
    const boxStyles = computed(() => getBoxStyles(props.width))

    return {
      ...popup,
      boxStyles,
      CloseCircleFilled
    }
  }
})
</script>
