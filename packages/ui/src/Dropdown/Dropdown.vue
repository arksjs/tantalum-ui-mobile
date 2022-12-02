<template>
  <teleport to="body">
    <div
      class="ta-dropdown"
      :class="popupClasses"
      :style="popupStyles"
      v-bind="$attrs"
      ref="popupEl"
    >
      <div class="ta-mask" @click="onMaskClick"></div>
      <div class="ta-dropdown_inner">
        <slot :height="height"></slot>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  ref,
  nextTick,
  shallowRef,
  type PropType
} from 'vue'
import { usePopup } from '../popup/use-popup'
import { popupEmits, popupProps } from '../popup/props'
import {
  selectorValidator,
  querySelector,
  type PropsToEmits,
  type Selector
} from '../helpers'
import { useException } from '../hooks'
import type { DropdownEmits } from './types'

export default defineComponent({
  name: 'ta-dropdown',
  props: {
    ...popupProps,
    selector: {
      type: [String, HTMLElement] as PropType<Selector>,
      validator: selectorValidator
    }
  },
  emits: { ...popupEmits } as PropsToEmits<DropdownEmits>,
  setup(props, ctx) {
    const { printPropError } = useException()
    const top = ref(-1)
    const height = ref(0)
    const popupEl = shallowRef<HTMLElement | null>(null)

    function updatePos() {
      const $target = querySelector(props.selector)

      if (!$target) {
        printPropError(`Cannot find element through "selector"`)
        return
      }

      const { bottom } = ($target as HTMLElement).getBoundingClientRect()

      top.value = bottom
      nextTick(() => {
        height.value = popupEl.value?.offsetHeight ?? 0
      })
    }

    const popupHook = usePopup(props, ctx, {
      emitCallback(event, res) {
        if (event === 'visibleStateChange') {
          switch (res.state) {
            case 'show':
              updatePos()
              break
            case 'hidden':
              top.value = -1
              break
            default:
              break
          }
        }
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
