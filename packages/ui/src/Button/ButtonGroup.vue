<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'
import { createEnumsValidator, SIZE_TYPES, type SizeType } from '../helpers'
import type { PatternType, ShapeType } from './types'
import {
  getGroupClasses,
  BUTTON_PATTERN_TYPES,
  BUTTON_SHAPE_TYPES
} from './util'
import { useButtonProvider } from './context'

export default defineComponent({
  name: 'ta-button-group',
  props: {
    size: {
      type: String as PropType<SizeType>,
      validator: createEnumsValidator(SIZE_TYPES)
    },
    pattern: {
      type: String as PropType<PatternType>,
      validator: createEnumsValidator(BUTTON_PATTERN_TYPES)
    },
    shape: {
      type: String as PropType<ShapeType>,
      validator: createEnumsValidator(BUTTON_SHAPE_TYPES)
    }
  },
  setup(props) {
    const { childCount } = useButtonProvider(props)

    const classes = computed(() => {
      return getGroupClasses(props, childCount.value)
    })

    return { classes }
  }
})
</script>
