<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, ref } from 'vue'
import { numberValidator } from '../helpers/validator'
import { getColClasses, getColStyles } from './util'

export default defineComponent({
  name: 'fx-col',
  props: {
    // 栅格占据的列数
    span: {
      type: [Number, String],
      validator: numberValidator,
      default: 24
    },
    // 栅格左侧的间隔格数
    offset: {
      type: [Number, String],
      validator: numberValidator,
      default: 0
    },
    // 栅格向右移动格数
    push: {
      type: [Number, String],
      validator: numberValidator,
      default: 0
    },
    // 栅格向左移动格数
    pull: {
      type: [Number, String],
      validator: numberValidator,
      default: 0
    }
  },
  setup(props) {
    const defaultRowGutter = ref([0, 0])
    const rowGutter = inject('fxRowGutter', defaultRowGutter)

    const styles = computed(() => getColStyles(rowGutter.value))
    const classes = computed(() => getColClasses(props))

    return {
      styles,
      classes
    }
  }
})
</script>
