<script lang="ts">
import {
  defineComponent,
  h,
  isVNode,
  shallowRef,
  type VNode,
  type Component
} from 'vue'

export default defineComponent({
  name: 'ta-sticky-view-items',
  emits: ['reset-items'],
  setup(_, { slots, emit, expose }) {
    const root = shallowRef<HTMLElement | null>(null)

    expose({
      ref: root
    })

    return () => {
      const children = slots.default?.()

      let items: VNode[] = []
      if (children && isVNode(children[0])) {
        if (Array.isArray(children[0].children)) {
          items = children[0].children
            .map(item => {
              if (isVNode(item) && Array.isArray(item.children)) {
                return item.children.filter(
                  item =>
                    isVNode(item) &&
                    (item.type as Component).name === 'ta-sticky-view-item'
                )
              }

              return []
            })
            .flat() as VNode[]
        }
      }
      emit('reset-items', items)

      return h('div', { class: 'ta-sticky-view_list', ref: root }, children)
    }
  }
})
</script>
