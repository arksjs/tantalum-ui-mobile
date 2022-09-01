<script lang="ts">
import { defineComponent, h } from 'vue'
import SkeletonLayout from './SkeletonLayout.vue'
import { rootProps } from './props'
import { useProvider } from './context'

export default defineComponent({
  name: 'fx-skeleton',
  props: {
    // 是否加载中
    loading: {
      type: Boolean,
      default: true
    },
    // 是否显示头像
    avatar: {
      type: Boolean,
      default: false
    },
    ...rootProps
  },
  setup(props, { slots }) {
    useProvider(props)

    return () => {
      if (!props.loading) {
        return slots.default ? slots.default() : null
      }

      return h(
        SkeletonLayout,
        {
          animated: props.animated,
          avatar: props.avatar
        },
        slots.layout
      )
    }
  }
})
</script>
