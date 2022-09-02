<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, ref, watch } from 'vue'
import type { PropType } from 'vue'
import type { JustifyType, AlignType, UserGutter } from './types'
import { createEnumsValidator } from '../helpers/validator'
import { isNumberArray, isNumeric } from '../helpers/util'
import {
  getRowClasses,
  getRowStyles,
  parseGutter,
  JUSTIFY_TYPES,
  ALIGN_TYPES
} from './util'

export default defineComponent({
  name: 'ak-row',
  props: {
    // 栅格间隔
    gutter: {
      type: [Number, String, Array] as PropType<number | string | number[]>,
      validator: (val: UserGutter) => {
        return (isNumberArray(val) && val.length === 2) || isNumeric(val)
      },
      default: 0
    },
    // 水平排列方式
    justify: {
      type: String as PropType<JustifyType>,
      validator: createEnumsValidator(JUSTIFY_TYPES)
    },
    // 垂直对齐方式
    align: {
      type: String as PropType<AlignType>,
      validator: createEnumsValidator(ALIGN_TYPES)
    }
  },
  setup(props) {
    const gutter = ref([0, 0])

    const styles = computed(() => getRowStyles(gutter.value))
    const classes = computed(() => getRowClasses(props))

    watch(
      () => props.gutter,
      val => {
        gutter.value = parseGutter(val)
      },
      {
        immediate: true
      }
    )

    provide('akRowGutter', gutter)

    return {
      styles,
      classes
    }
  }
})
</script>
