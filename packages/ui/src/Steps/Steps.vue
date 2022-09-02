<template>
  <div :class="classes" ref="listEl">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, provide, toRef } from 'vue'
import type { PropsToEmits } from '../helpers/types'
import { isNumber } from '../helpers/util'
import { useList } from '../hooks/use-list'
import { getStepsClasses } from './util'
import type { StepsEmits } from './types'

export default defineComponent({
  name: 'ak-steps',
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
  emits: {
    'update:activeIndex': activeIndex => isNumber(activeIndex)
  } as PropsToEmits<StepsEmits>,
  setup(props, { emit }) {
    const { listEl } = useList('steps', $items => {
      if (props.activeIndex >= $items.length) {
        emit('update:activeIndex', $items.length - 1)
      }
    })

    provide(`akStepsActiveIndex`, toRef(props, 'activeIndex'))

    const classes = computed(() => getStepsClasses(props))

    return { listEl, classes }
  }
})
</script>
