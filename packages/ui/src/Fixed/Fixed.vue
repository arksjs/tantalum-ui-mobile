<template>
  <div class="ta-fixed" :style="styles" ref="root">
    <teleport to="body" :disabled="!isFixed">
      <div :class="innerClasses" :style="innerStyles" ref="innerEl">
        <div class="ta-fixed_content-wrapper" ref="contentEl">
          <slot></slot>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  shallowRef,
  toRef,
  watch,
  type PropType
} from 'vue'
import { createEnumsValidator, PLACEMENT_TYPES, type PlacementType } from '../helpers'
import { useSafeAreaInsets, useResizeObserver } from '../hooks'
import { getStyles, getInnerClasses, getInnerStyles } from './util'

export default defineComponent({
  name: 'ta-fixed',
  props: {
    // 开启fixed模式
    fixed: {
      type: Boolean,
      default: true
    },
    // 固定方向
    placement: {
      type: String as PropType<PlacementType>,
      validator: createEnumsValidator(PLACEMENT_TYPES)
    },
    // 是否开启安全区
    enableSafeAreaInsets: {
      type: Boolean,
      default: true
    },
    background: {
      type: String
    },
    zIndex: {
      type: Number,
      default: 1
    },
    spaceHold: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const root = shallowRef<HTMLElement | null>(null)
    const innerEl = shallowRef<HTMLElement | null>(null)
    const contentEl = shallowRef<HTMLElement | null>(null)

    const rootStyle = ref<{
      width: number | null
      height: number | null
    }>({
      width: null,
      height: null
    })
    const isFixed = ref(true)

    const { safeAreaInsets } = useSafeAreaInsets(toRef(props, 'enableSafeAreaInsets'))

    function updateSize() {
      if (!(root.value && innerEl.value && contentEl.value)) {
        return
      }

      const { offsetWidth, offsetHeight } = contentEl.value

      if (offsetWidth === 0 || offsetHeight === 0) {
        rootStyle.value = {
          width: null,
          height: null
        }
        isFixed.value = false
        return
      }

      rootStyle.value = {
        width: props.fixed && props.spaceHold ? offsetWidth : null,
        height: props.fixed && props.spaceHold ? offsetHeight : null
      }
      isFixed.value = !!props.fixed
    }

    const styles = computed(() => getStyles(rootStyle.value))
    const innerClasses = computed(() => getInnerClasses(props, isFixed.value))
    const innerStyles = computed(() => getInnerStyles(props, safeAreaInsets))

    useResizeObserver(contentEl, updateSize)

    watch([() => props.fixed, () => props.spaceHold], updateSize)

    onMounted(() => {
      updateSize()
    })

    return {
      root,
      isFixed,
      innerEl,
      contentEl,
      styles,
      innerClasses,
      innerStyles,
      safeAreaInsets
    }
  }
})
</script>
