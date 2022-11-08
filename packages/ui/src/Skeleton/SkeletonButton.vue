<template>
  <div :class="classes"></div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { propAnimated, propButtonShape } from './props'
import { useConsumer } from './context'
import { getButtonClasses } from './util'

export default defineComponent({
  name: 'ta-skeleton-button',
  props: {
    // 是否显示动画
    animated: propAnimated,
    // 指定按钮的形状
    shape: propButtonShape
  },
  setup(props) {
    const parentProps = useConsumer()
    const classes = computed(() => getButtonClasses(props, parentProps))

    return {
      classes
    }
  }
})
</script>
