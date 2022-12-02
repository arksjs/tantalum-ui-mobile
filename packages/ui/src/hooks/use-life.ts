import { getCurrentInstance, onMounted } from 'vue'
import type { Noop } from '../helpers'

export function useMounted(callback: Noop) {
  const instance = getCurrentInstance()

  if (instance) {
    if (instance.isMounted) {
      callback()
    } else {
      onMounted(() => callback())
    }
  }
}
