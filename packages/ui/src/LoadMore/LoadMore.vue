<template>
  <div :class="classes">
    <ActivityIndicator class="ak-load-more_icon" v-if="loading" :size="18" />
    <span class="ak-load-more_content">
      <slot>
        <i class="ak-load-more_dot"></i>
      </slot>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { ActivityIndicator } from '../ActivityIndicator'
import { getClasses } from './util'

export default defineComponent({
  name: 'ak-load-more',
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
