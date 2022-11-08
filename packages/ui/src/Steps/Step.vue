<template>
  <div :class="classes" ref="root">
    <div class="ta-step_line"></div>
    <div class="ta-step_index">
      <slot name="step" :index="index" :active="active" :finish="finish">{{
        index + 1
      }}</slot>
    </div>
    <div class="ta-step_inner">
      <div class="ta-step_title" v-if="title || $slots.title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="ta-step_content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref, shallowRef } from 'vue'
import { useListItem } from '../hooks/use-list'
import { getStepClasses } from './util'

export default defineComponent({
  name: 'ta-step',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    const activeIndex = inject(`taStepsActiveIndex`, ref(0))
    const root = shallowRef<HTMLElement | null>(null)

    const { index } = useListItem('steps', root)

    const active = computed(() => {
      return activeIndex.value === index.value
    })

    const finish = computed(() => {
      return index.value < activeIndex.value
    })

    const classes = computed(() =>
      getStepClasses({
        active: active.value,
        finish: finish.value
      })
    )

    return {
      root,
      index,
      active,
      finish,
      classes
    }
  }
})
</script>
