<script lang="ts">
import { defineComponent, h } from 'vue'
import FormFooter from './FormFooter.vue'

export default defineComponent({
  name: 'fx-form',
  setup(props, { slots }) {
    return () =>
      h(
        'div',
        {
          className: 'fx-form'
        },
        [
          slots.default && slots.default(),
          slots.footer &&
            h(FormFooter, null, () => slots.footer && slots.footer())
        ]
      )
  }
})
</script>
