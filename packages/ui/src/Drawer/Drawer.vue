<template>
  <teleport to="body">
    <div :class="['ta-drawer', popupClasses]" :style="popupStyles" v-bind="$attrs">
      <div class="ta-mask" @click="onMaskClick"></div>
      <div :class="innerClasses" :style="innerStyles" ref="popupInnerEl">
        <slot name="header">
          <NavBar
            v-if="hasHeader"
            class="ta-drawer_header"
            :title="title"
            :rightButtons="showClose ? [{ icon: CloseOutlined, text: 'close' }] : []"
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
import { defineComponent, computed, toRef, type PropType } from 'vue'
import { NavBar } from '../NavBar'
import { usePopup } from '../popup/use-popup'
import { popupEmits, popupProps } from '../popup/props'
import { useSafeAreaInsets } from '../hooks'
import {
  createEnumsValidator,
  getEnumsValue,
  PLACEMENT_TYPES,
  type PlacementType,
  type PropsToEmits
} from '../helpers'
import CloseOutlined from '../Icon/icons/CloseOutlined'
import { getInnerClasses, getInnerStyles } from './util'
import type { DrawerEmits } from './types'

export default defineComponent({
  name: 'ta-drawer',
  components: { NavBar },
  props: {
    ...popupProps,
    title: {
      type: String
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
    },
    // 在没有蒙层的情况下，点击抽屉外其他区域是否关闭抽屉
    initialEnableBlurCancel: {
      type: Boolean,
      default: true
    }
  },
  emits: { ...popupEmits } as PropsToEmits<DrawerEmits>,
  setup(props, ctx) {
    const popup = usePopup(props, ctx, {
      initialFocusFixed: true,
      initialEnableBlurCancel: props.initialEnableBlurCancel
    })

    const { safeAreaInsets } = useSafeAreaInsets(toRef(props, 'enableSafeAreaInsets'))

    const hasHeader = computed(() => !!(props.title || props.showClose || ctx.slots.header))

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

    const innerClasses = computed(() =>
      getInnerClasses({
        placement: props.placement,
        hasHeader: hasHeader.value
      })
    )

    return {
      ...popup,
      innerClasses,
      hasHeader,
      innerStyles,
      onHeaderRightClick,
      CloseOutlined
    }
  }
})
</script>
