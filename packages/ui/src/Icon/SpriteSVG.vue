<template>
  <svg>
    <use :xlink:href="'#' + iconName"></use>
  </svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ta-sprite-icon',
  props: {
    iconName: {
      type: String
    }
  }
})
</script>
