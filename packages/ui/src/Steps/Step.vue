<template>
  <div :class="classes">
    <div class="ta-step_line"></div>
    <div class="ta-step_index">
      <slot name="step" :index="index" :active="active" :finish="finish">{{ index + 1 }}</slot>
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
import { computed, defineComponent } from 'vue'
import { getStepClasses } from './util'

export default defineComponent({
  name: 'ta-step',
  props: {
    title: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: -1
    },
    activeIndex: {
      type: Number,
      default: -1
    }
  },
  setup(props) {
    const active = computed(() => {
      return props.activeIndex === props.index
    })

    const finish = computed(() => {
      return props.index < props.activeIndex
    })

    const classes = computed(() =>
      getStepClasses({
        active: active.value,
        finish: finish.value
      })
    )

    return {
      active,
      finish,
      classes
    }
  }
})
</script>
