<template>
  <div :class="classes" :style="styles" ref="root">
    <slot></slot>
    <button class="ta-tag_close" v-if="closable">
      <Icon
        :icon="CloseOutlined"
        @mousedown.stop="noop"
        @touchstart.stop="noop"
        @click="onClose"
      />
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, shallowRef, type PropType } from 'vue'
import { Icon } from '../Icon'
import {
  colorValidator,
  createEnumsValidator,
  SIZE_TYPES,
  STATE_TYPES,
  kebabCase2CamelCase,
  noop,
  returnTrue,
  type PropsToEmits,
  type SizeType,
  type StateType
} from '../helpers'
import { useLongPress } from '../hooks'
import type { PatternType, TagEmits } from './types'
import CloseOutlined from '../Icon/icons/CloseOutlined'
import { getStyles, getClasses, TAG_PATTERN_TYPES } from './util'

export default defineComponent({
  name: 'ta-tag',
  components: { Icon },
  props: {
    size: {
      type: String as PropType<SizeType>,
      validator: createEnumsValidator(SIZE_TYPES)
    },
    type: {
      type: String as PropType<StateType>,
      validator: createEnumsValidator(STATE_TYPES)
    },
    // 款式
    pattern: {
      type: String as PropType<PatternType>,
      validator: createEnumsValidator(TAG_PATTERN_TYPES)
    },
    // 可关闭的
    closable: {
      type: Boolean,
      default: false
    },
    // 禁用的
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      validator: colorValidator
    }
  },
  emits: {
    close: returnTrue,
    click: returnTrue,
    longPress: returnTrue
  } as PropsToEmits<TagEmits>,
  setup(props, { emit }) {
    const root = shallowRef<HTMLElement | null>(null)

    function onClose() {
      if (!props.disabled) {
        emit('close')
      }
    }

    const classes = computed(() => getClasses(props))
    const styles = computed(() => getStyles(props.color))

    useLongPress(root, e => {
      if (!props.disabled) {
        emit(kebabCase2CamelCase(e.type) as 'longPress')
      }
    })

    return {
      root,
      classes,
      styles,
      noop,
      onClose,
      CloseOutlined
    }
  }
})
</script>
