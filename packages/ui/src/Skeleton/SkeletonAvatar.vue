<template>
  <div :class="classes"></div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { propAnimated, propAvatarShape } from './props'
import { useConsumer } from './context'
import { getAvatarClasses } from './util'

export default defineComponent({
  name: 'ak-skeleton-avatar',
  props: {
    // 是否显示动画
    animated: propAnimated,
    // 指定头像的形状
    shape: propAvatarShape
  },
  setup(props) {
    const parentProps = useConsumer()
    const classes = computed(() => getAvatarClasses(props, parentProps))

    return {
      classes
    }
  }
})
</script>
