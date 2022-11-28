import { onBeforeUnmount, type Ref } from 'vue'
import type { Noop } from '../helpers'

export function useDelay(callback: Noop, duration: Ref<number>) {
  let timer: number | undefined

  function removeDelayTask() {
    clearTimeout(timer)
    timer = undefined
  }

  function addDelayTask() {
    if (duration.value && duration.value > 0) {
      removeDelayTask()
      timer = window.setTimeout(callback, duration.value)
    }
  }

  onBeforeUnmount(removeDelayTask)

  return { addDelayTask, removeDelayTask }
}
