import { onBeforeUnmount, watch, type Ref } from 'vue'
import { useMounted } from './use-life'
import { noop } from '../helpers'

export function useMutationObserver(
  container: Ref<HTMLElement | null>,
  callback: (mutationRecords: MutationRecord[]) => void,
  options?: MutationObserverInit
) {
  if (typeof MutationObserver === 'undefined') {
    return noop
  }

  const mo = new MutationObserver(mutationRecords => {
    callback(mutationRecords)
  })

  useMounted(() => {
    on()

    watch(container, () => {
      off()
      on()
    })
  })

  function on() {
    console.log(container.value, options)
    container.value && mo.observe(container.value, options)
  }

  function off() {
    mo.disconnect()
  }

  onBeforeUnmount(off)

  return off
}
