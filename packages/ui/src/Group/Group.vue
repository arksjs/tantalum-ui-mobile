<template>
  <div :class="classes">
    <div class="ta-group_header">
      <div class="ta-group_title">{{ title }}</div>
      <div class="ta-group_more">
        <slot name="header"></slot>
      </div>
    </div>
    <div class="ta-group_body ta-horizontal-hairline hairline-reverse">
      <div class="ta-group_body-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { getClasses } from './util'

export default defineComponent({
  name: 'ta-group',
  props: {
    title: {
      type: String,
      required: true
    },
    strongHeader: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const classes = computed(() => getClasses(props.strongHeader))

    return {
      classes
    }
  }
})
</script>
