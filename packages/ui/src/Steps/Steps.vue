<script lang="ts">
import { cloneVNode, computed, defineComponent, h } from 'vue'
import { getStepsClasses } from './util'
import { getComponentVNodeItems } from '../slots'

export default defineComponent({
  name: 'ta-steps',
  props: {
    activeIndex: {
      type: Number,
      default: 0
    },
    dot: {
      type: Boolean,
      default: false
    },
    horizontal: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const classes = computed(() => getStepsClasses(props))

    return () => {
      const children = slots.default?.()

      const newChildren = getComponentVNodeItems(children, 'ta-step').map(
        (child, index) =>
          cloneVNode(child, { index, activeIndex: props.activeIndex })
      )

      return h(
        'div',
        {
          class: classes.value
        },
        newChildren
      )
    }
  }
})
</script>
