import { onBeforeUnmount, watch } from 'vue'
import type { Ref } from 'vue'
import { useMounted } from './use-life'
import { noop } from '../helpers/util'

export function useResizeObserver(
  container: Ref<HTMLElement | null>,
  callback: (rect: DOMRect) => void
) {
  if (typeof ResizeObserver === 'undefined') {
    return noop
  }

  const ro = new ResizeObserver(entries => {
    entries.forEach(entry => {
      callback(entry.contentRect)
    })
  })

  useMounted(() => {
    on()

    watch(container, () => {
      off()
      on()
    })
  })

  function on() {
    container.value && ro.observe(container.value)
  }

  function off() {
    ro.disconnect()
  }

  onBeforeUnmount(off)

  return off
}
