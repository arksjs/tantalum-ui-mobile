<template>
  <Group
    class="ak-sticky-view-item ak-index-view-item"
    :title="name"
    :data-name="name"
    :data-title="title"
  >
    <slot></slot>
  </Group>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted } from 'vue'
import { Group } from '../Group'
import { createUpdateInItem } from '../hooks/use-list'

export default defineComponent({
  name: 'ak-index-view-item',
  components: { Group },
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
      createUpdateInItem('index-view')
    )

    onMounted(update)
    onUnmounted(update)

    return {}
  }
})
</script>
