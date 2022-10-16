<template>
  <div class="ak-sticky" :style="styles" ref="root">
    <div class="ak-sticky_content" ref="contentEl">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, inject, watch } from 'vue'
import type { PropType } from 'vue'
import { widgetZIndex } from '../helpers/layer'
import { selectorValidator, sizeValidator } from '../helpers/validator'
import { useScroll } from '../hooks/use-scroll'
import {
  getRelativeOffset,
  getScrollTop,
  getSizeValue,
  querySelector
} from '../helpers/dom'
import type { Selector } from '../helpers/types'
import { useFixed } from '../hooks/use-fixed'
import type { ResetContainer } from './types'
import { getStyles } from './util'

export default defineComponent({
  name: 'ak-sticky',
  props: {
    containSelector: {
      type: [String, HTMLElement] as PropType<Selector>,
      validator: selectorValidator
    },
    offsetTop: {
      type: [Number, String],
      validator: sizeValidator,
      default: 0
    },
    offsetBottom: {
      type: [Number, String],
      validator: sizeValidator,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { expose }) {
    const root = ref<HTMLElement>()
    const container = ref<HTMLElement>()
    const contentEl = ref<HTMLElement>()
    const width = ref<number | null>(null)
    const height = ref<number | null>(null)
    const disableFixed = inject('disableFixed', false)
    const fixed = ref(false)

    useFixed({
      disableFixed,
      root,
      inner: contentEl,
      fixed
    })

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

    function updateStyles(isFixed: boolean) {
      const $root = root.value as HTMLElement
      const styles = (contentEl.value as HTMLElement).style

      if (isFixed) {
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

      fixed.value = isFixed
    }

    useScroll(container, updateFixed)

    const resetContainer: ResetContainer = containSelector => {
      container.value =
        querySelector(containSelector) || document.documentElement
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
      fixed,
      contentEl,
      styles
    }
  }
})
</script>
