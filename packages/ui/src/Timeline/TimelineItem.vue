<template>
  <div class="ak-timeline-item ak-horizontal-hairline" ref="root">
    <div class="ak-timeline-item_line"></div>
    <div class="ak-timeline-item_index">
      <slot name="dot">
        <i class="ak-timeline-item_dot" :style="{ borderColor: dotColor }"></i>
      </slot>
    </div>
    <div class="ak-timeline-item_inner">
      <div class="ak-timeline-item_title" v-if="title || $slots.title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="ak-timeline-item_content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { colorValidator } from '../helpers/validator'

export default defineComponent({
  name: 'ak-timeline-item',
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
