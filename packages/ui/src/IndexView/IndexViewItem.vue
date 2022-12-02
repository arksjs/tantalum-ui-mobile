<template>
  <Group
    class="ta-sticky-view-item ta-index-view-item"
    :title="title || name"
    :data-name="name"
    :data-title="title"
  >
    <slot></slot>
  </Group>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onUnmounted } from 'vue'
import { Group } from '../Group'
import { useException } from '../hooks'

export default defineComponent({
  name: 'ta-index-view-item',
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
    const { printItemIsolationWarn } = useException()
    const update = inject('taStickyViewUpdate', printItemIsolationWarn)

    onMounted(update)
    onUnmounted(update)

    return {}
  }
})
</script>
