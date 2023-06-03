<script lang="ts">
import { defineComponent, h } from 'vue'
import FormFooter from './FormFooter.vue'

export default defineComponent({
  name: 'ta-form',
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          className: 'ta-form'
        },
        [
          slots.default && slots.default(),
          slots.footer && h(FormFooter, null, () => slots.footer && slots.footer())
        ]
      )
  }
})
</script>
