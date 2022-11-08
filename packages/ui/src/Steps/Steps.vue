<template>
  <div :class="classes" ref="listEl">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, toRef } from 'vue'
import { noop } from '../helpers/util'
import { useList } from '../hooks/use-list'
import { getStepsClasses } from './util'

export default defineComponent({
  name: 'ta-steps',
  props: {
    activeIndex: {
      type: Number,
      default: 0
    },
    dot: {
      type: Boolean,
      default: false
    },
    horizontal: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { listEl } = useList('steps', noop)

    provide(`taStepsActiveIndex`, toRef(props, 'activeIndex'))

    const classes = computed(() => getStepsClasses(props))

    return { listEl, classes }
  }
})
</script>
