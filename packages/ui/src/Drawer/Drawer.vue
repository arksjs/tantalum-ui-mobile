<template>
  <teleport to="body">
    <div :class="[popupClasses, classes]" :style="popupStyles" v-bind="$attrs">
      <div class="ta-mask" @click="onMaskClick"></div>
      <div :class="innerClasses" :style="innerStyles">
        <slot name="header">
          <NavBar
            v-if="hasHeader"
            class="ta-drawer_header"
            :title="title"
            :rightButtons="
              showClose ? [{ icon: CloseOutlined, text: 'close' }] : []
            "
            :iconOnly="true"
            @rightButtonClick="onHeaderRightClick"
          >
          </NavBar>
        </slot>
        <div class="ta-drawer_body">
          <slot></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, watch } from 'vue'
import type { PropType } from 'vue'
import { NavBar } from '../NavBar'
import { usePopup } from '../popup/use-popup'
import { popupEmits, popupProps } from '../popup/popup'
import { useSafeAreaInsets } from '../hooks/use-safe-area-insets'
import { createEnumsValidator, getEnumsValue } from '../helpers/validator'
import { PLACEMENT_TYPES } from '../helpers/constants'
import type { PlacementType, PropsToEmits } from '../helpers/types'
import CloseOutlined from '../Icon/icons/CloseOutlined'
import { getClasses, getInnerClasses, getInnerStyles } from './util'
import type { DrawerEmits } from './types'

export default defineComponent({
  name: 'ta-drawer',
  components: { NavBar },
  props: {
    ...popupProps,
    title: {
      type: String,
      default: null
    },
    placement: {
      type: String as PropType<PlacementType>,
      validator: createEnumsValidator(PLACEMENT_TYPES),
      default: getEnumsValue(PLACEMENT_TYPES)
    },
    showClose: {
      type: Boolean,
      default: false
    },
    // 是否开启安全区
    enableSafeAreaInsets: {
      type: Boolean,
      default: true
    },
    showMask: {
      type: Boolean,
      default: true
    }
  },
  emits: { ...popupEmits } as PropsToEmits<DrawerEmits>,
  setup(props, ctx) {
    const popup = usePopup(props, ctx, {})
    const { safeAreaInsets } = useSafeAreaInsets(
      toRef(props, 'enableSafeAreaInsets')
    )

    const hasHeader = computed(
      () => !!(props.title || props.showClose || ctx.slots.header)
    )

    const innerStyles = computed(() =>
      getInnerStyles({
        placement: props.placement,
        safeAreaInsets
      })
    )

    function onHeaderRightClick() {
      if (props.showClose) {
        popup.onCloseClick()
      }
    }

    watch(
      () => props.showMask,
      val => popup.setEnableBlurCancel(!val),
      { immediate: true }
    )

    const classes = computed(() => getClasses(props.showMask))
    const innerClasses = computed(() =>
      getInnerClasses({
        placement: props.placement,
        hasHeader: hasHeader.value
      })
    )

    return {
      ...popup,
      classes,
      innerClasses,
      hasHeader,
      innerStyles,
      onHeaderRightClick,
      CloseOutlined
    }
  }
})
</script>
