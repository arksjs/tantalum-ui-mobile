<template>
  <div :class="classes">
    <div class="ak-group_header">
      <div class="ak-group_title">{{ title }}</div>
      <div class="ak-group_more">
        <slot name="header"></slot>
      </div>
    </div>
    <div class="ak-group_body ak-horizontal-hairline hairline-reverse">
      <div class="ak-group_body-inner">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { getClasses } from './util'

export default defineComponent({
  name: 'ak-group',
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
