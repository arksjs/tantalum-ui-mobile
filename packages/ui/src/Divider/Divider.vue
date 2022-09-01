<template>
  <div :class="classes">
    <span v-if="title">{{ title }}</span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { getClasses } from './util'

export default defineComponent({
  name: 'fx-divider',
  props: {
    title: {
      type: String
    },
    dashed: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const classes = computed(() => getClasses(props))

    return {
      classes
    }
  }
})
</script>
