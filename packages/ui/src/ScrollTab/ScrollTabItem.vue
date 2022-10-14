<template>
  <div
    class="ak-sticky-view-item ak-scroll-tab-item"
    :data-name="name"
    :data-title="title"
  >
    <div class="ak-sticky-view-item_header">{{ name }}</div>
    <div class="ak-sticky-view-item_body"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted } from 'vue'
import { createUpdateInItem } from '../hooks/use-list'

export default defineComponent({
  name: 'ak-scroll-tab-item',
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
    const update = inject(
      'akStickyViewUpdate',
      createUpdateInItem('scroll-tab')
    )

    onMounted(update)
    onUnmounted(update)

    return {}
  }
})
</script>
