import type { Noop } from '../helpers/types'
import { onBeforeUnmount } from 'vue'

export function useOnce() {
  let handle: number | null = null

  function cancel() {
    if (handle !== null) {
      cancelAnimationFrame(handle)
      handle = null
    }
  }

  function call(fn: Noop) {
    cancel()

    handle = requestAnimationFrame(() => {
      handle = null

      fn()
    })
  }

  onBeforeUnmount(cancel)

  return call
}
