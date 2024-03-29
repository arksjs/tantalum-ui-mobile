<template>
  <teleport to="body">
    <div :class="['ta-popover', popupClasses]" :style="popupStyles" v-bind="$attrs">
      <div class="ta-mask" @click="onMaskClick"></div>
      <div class="ta-popover_inner" :style="innerStyles" ref="popupInnerEl">
        <i class="ta-popover_arrow" :style="arrowStyles"></i>
        <div class="ta-popover_content">
          <slot>
            <div class="ta-popover_text">{{ content }}</div>
          </slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, ref, shallowRef, watch } from 'vue'
import { popoverProps, popoverEmits } from '../Popover/props'
import { cloneData, querySelector, type PropsToEmits } from '../helpers'
import { usePopup } from '../popup/use-popup'
import { useResizeObserver } from '../hooks'
import { getArrowStyles, getInnerStyles, getShowPos, DEFAULT_POS } from './util'
import type { PopoverEmits } from './types'

export default defineComponent({
  name: 'ta-popover',
  props: {
    ...popoverProps,
    content: {
      type: String,
      default: ''
    }
  },
  emits: { ...popoverEmits } as PropsToEmits<PopoverEmits>,
  setup(props, ctx) {
    const container = shallowRef<HTMLElement | null>(null)
    const isShow = ref(false)
    const showPos = ref(DEFAULT_POS)

    const popup = usePopup(props, ctx, {
      emitCallback(event, res) {
        if (event === 'visibleStateChange') {
          switch (res.state) {
            case 'show':
              nextTick(() => {
                isShow.value = true
                updatePos('show')
              })
              break
            case 'hidden':
              showPos.value = cloneData(DEFAULT_POS)
              isShow.value = false
              break
            default:
              break
          }
        }
      },
      initialForbidScroll: true,
      initialEnableBlurCancel: false
    })

    function updatePos(source?: string) {
      if (!container.value || !popup.popupInnerEl.value || !isShow.value) {
        return
      }

      showPos.value = getShowPos(container.value, popup.popupInnerEl.value, props.placement)
    }

    const arrowStyles = computed(() => getArrowStyles(isShow.value, showPos.value))

    const innerStyles = computed(() => getInnerStyles(isShow.value, showPos.value))

    watch(
      () => props.showMask,
      val => {
        popup.setEnableBlurCancel(!val)
      },
      {
        immediate: true
      }
    )

    watch(
      () => props.selector,
      val => (container.value = querySelector(val))
    )

    onMounted(() => {
      container.value = querySelector(props.selector)

      useResizeObserver(container, () => updatePos('container resize'))

      const docEl = shallowRef(document.documentElement)

      useResizeObserver(docEl, () => {
        updatePos('window resize')
      })
    })

    return {
      ...popup,
      arrowStyles,
      innerStyles
    }
  }
})
</script>
