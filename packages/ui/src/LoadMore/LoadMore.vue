<template>
  <div :class="classes">
    <ActivityIndicator class="fx-load-more_icon" v-if="loading" :size="18" />
    <span class="fx-load-more_content">
      <slot>
        <i class="fx-load-more_dot"></i>
      </slot>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ActivityIndicator } from '../ActivityIndicator'
import { getClasses } from './util'

export default defineComponent({
  name: 'fx-load-more',
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
