import type { Noop } from '../helpers/types'
import { onBeforeUnmount } from 'vue'

export function useOnce(interval = 0) {
  let handle: number | null = null

  function cancel() {
    if (handle !== null) {
      interval > 0 ? clearTimeout(handle) : cancelAnimationFrame(handle)
      handle = null
    }
  }

  function call(fn: Noop) {
    cancel()

    if (interval > 0) {
      handle = window.setTimeout(() => {
        handle = null

        fn()
      }, 50)
    } else {
      handle = requestAnimationFrame(() => {
        handle = null

        fn()
      })
    }
  }

  onBeforeUnmount(cancel)

  return call
}
