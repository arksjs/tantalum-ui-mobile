<template>
  <div
    class="ta-sticky-view-item ta-scroll-tab-item"
    :data-name="name"
    :data-title="title"
    :data-sub-title="description"
  >
    <div class="ta-sticky-view-item_header">
      {{ title || name }}<span>{{ description }}</span>
    </div>
    <div class="ta-sticky-view-item_body"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ta-scroll-tab-item',
  props: {
    title: {
      type: String
    },
    description: {
      type: String
    },
    name: {
      type: String,
      required: true
    }
  }
})
</script>
