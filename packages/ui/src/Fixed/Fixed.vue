<template>
  <div class="ta-fixed" :style="styles" ref="root">
    <!--fixed start-->
    <div :class="innerClasses" :style="innerStyles" ref="innerEl">
      <div class="ta-fixed_content-wrapper" ref="contentEl">
        <slot></slot>
      </div>
    </div>
    <!--fixed end-->
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  ref,
  shallowRef,
  toRef,
  watch,
  type PropType
} from 'vue'
import {
  createEnumsValidator,
  PLACEMENT_TYPES,
  type PlacementType
} from '../helpers'
import { useSafeAreaInsets, useFixed, useResizeObserver } from '../hooks'
import { getStyles, getInnerClasses, getInnerStyles } from './util'

export default defineComponent({
  name: 'ta-fixed',
  inject: {
    disableFixed: {
      default: false
    }
  },
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
    const disableFixed = inject('disableFixed', false)
    const rootStyle = ref<{
      width: number | null
      height: number | null
    }>({
      width: null,
      height: null
    })
    const fixed2 = ref(true)

    const { safeAreaInsets } = useSafeAreaInsets(
      toRef(props, 'enableSafeAreaInsets')
    )

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
        fixed2.value = false
        return
      }

      rootStyle.value = {
        width: props.fixed && props.spaceHold ? offsetWidth : null,
        height: props.fixed && props.spaceHold ? offsetHeight : null
      }
      fixed2.value = !!props.fixed
    }

    const styles = computed(() => getStyles(rootStyle.value))
    const innerClasses = computed(() => getInnerClasses(props, fixed2.value))
    const innerStyles = computed(() => getInnerStyles(props, safeAreaInsets))

    useResizeObserver(contentEl, updateSize)

    useFixed({
      disableFixed,
      root,
      inner: innerEl,
      fixed: fixed2
    })

    watch([() => props.fixed, () => props.spaceHold], updateSize)

    onMounted(() => {
      updateSize()
    })

    return {
      root,
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
