<template>
  <div
    class="ta-sticky-view-item ta-scroll-tab-item"
    :data-name="name"
    :data-title="title"
  >
    <div class="ta-sticky-view-item_header">{{ title || name }}</div>
    <div class="ta-sticky-view-item_body"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted } from 'vue'
import { useException } from '../hooks/use-exception'

export default defineComponent({
  name: 'ta-scroll-tab-item',
  props: {
    title: {
      type: String
    },
    name: {
      type: String,
      required: true
    }
  },
  setup() {
    const { printItemIsolationWarn } = useException()
    const update = inject('taStickyViewUpdate', printItemIsolationWarn)

    onMounted(update)
    onUnmounted(update)

    return {}
  }
})
</script>
