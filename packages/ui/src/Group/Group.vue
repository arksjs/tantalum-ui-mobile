<template>
  <div :class="classes">
    <div class="fx-group_header">
      <div class="fx-group_title">{{ title }}</div>
      <div class="fx-group_more">
        <slot name="header"></slot>
      </div>
    </div>
    <div class="fx-group_body fx-horizontal-hairline hairline-reverse">
      <div class="fx-group_body-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { getClasses } from './util'

export default defineComponent({
  name: 'fx-group',
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
