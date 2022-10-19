<template>
  <div
    class="ak-sticky-view-item"
    :data-name="name"
    :data-title="title"
    ref="root"
  >
    <div class="ak-sticky-view-item_header">{{ title || name }}</div>
    <div class="ak-sticky-view-item_body"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useListItem } from '../hooks/use-list'

export default defineComponent({
  name: 'ak-sticky-view-item',
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
