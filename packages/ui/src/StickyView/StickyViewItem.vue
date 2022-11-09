<template>
  <div
    class="ta-sticky-view-item"
    :data-name="name"
    :data-title="title"
    ref="root"
  >
    <div class="ta-sticky-view-item_header">{{ title || name }}</div>
    <div class="ta-sticky-view-item_body"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useListItem } from '../hooks/use-list'

export default defineComponent({
  name: 'ta-sticky-view-item',
  props: {
    title: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      required: true
    }
  },
  setup() {
    useListItem('stickyView')

    return {}
  }
})
</script>
