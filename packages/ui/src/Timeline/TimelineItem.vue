<template>
  <div class="ta-timeline-item ta-horizontal-hairline" ref="root">
    <div class="ta-timeline-item_line"></div>
    <div class="ta-timeline-item_index">
      <slot name="dot">
        <i class="ta-timeline-item_dot" :style="{ borderColor: dotColor }"></i>
      </slot>
    </div>
    <div class="ta-timeline-item_inner">
      <div class="ta-timeline-item_title" v-if="title || $slots.title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="ta-timeline-item_content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { colorValidator } from '../helpers/validator'

export default defineComponent({
  name: 'ta-timeline-item',
  props: {
    // dot颜色
    dotColor: {
      type: String,
      validator: colorValidator
    },
    title: {
      type: String
    }
  }
})
</script>
