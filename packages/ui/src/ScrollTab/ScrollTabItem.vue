<template>
  <div
    class="ak-sticky-view-item ak-scroll-tab-item"
    :data-name="name"
    :data-title="title"
  >
    <div class="ak-sticky-view-item_header">{{ title || name }}</div>
    <div class="ak-sticky-view-item_body"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted } from 'vue'
import { useException } from '../hooks/use-exception'

export default defineComponent({
  name: 'ak-scroll-tab-item',
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
    const update = inject('akStickyViewUpdate', printItemIsolationWarn)

    onMounted(update)
    onUnmounted(update)

    return {}
  }
})
</script>
