<script lang="ts">
import { getComponentVNodeItems } from '../slots'
import { defineComponent, h, shallowRef } from 'vue'

export default defineComponent({
  name: 'ta-sticky-view-list',
  emits: ['reset-items'],
  setup(_, { slots, emit, expose }) {
    const root = shallowRef<HTMLElement | null>(null)

    expose({
      ref: root
    })

    return () => {
      const children = slots.default?.()

      emit('reset-items', getComponentVNodeItems(children, /^ta-[\w-]+-item$/))

      return h('div', { class: 'ta-sticky-view_list', ref: root }, children)
    }
  }
})
</script>
