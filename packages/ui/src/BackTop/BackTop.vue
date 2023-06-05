<template>
  <teleport to="body">
    <button class="ta-back-top" :style="styles" @click="onClick">
      <slot>
        <Icon :icon="UpCircleOutlined" />
      </slot>
    </button>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, computed, toRef, ref, onMounted, shallowRef, type PropType } from 'vue'
import { Icon } from '../Icon'
import {
  getScrollTop,
  scrollTo,
  emitClickValidator,
  getNumber,
  type OnClick,
  type PropsToEmits
} from '../helpers'
import { useSafeAreaInsets, useScroll } from '../hooks'
import UpCircleOutlined from '../Icon/icons/UpCircleOutlined'
import { DEFAULT_VISIBLE_HEIGHT, getStyles } from './util'
import type { BackTopEmits } from './types'

export default defineComponent({
  name: 'ta-back-top',
  components: { Icon },
  props: {
    visibleHeight: {
      type: [Number, String],
      default: DEFAULT_VISIBLE_HEIGHT
    },
    animated: {
      type: Boolean,
      default: true
    },
    offset: {
      type: [Number, Array] as PropType<number | number[]>,
      default: 0
    },
    enableSafeAreaInsets: {
      type: Boolean,
      default: true
    }
  },
  emits: {
    click: emitClickValidator
  } as PropsToEmits<BackTopEmits>,
  setup(props, { emit }) {
    const isShow = ref(false)
    const docEl = shallowRef<HTMLElement | null>(null)

    function toTop() {
      scrollTo(document, 0, props.animated)
    }

    const onClick: OnClick = e => {
      toTop()

      emit('click', e)
    }

    const { safeAreaInsets } = useSafeAreaInsets(toRef(props, 'enableSafeAreaInsets'))

    const styles = computed(() => getStyles(props.offset, isShow.value, safeAreaInsets))

    function updateShow() {
      isShow.value = getScrollTop() >= getNumber(props.visibleHeight, DEFAULT_VISIBLE_HEIGHT)
    }

    useScroll(docEl, updateShow)

    onMounted(() => {
      updateShow()

      docEl.value = document.documentElement
    })

    return {
      toTop,
      onClick,
      isShow,
      styles,
      UpCircleOutlined
    }
  }
})
</script>
