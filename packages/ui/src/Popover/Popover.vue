<template>
  <teleport to="body">
    <div :class="popoverClasses" :style="popupStyles" v-bind="$attrs">
      <div class="ak-mask" @click="onMaskClick"></div>
      <div class="ak-popover_inner" ref="innerEl" :style="innerStyles">
        <i class="ak-popover_arrow" :style="arrowStyles"></i>
        <div class="ak-popover_content">
          <slot>
            <div class="ak-popover_text">{{ content }}</div>
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
  name: 'ak-popover',
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

    const popoverClasses = computed(() => [
      popup.popupClasses.value,
      { 'no--mask': !props.showMask },
      'ak-popover'
    ])

    return {
      ...popup,
      innerEl,
      arrowStyles,
      innerStyles,
      popoverClasses
    }
  }
})
</script>
