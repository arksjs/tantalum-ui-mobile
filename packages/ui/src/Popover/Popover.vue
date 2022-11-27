<template>
  <teleport to="body">
    <div
      :class="['ta-popover', popupClasses]"
      :style="popupStyles"
      v-bind="$attrs"
    >
      <div class="ta-mask" @click="onMaskClick"></div>
      <div class="ta-popover_inner" ref="innerEl" :style="innerStyles">
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
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  shallowRef,
  watch
} from 'vue'
import { popoverProps, popoverEmits } from '../Popover/props'
import { cloneData } from '../helpers/util'
import { querySelector } from '../helpers/dom'
import { usePopup } from '../popup/use-popup'
import { useResizeObserver } from '../hooks/use-resize-observer'
import { getArrowStyles, getInnerStyles, getShowPos, DEFAULT_POS } from './util'
import type { PropsToEmits } from '../helpers/types'
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
    const innerEl = shallowRef<HTMLElement | null>(null)
    const isShow = ref(false)
    const showPos = ref(DEFAULT_POS)

    const popup = usePopup(props, ctx, {
      afterShow() {
        nextTick(() => {
          isShow.value = true
          updatePos('afterShow')
        })
      },
      afterHidden() {
        showPos.value = cloneData(DEFAULT_POS)
        isShow.value = false
      },
      initialForbidScroll: true,
      initialEnableBlurCancel: false
    })

    function updatePos(source?: string) {
      if (!container.value || !innerEl.value || !isShow.value) {
        return
      }

      showPos.value = getShowPos(
        container.value,
        innerEl.value,
        props.placement
      )
    }

    const arrowStyles = computed(() =>
      getArrowStyles(isShow.value, showPos.value)
    )

    const innerStyles = computed(() =>
      getInnerStyles(isShow.value, showPos.value)
    )

    watch(
      () => props.showMask,
      val => {
        popup.setForbidScroll(!!val)
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
      innerEl,
      arrowStyles,
      innerStyles
    }
  }
})
</script>
