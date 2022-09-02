<template>
  <div :class="classes"></div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useConsumer } from './context'
import { propAnimated } from './props'
import { getImageClasses } from './util'

export default defineComponent({
  name: 'ak-skeleton-image',
  props: {
    // 是否显示动画
    animated: propAnimated
  },
  setup(props) {
    const parentProps = useConsumer()
    const classes = computed(() => getImageClasses(props, parentProps))

    return {
      classes
    }
  }
})
</script>
