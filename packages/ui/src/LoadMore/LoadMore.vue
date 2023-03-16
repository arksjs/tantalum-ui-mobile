<template>
  <div :class="classes">
    <ActivityIndicator class="ta-load-more_icon" v-if="loading" :size="16" />
    <span class="ta-load-more_content">
      <slot>
        <i class="ta-load-more_dot"></i>
      </slot>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ActivityIndicator } from '../ActivityIndicator'
import { getClasses } from './util'

export default defineComponent({
  name: 'ta-load-more',
  components: { ActivityIndicator },
  props: {
    // 是否显示加载中
    loading: {
      type: Boolean,
      default: false
    },
    // 垂直显示
    vertical: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const classes = computed(() =>
      getClasses({
        loading: props.loading,
        vertical: props.vertical
      })
    )

    return {
      classes
    }
  }
})
</script>
