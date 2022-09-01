<template>
  <Group
    class="fx-sticky-view-item fx-index-view-item"
    :title="name"
    :data-name="name"
  >
    <slot></slot>
  </Group>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted } from 'vue'
import { Group } from '../Group'
import { createUpdateInItem } from '../hooks/use-list'

export default defineComponent({
  name: 'fx-index-view-item',
  components: { Group },
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup() {
    const update = inject(
      'fxStickyViewUpdate',
      createUpdateInItem('index-view')
    )

    onMounted(update)
    onUnmounted(update)

    return {}
  }
})
</script>
