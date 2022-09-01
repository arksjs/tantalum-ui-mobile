<template>
  <teleport to="body">
    <div
      :class="['fx-modal', popupClasses]"
      :style="popupStyles"
      v-bind="$attrs"
    >
      <div class="fx-mask" @click="onMaskClick"></div>
      <div class="fx-modal_box" :style="boxStyles">
        <div class="fx-modal_box-inner">
          <slot></slot>
        </div>
        <i v-if="showClose" class="fx-modal_close" @click="onCloseClick">
          <Icon :icon="CloseCircleFilled" />
        </i>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { usePopup } from '../popup/use-popup'
import { popupEmits, popupProps } from '../popup/popup'
import { Icon } from '../Icon'
import CloseCircleFilled from '../Icon/icons/CloseCircleFilled'
import { getBoxStyles } from './util'

export default defineComponent({
  name: 'fx-modal',
  components: { Icon },
  props: {
    ...popupProps,
    width: {
      type: String,
      default: null
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  emits: { ...popupEmits },
  setup(props, ctx) {
    const popup = usePopup(props, ctx, {})
    const boxStyles = computed(() => getBoxStyles(props.width))

    return {
      ...popup,
      boxStyles,
      CloseCircleFilled
    }
  }
})
</script>
