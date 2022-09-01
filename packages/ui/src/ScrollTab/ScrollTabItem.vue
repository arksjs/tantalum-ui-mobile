<template>
  <div class="fx-sticky-view-item fx-scroll-tab-item" :data-name="name">
    <div class="fx-sticky-view-item_header">{{ name }}</div>
    <div class="fx-sticky-view-item_body"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted } from 'vue'
import { createUpdateInItem } from '../hooks/use-list'

export default defineComponent({
  name: 'fx-scroll-tab-item',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup() {
    const update = inject(
      'fxStickyViewUpdate',
      createUpdateInItem('scroll-tab')
    )

    onMounted(update)
    onUnmounted(update)

    return {}
  }
})
</script>
