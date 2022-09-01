<template>
  <teleport to="body">
    <div
      class="fx-dropdown"
      :class="popupClasses"
      :style="popupStyles"
      v-bind="$attrs"
      ref="popupEl"
    >
      <div class="fx-mask" @click="onMaskClick"></div>
      <div class="fx-dropdown_inner">
        <slot :height="height"></slot>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, computed, ref, nextTick } from 'vue'
import { usePopup } from '../popup/use-popup'
import { popupEmits, popupProps } from '../popup/popup'
import { selectorValidator } from '../helpers/validator'
import Exception from '../helpers/exception'
import { querySelector } from '../helpers/dom'
import type { Selector } from '../helpers/types'

export default defineComponent({
  name: 'fx-dropdown',
  props: {
    ...popupProps,
    selector: {
      type: [String, HTMLElement] as PropType<Selector>,
      validator: selectorValidator
    }
  },
  emits: { ...popupEmits },
  setup(props, ctx) {
    const top = ref(-1)
    const height = ref(0)
    const popupEl = ref<HTMLElement>()

    function updatePos() {
      const $target = querySelector(props.selector)

      if (!$target) {
        console.error(
          new Exception(
            'Cannot find element through "selector"',
            Exception.TYPE.PROP_ERROR,
            'Dropdown'
          )
        )
        return
      }

      const { bottom } = ($target as HTMLElement).getBoundingClientRect()

      top.value = bottom
      nextTick(() => {
        height.value = popupEl.value?.offsetHeight ?? 0
      })
    }

    const popupHook = usePopup(props, ctx, {
      afterShow: updatePos,
      afterHidden() {
        top.value = -1
      }
    })

    const popupStyles = computed(() => {
      return {
        zIndex: popupHook.zIndex.value,
        top: top.value === -1 ? '100vh' : top.value + 'px'
      }
    })

    return {
      ...popupHook,
      popupStyles,
      top,
      height,
      popupEl
    }
  }
})
</script>
