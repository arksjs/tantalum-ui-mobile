<template>
  <div :class="classes"></div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useConsumer } from './context'
import { propAnimated } from './props'
import { getTitleClasses } from './util'

export default defineComponent({
  name: 'fx-skeleton-title',
  props: {
    // 是否显示动画
    animated: propAnimated
  },
  setup(props) {
    const parentProps = useConsumer()
    const classes = computed(() => getTitleClasses(props, parentProps))

    return {
      classes
    }
  }
})
</script>
