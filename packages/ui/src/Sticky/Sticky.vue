<template>
  <div class="ta-sticky" :style="styles" ref="root">
    <teleport to="body" :disabled="!isFixed">
      <div class="ta-sticky_content" ref="contentEl">
        <slot></slot>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, watch, shallowRef, type PropType } from 'vue'
import {
  widgetZIndex,
  selectorValidator,
  isSizeValue,
  getRelativeOffset,
  getScrollTop,
  getSizeValue,
  querySelector,
  type Selector
} from '../helpers'
import { useScroll } from '../hooks'
import type { ResetContainer } from './types'
import { getStyles } from './util'

export default defineComponent({
  name: 'ta-sticky',
  props: {
    containSelector: {
      type: [String, HTMLElement] as PropType<Selector>,
      validator: selectorValidator
    },
    offsetTop: {
      type: [Number, String],
      validator: isSizeValue,
      default: 0
    },
    offsetBottom: {
      type: [Number, String],
      validator: isSizeValue
    },
    // 禁用吸附
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { expose }) {
    const root = shallowRef<HTMLElement | null>(null)
    const container = shallowRef<HTMLElement | null>(null)
    const contentEl = shallowRef<HTMLElement | null>(null)
    const width = ref<number | null>(null)
    const height = ref<number | null>(null)
    const isFixed = ref(false)

    function updateFixed() {
      if (!root.value || !container.value) {
        return
      }

      if (props.disabled) {
        updateStyles(false)
        return
      }

      const scrollTop = getScrollTop(container.value)
      const $root = root.value as HTMLElement
      const { clientHeight, clientWidth } = $root

      const offsetTop = getRelativeOffset($root, container.value).offsetTop

      if (scrollTop >= offsetTop - getSizeValue(props.offsetTop)) {
        height.value = clientHeight
        width.value = clientWidth
        updateStyles(true)
      } else {
        height.value = null
        width.value = null
        updateStyles(false)
      }
    }

    function updateStyles(_isFixed: boolean) {
      const $root = root.value as HTMLElement
      const styles = (contentEl.value as HTMLElement).style

      if (_isFixed) {
        const { offsetTop } = getRelativeOffset(container.value as HTMLElement)
        const { offsetLeft } = getRelativeOffset($root)

        styles.top = offsetTop + getSizeValue(props.offsetTop) + 'px'
        styles.left = offsetLeft + 'px'
        styles.width = width.value + 'px'
        if (props.offsetBottom != null) {
          styles.bottom = getSizeValue(props.offsetBottom) + 'px'
        } else {
          styles.height = height.value + 'px'
        }
        styles.zIndex = widgetZIndex.toString()
        styles.position = 'fixed'
      } else {
        styles.cssText = ''
      }

      isFixed.value = _isFixed
    }

    useScroll(container, updateFixed)

    const resetContainer: ResetContainer = containSelector => {
      container.value = querySelector(containSelector) || document.documentElement
    }

    const styles = computed(() => getStyles(height.value ?? undefined))

    watch(
      () => props.disabled,
      () => updateFixed()
    )

    onMounted(() => resetContainer(props.containSelector))

    expose({
      resetContainer
    })

    return {
      root,
      isFixed,
      contentEl,
      styles,
      resetContainer
    }
  }
})
</script>
