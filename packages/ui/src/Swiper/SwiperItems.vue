<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ta-swiper-items',
  emits: ['reset-items'],
  setup(_, { slots, emit }) {
    return () => {
      const children = slots.default?.()

      emit('reset-items')

      return children
    }
  }
})
</script>
